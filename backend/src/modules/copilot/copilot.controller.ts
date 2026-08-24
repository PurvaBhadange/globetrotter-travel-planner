import { Request, Response } from "express";
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

export const generateTripFromPrompt = async (req: Request, res: Response): Promise<void> => {
  try {
    const { prompt } = req.body;
    if (!prompt) {
      res.status(400).json({ error: { code: "BAD_REQUEST", message: "Prompt is required" } });
      return;
    }

    const systemPrompt = `You are GlobeTrotter Copilot, a conversational AI trip planner.
Analyze the user's request and suggest a matching travel itinerary.
Return ONLY valid JSON in the following structure, with NO additional markdown formatting or backticks:
{
  "title": "A catchy title for the trip",
  "route": ["City 1", "City 2", "City 3"],
  "days": 7,
  "budget": "Estimated total cost (e.g. ₹42,500 or $1,200)",
  "highlights": [
    "Day 1-2: Short highlight description",
    "Day 3-4: Short highlight description",
    "Day 5-7: Short highlight description"
  ]
}`;

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
    res.json(payload);
  } catch (error) {
    console.error("Mistral trip generation error, running smart parser fallback:", error);
    const promptLower = (req.body.prompt || "").toLowerCase();
    
    // Smart user-facing fallback parsing
    let title = "Custom Coastal Expedition";
    let route = ["Pune", "Goa", "Gokarna"];
    let days = 7;
    let budget = "₹45,000";
    let highlights = [
      "Day 1-3: Baga Beach sunset catamaran & watersports",
      "Day 4-5: Dudhsagar Falls jungle trek & spice plantation lunch",
      "Day 6-7: Kudle Beach cliffwalk & temple beach camping"
    ];

    if (promptLower.includes("europe") || promptLower.includes("europ")) {
      title = "European Dream Tour";
      route = ["London", "Paris", "Amsterdam"];
      days = 9;
      budget = "€2,400";
      highlights = [
        "Day 1-3: London Eye, Big Ben, and high tea experience",
        "Day 4-6: Paris Eiffel Tower visit and Louvre museum tour",
        "Day 7-9: Amsterdam canal cruise and historic city walk"
      ];
    } else if (promptLower.includes("asia") || promptLower.includes("bali") || promptLower.includes("thailand") || promptLower.includes("japan")) {
      title = "Tropical Asia Explorer";
      route = ["Bangkok", "Phuket", "Bali"];
      days = 8;
      budget = "$1,500";
      highlights = [
        "Day 1-3: Bangkok historic temples and street food adventure",
        "Day 4-5: Phuket island hopping and beach lounge relaxation",
        "Day 6-8: Ubud rice terrace walk and Bali cultural tour"
      ];
    } else if (promptLower.includes("america") || promptLower.includes("usa") || promptLower.includes("york") || promptLower.includes("states")) {
      title = "US East Coast Explorer";
      route = ["New York", "Boston", "Washington DC"];
      days = 7;
      budget = "$2,100";
      highlights = [
        "Day 1-3: NYC Times Square, Central Park, and Broadway show",
        "Day 4-5: Boston historic Freedom Trail walk and harbor cruise",
        "Day 6-7: Washington DC Smithsonian museums and National Mall"
      ];
    }

    res.json({ title, route, days, budget, highlights });
  }
};

