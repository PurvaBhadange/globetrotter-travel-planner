import { Response } from "express";
import { z } from "zod";
import prisma from "../../utils/prisma";
import { AuthRequest } from "../../middleware/auth.middleware";
import { getIo } from "../../sockets";

// Helper to check if the requesting user is the owner of the trip
const checkTripAccess = async (tripId: string, userId: string): Promise<boolean> => {
  const trip = await prisma.trip.findUnique({
    where: { id: tripId }
  });
  if (!trip) return false;
  return trip.ownerId === userId;
};

const createStopSchema = z.object({
  cityId: z.string().uuid(),
  orderIndex: z.number().int(),
  arrivalDate: z.string().datetime(),
  departureDate: z.string().datetime(),
  notes: z.string().optional(),
});

const updateStopSchema = createStopSchema.partial();

const addActivitySchema = z.object({
  activityId: z.string().uuid(),
  dayNumber: z.number().int(),
  scheduledTime: z.string().datetime().optional().nullable(),
  customCost: z.number().optional().nullable(),
  orderIndex: z.number().int(),
});

const updateActivitySchema = addActivitySchema.partial();

export const createStop = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { tripId } = req.params;
    const userId = req.userId!;
    const data = createStopSchema.parse(req.body);

    const hasAccess = await checkTripAccess(tripId, userId);
    if (!hasAccess) {
      res.status(403).json({ error: { code: "FORBIDDEN", message: "Not authorized to modify this trip" } });
      return;
    }

    const stop = await prisma.tripStop.create({
      data: {
        tripId,
        cityId: data.cityId,
        orderIndex: data.orderIndex,
        arrivalDate: new Date(data.arrivalDate),
        departureDate: new Date(data.departureDate),
        notes: data.notes,
      },
    });

    res.status(201).json(stop);
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ error: { code: "VALIDATION_ERROR", message: error.errors } });
      return;
    }
    console.error(error);
    res.status(500).json({ error: { code: "INTERNAL_SERVER_ERROR", message: "Something went wrong" } });
  }
};

export const updateStop = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const userId = req.userId!;
    const data = updateStopSchema.parse(req.body);

    const stop = await prisma.tripStop.findUnique({ where: { id } });
    if (!stop) {
      res.status(404).json({ error: { code: "NOT_FOUND", message: "Stop not found" } });
      return;
    }

    const hasAccess = await checkTripAccess(stop.tripId, userId);
    if (!hasAccess) {
      res.status(403).json({ error: { code: "FORBIDDEN", message: "Not authorized to modify this trip" } });
      return;
    }

    const updated = await prisma.tripStop.update({
      where: { id },
      data: {
        cityId: data.cityId,
        orderIndex: data.orderIndex,
        arrivalDate: data.arrivalDate ? new Date(data.arrivalDate) : undefined,
        departureDate: data.departureDate ? new Date(data.departureDate) : undefined,
        notes: data.notes,
      },
    });

    getIo().to(`trip:${stop.tripId}`).emit("stop:updated", updated);

    res.json(updated);
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ error: { code: "VALIDATION_ERROR", message: error.errors } });
      return;
    }
    console.error(error);
    res.status(500).json({ error: { code: "INTERNAL_SERVER_ERROR", message: "Something went wrong" } });
  }
};

export const deleteStop = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const userId = req.userId!;

    const stop = await prisma.tripStop.findUnique({ where: { id } });
    if (!stop) {
      res.status(404).json({ error: { code: "NOT_FOUND", message: "Stop not found" } });
      return;
    }

    const hasAccess = await checkTripAccess(stop.tripId, userId);
    if (!hasAccess) {
      res.status(403).json({ error: { code: "FORBIDDEN", message: "Not authorized to modify this trip" } });
      return;
    }

    await prisma.tripStop.delete({ where: { id } });
    res.json({ message: "Stop deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: { code: "INTERNAL_SERVER_ERROR", message: "Something went wrong" } });
  }
};

export const addActivityToStop = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { stopId } = req.params;
    const userId = req.userId!;
    const data = addActivitySchema.parse(req.body);

    const stop = await prisma.tripStop.findUnique({ where: { id: stopId } });
    if (!stop) {
      res.status(404).json({ error: { code: "NOT_FOUND", message: "Stop not found" } });
      return;
    }

    const hasAccess = await checkTripAccess(stop.tripId, userId);
    if (!hasAccess) {
      res.status(403).json({ error: { code: "FORBIDDEN", message: "Not authorized to modify this trip" } });
      return;
    }

    const tripActivity = await prisma.tripActivity.create({
      data: {
        tripStopId: stopId,
        activityId: data.activityId,
        dayNumber: data.dayNumber,
        scheduledTime: data.scheduledTime ? new Date(data.scheduledTime) : null,
        customCost: data.customCost,
        orderIndex: data.orderIndex,
      },
    });

    res.status(201).json(tripActivity);
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ error: { code: "VALIDATION_ERROR", message: error.errors } });
      return;
    }
    console.error(error);
    res.status(500).json({ error: { code: "INTERNAL_SERVER_ERROR", message: "Something went wrong" } });
  }
};

export const updateTripActivity = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const userId = req.userId!;
    const data = updateActivitySchema.parse(req.body);

    const tripActivity = await prisma.tripActivity.findUnique({ 
      where: { id },
      include: { tripStop: true }
    });
    
    if (!tripActivity) {
      res.status(404).json({ error: { code: "NOT_FOUND", message: "Trip activity not found" } });
      return;
    }

    const hasAccess = await checkTripAccess(tripActivity.tripStop.tripId, userId);
    if (!hasAccess) {
      res.status(403).json({ error: { code: "FORBIDDEN", message: "Not authorized to modify this trip" } });
      return;
    }

    const updated = await prisma.tripActivity.update({
      where: { id },
      data: {
        activityId: data.activityId,
        dayNumber: data.dayNumber,
        scheduledTime: data.scheduledTime ? new Date(data.scheduledTime) : undefined,
        customCost: data.customCost !== undefined ? data.customCost : undefined,
        orderIndex: data.orderIndex,
      },
    });

    getIo().to(`trip:${tripActivity.tripStop.tripId}`).emit("activity:updated", updated);

    res.json(updated);
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ error: { code: "VALIDATION_ERROR", message: error.errors } });
      return;
    }
    console.error(error);
    res.status(500).json({ error: { code: "INTERNAL_SERVER_ERROR", message: "Something went wrong" } });
  }
};

export const deleteTripActivity = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const userId = req.userId!;

    const tripActivity = await prisma.tripActivity.findUnique({ 
      where: { id },
      include: { tripStop: true }
    });
    
    if (!tripActivity) {
      res.status(404).json({ error: { code: "NOT_FOUND", message: "Trip activity not found" } });
      return;
    }

    const hasAccess = await checkTripAccess(tripActivity.tripStop.tripId, userId);
    if (!hasAccess) {
      res.status(403).json({ error: { code: "FORBIDDEN", message: "Not authorized to modify this trip" } });
      return;
    }

    await prisma.tripActivity.delete({ where: { id } });
    res.json({ message: "Trip activity deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: { code: "INTERNAL_SERVER_ERROR", message: "Something went wrong" } });
  }
};
