import { Response } from "express";
import { z } from "zod";
import { v4 as uuidv4 } from "uuid";
import prisma from "../../utils/prisma";
import { AuthRequest } from "../../middleware/auth.middleware";

const createTripSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().optional(),
  coverPhotoUrl: z.string().url().optional(),
  startDate: z.string().datetime(),
  endDate: z.string().datetime(),
  isPublic: z.boolean().optional(),
});

const updateTripSchema = createTripSchema.partial().extend({
  status: z.enum(["planning", "ongoing", "completed"]).optional(),
});

export const createTrip = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const data = createTripSchema.parse(req.body);
    const userId = req.userId!;

    const trip = await prisma.trip.create({
      data: {
        ownerId: userId,
        name: data.name,
        description: data.description,
        coverPhotoUrl: data.coverPhotoUrl,
        startDate: new Date(data.startDate),
        endDate: new Date(data.endDate),
        isPublic: data.isPublic ?? false,
        shareToken: uuidv4(), // generate a unique token for sharing
      },
    });

    res.status(201).json(trip);
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ error: { code: "VALIDATION_ERROR", message: error.errors } });
      return;
    }
    console.error("Error creating trip:", error);
    res.status(500).json({ error: { code: "INTERNAL_SERVER_ERROR", message: "Something went wrong" } });
  }
};

export const getTrips = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.userId!;
    
    // Get trips where user is owner or collaborator
    const trips = await prisma.trip.findMany({
      where: { ownerId: userId },
      include: {
        owner: { select: { id: true, firstName: true, lastName: true } },
      },
      orderBy: { startDate: 'asc' },
    });

    const now = new Date();

    const grouped = {
      ongoing: trips.filter((t: { status: string; startDate: Date; endDate: Date }) => t.status === "ongoing" || (t.startDate <= now && t.endDate >= now && t.status !== "completed")),
      upcoming: trips.filter((t: { status: string; startDate: Date; endDate: Date }) => t.status === "planning" && t.startDate > now),
      completed: trips.filter((t: { status: string; startDate: Date; endDate: Date }) => t.status === "completed" || t.endDate < now),
    };

    res.json(grouped);
  } catch (error) {
    console.error("Error getting trips:", error);
    res.status(500).json({ error: { code: "INTERNAL_SERVER_ERROR", message: "Something went wrong" } });
  }
};

export const getTrip = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const userId = req.userId!;

    const trip = await prisma.trip.findUnique({
      where: { id },
      include: {
        owner: { select: { id: true, firstName: true, lastName: true, email: true } },
        stops: {
          include: { city: true },
          orderBy: { orderIndex: 'asc' },
        },
      }
    });

    if (!trip) {
      res.status(404).json({ error: { code: "NOT_FOUND", message: "Trip not found" } });
      return;
    }

    // Authorization check
      const isOwner = trip.ownerId === userId;
      if (!isOwner) {
        res.status(403).json({ error: { code: "FORBIDDEN", message: "You don't have access to this trip" } });
        return;
      }

    res.json(trip);
  } catch (error) {
    console.error("Error getting trip:", error);
    res.status(500).json({ error: { code: "INTERNAL_SERVER_ERROR", message: "Something went wrong" } });
  }
};

export const updateTrip = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const userId = req.userId!;
    const data = updateTripSchema.parse(req.body);

    const trip = await prisma.trip.findUnique({
      where: { id }
    });

    if (!trip) {
      res.status(404).json({ error: { code: "NOT_FOUND", message: "Trip not found" } });
      return;
    }

      const isOwner = trip.ownerId === userId;
      if (!isOwner) {
      res.status(403).json({ error: { code: "FORBIDDEN", message: "Only owners or editors can update the trip" } });
      return;
    }

    const updated = await prisma.trip.update({
      where: { id },
      data: {
        name: data.name,
        description: data.description,
        coverPhotoUrl: data.coverPhotoUrl,
        startDate: data.startDate ? new Date(data.startDate) : undefined,
        endDate: data.endDate ? new Date(data.endDate) : undefined,
        isPublic: data.isPublic,
        status: data.status,
      },
    });

    res.json(updated);
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ error: { code: "VALIDATION_ERROR", message: error.errors } });
      return;
    }
    console.error("Error updating trip:", error);
    res.status(500).json({ error: { code: "INTERNAL_SERVER_ERROR", message: "Something went wrong" } });
  }
};

export const deleteTrip = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const userId = req.userId!;

    const trip = await prisma.trip.findUnique({ where: { id } });

    if (!trip) {
      res.status(404).json({ error: { code: "NOT_FOUND", message: "Trip not found" } });
      return;
    }

    if (trip.ownerId !== userId) {
      res.status(403).json({ error: { code: "FORBIDDEN", message: "Only the owner can delete the trip" } });
      return;
    }

    await prisma.trip.delete({ where: { id } });

    res.json({ message: "Trip deleted successfully" });
  } catch (error) {
    console.error("Error deleting trip:", error);
    res.status(500).json({ error: { code: "INTERNAL_SERVER_ERROR", message: "Something went wrong" } });
  }
};

export const getSharedTrip = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { token } = req.params;

    const trip = await prisma.trip.findUnique({
      where: { shareToken: token },
      include: {
        owner: { select: { id: true, firstName: true, lastName: true } },
        stops: {
          include: { city: true },
          orderBy: { orderIndex: 'asc' },
        },
      }
    });

    if (!trip) {
      res.status(404).json({ error: { code: "NOT_FOUND", message: "Invalid share token" } });
      return;
    }

    if (!trip.isPublic) {
      res.status(403).json({ error: { code: "FORBIDDEN", message: "This trip is no longer public" } });
      return;
    }

    res.json(trip);
  } catch (error) {
    console.error("Error getting shared trip:", error);
    res.status(500).json({ error: { code: "INTERNAL_SERVER_ERROR", message: "Something went wrong" } });
  }
};

export const getTripSummary = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const userId = req.userId!;

    // Verify ownership
    const trip = await prisma.trip.findUnique({ where: { id }, include: { owner: true } });
    if (!trip) {
      res.status(404).json({ error: { code: "NOT_FOUND", message: "Trip not found" } });
      return;
    }
    if (trip.ownerId !== userId) {
      res.status(403).json({ error: { code: "FORBIDDEN", message: "You don't have access to this trip" } });
      return;
    }

    // Budget aggregation (reuse logic from budget controller)
    const expenses = await prisma.tripExpense.findMany({ where: { tripId: id }, orderBy: { date: 'asc' } });
    const breakdown: Record<string, number> = { transport: 0, stay: 0, activities: 0, meals: 0, misc: 0 };
    let total = 0;
    expenses.forEach((exp: any) => {
      const amt = Number(exp.amount);
      breakdown[exp.category] += amt;
      total += amt;
    });
    const tripDays = trip && trip.endDate && trip.startDate
      ? Math.max(1, Math.ceil((trip.endDate.getTime() - trip.startDate.getTime()) / (1000 * 3600 * 24)))
      : 1;
    const budget = {
      total,
      perDayAvg: Number((total / tripDays).toFixed(2)),
      breakdown,
      expenses,
    };

    // Activities linked to the trip
    const activities = await prisma.activity.findMany({ where: { tripId: id } });

    // Stops with city information
    const stops = await prisma.tripStop.findMany({
      where: { tripId: id },
      include: { city: true },
      orderBy: { orderIndex: 'asc' },
    });

    res.json({ trip, budget, activities, stops });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: { code: "INTERNAL_SERVER_ERROR", message: "Something went wrong" } });
  }
};
