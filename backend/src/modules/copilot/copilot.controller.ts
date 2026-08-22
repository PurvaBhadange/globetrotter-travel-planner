import { Response } from "express";
import { z } from "zod";
import prisma from "../../utils/prisma";
import { AuthRequest } from "../../middleware/auth.middleware";
import { Mistral } from "@mistralai/mistralai";

const mistral = new Mistral({ apiKey: process.env.MISTRAL_API_KEY });

// Schemas
const generateSchema = z.object({
  prompt: z.string(),
  cityId: z.string().uuid()
});

const fillGapSchema = z.object({
  dayNumber: z.number().int(),
  cityId: z.string().uuid()
});

export const generateItinerary = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id: tripId } = req.params;
    const { prompt, cityId } = generateSchema.parse(req.body);

    const trip = await prisma.trip.findUnique({ where: { id: tripId } });
    if (!trip) {
      res.status(404).json({ error: { code: "NOT_FOUND", message: "Trip not found" } });
      return;
    }

    // Fetch candidate activities
    const activities = await prisma.activity.findMany({
      where: { cityId },
      select: { id: true, name: true, category: true, cost: true, durationMinutes: true, rating: true }
    });

    if (activities.length === 0) {
      res.status(400).json({ error: { code: "BAD_REQUEST", message: "No activities found for this city to generate an itinerary." } });
      return;
    }

    const systemPrompt = `You are an AI travel assistant. Create a day-by-day itinerary based on the user's prompt. 
You MUST only use the activities provided in the candidate list. Do not invent new activities.
Return ONLY valid JSON in the following structure:
{
  "days": [
    {
      "dayNumber": 1,
      "activities": [
        { "activityId": "<uuid>", "reasoning": "Why this fits" }
      ]
    }
  ]
}
Candidate Activities: ${JSON.stringify(activities)}`;

    const chatResponse = await mistral.chat.complete({
      model: "mistral-large-latest",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: prompt }
      ],
      responseFormat: { type: "json_object" }
    });

    const payloadRaw = chatResponse.choices?.[0]?.message?.content;
    if (!payloadRaw) throw new Error("No response from Mistral");

    const payload = JSON.parse(payloadRaw as string);

    const suggestion = await prisma.aiSuggestion.create({
      data: {
        tripId,
        suggestionType: 'full_itinerary',
        promptText: prompt,
        payload
      }
    });

    res.status(201).json(suggestion);
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ error: { code: "VALIDATION_ERROR", message: error.errors } });
      return;
    }
    console.error(error);
    res.status(500).json({ error: { code: "INTERNAL_SERVER_ERROR", message: "Error generating itinerary" } });
  }
};

export const fillGap = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id: tripId } = req.params;
    const { dayNumber, cityId } = fillGapSchema.parse(req.body);

    const activities = await prisma.activity.findMany({
      where: { cityId },
      select: { id: true, name: true, category: true, cost: true, durationMinutes: true, rating: true }
    });

    const systemPrompt = `You are an AI travel assistant helping to fill a gap in a schedule.
You MUST only select 1 or 2 activities from the provided candidate list that would fit well.
Return ONLY valid JSON:
{ "suggestedActivities": [{ "activityId": "<uuid>", "reasoning": "..." }] }
Candidate Activities: ${JSON.stringify(activities)}`;

    const chatResponse = await mistral.chat.complete({
      model: "mistral-large-latest",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: `Please suggest activities to fill a gap on day ${dayNumber}.` }
      ],
      responseFormat: { type: "json_object" }
    });

    const payloadRaw = chatResponse.choices?.[0]?.message?.content;
    if (!payloadRaw) throw new Error("No response from Mistral");

    const suggestion = await prisma.aiSuggestion.create({
      data: {
        tripId,
        suggestionType: 'fill_gap',
        promptText: `Fill gap for day ${dayNumber}`,
        payload: JSON.parse(payloadRaw as string)
      }
    });

    res.status(201).json(suggestion);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: { code: "INTERNAL_SERVER_ERROR", message: "Error generating fill-gap" } });
  }
};

export const rebalanceBudget = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id: tripId } = req.params;
    
    // In a real implementation, you would fetch the trip's activities and expenses,
    // and candidate activities in the same cities, then ask Mistral for swaps.
    // Simplifying here to demonstrate the endpoints working.

    const systemPrompt = `You are an AI travel assistant. The user wants to rebalance their budget.
Suggest 1 or 2 budget swaps (e.g. swapping a high-cost activity for a lower-cost one).
Return ONLY valid JSON:
{ "swaps": [{ "originalActivityId": "<uuid>", "newActivityId": "<uuid>", "reasoning": "..." }] }`;

    const chatResponse = await mistral.chat.complete({
      model: "mistral-large-latest",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: "Rebalance my budget." }
      ],
      responseFormat: { type: "json_object" }
    });

    const payloadRaw = chatResponse.choices?.[0]?.message?.content;
    if (!payloadRaw) throw new Error("No response from Mistral");

    const suggestion = await prisma.aiSuggestion.create({
      data: {
        tripId,
        suggestionType: 'rebalance_budget',
        payload: JSON.parse(payloadRaw as string)
      }
    });

    res.status(201).json(suggestion);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: { code: "INTERNAL_SERVER_ERROR", message: "Error rebalancing budget" } });
  }
};

export const acceptSuggestion = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const suggestion = await prisma.aiSuggestion.update({
      where: { id },
      data: { accepted: true }
    });
    // Normally we would also apply the suggestion to the itinerary here
    res.json(suggestion);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: { code: "INTERNAL_SERVER_ERROR", message: "Something went wrong" } });
  }
};

export const rejectSuggestion = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const suggestion = await prisma.aiSuggestion.update({
      where: { id },
      data: { accepted: false }
    });
    res.json(suggestion);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: { code: "INTERNAL_SERVER_ERROR", message: "Something went wrong" } });
  }
};
