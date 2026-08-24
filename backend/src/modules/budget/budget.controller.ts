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

const expenseSchema = z.object({
  category: z.enum(['transport', 'stay', 'activities', 'meals', 'misc']),
  amount: z.number().positive(),
  currency: z.string().default('USD'),
  date: z.string().datetime(),
  notes: z.string().optional(),
});

const updateExpenseSchema = expenseSchema.partial();

export const getBudget = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id: tripId } = req.params;
    const userId = req.userId!;

    const hasAccess = await checkTripAccess(tripId, userId);
    if (!hasAccess) {
      res.status(403).json({ error: { code: "FORBIDDEN", message: "Not authorized to view this trip" } });
      return;
    }

    const trip = await prisma.trip.findUnique({
      where: { id: tripId }
    });
    
    const expenses = await prisma.tripExpense.findMany({
      where: { tripId },
      orderBy: { date: 'asc' }
    });

    const breakdown: Record<string, number> = {
      transport: 0, stay: 0, activities: 0, meals: 0, misc: 0
    };

    let total = 0;
    expenses.forEach((exp: any) => {
      const amt = Number(exp.amount);
      breakdown[exp.category] += amt;
      total += amt;
    });

    const tripDays = trip && trip.endDate >= trip.startDate 
      ? Math.max(1, Math.ceil((trip.endDate.getTime() - trip.startDate.getTime()) / (1000 * 3600 * 24))) 
      : 1;

    res.json({
      total,
      perDayAvg: Number((total / tripDays).toFixed(2)),
      breakdown,
      expenses
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: { code: "INTERNAL_SERVER_ERROR", message: "Something went wrong" } });
  }
};

export const createExpense = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id: tripId } = req.params;
    const userId = req.userId!;
    const data = expenseSchema.parse(req.body);

    const hasAccess = await checkTripAccess(tripId, userId);
    if (!hasAccess) {
      res.status(403).json({ error: { code: "FORBIDDEN", message: "Not authorized to modify this trip" } });
      return;
    }

    const expense = await prisma.tripExpense.create({
      data: {
        tripId,
        category: data.category,
        amount: data.amount,
        currency: data.currency,
        paidByUserId: userId,
        date: new Date(data.date),
        notes: data.notes
      }
    });

    getIo().to(`trip:${tripId}`).emit("expense:added", expense);

    res.status(201).json(expense);
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ error: { code: "VALIDATION_ERROR", message: error.errors } });
      return;
    }
    console.error(error);
    res.status(500).json({ error: { code: "INTERNAL_SERVER_ERROR", message: "Something went wrong" } });
  }
};

export const updateExpense = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const userId = req.userId!;
    const data = updateExpenseSchema.parse(req.body);

    const expense = await prisma.tripExpense.findUnique({ where: { id } });
    if (!expense) {
      res.status(404).json({ error: { code: "NOT_FOUND", message: "Expense not found" } });
      return;
    }

    const hasAccess = await checkTripAccess(expense.tripId, userId);
    if (!hasAccess) {
      res.status(403).json({ error: { code: "FORBIDDEN", message: "Not authorized to modify this trip" } });
      return;
    }

    const updated = await prisma.tripExpense.update({
      where: { id },
      data: {
        category: data.category,
        amount: data.amount !== undefined ? data.amount : undefined,
        currency: data.currency,
        date: data.date ? new Date(data.date) : undefined,
        notes: data.notes,
      }
    });

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

export const deleteExpense = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const userId = req.userId!;

    const expense = await prisma.tripExpense.findUnique({ where: { id } });
    if (!expense) {
      res.status(404).json({ error: { code: "NOT_FOUND", message: "Expense not found" } });
      return;
    }

    const hasAccess = await checkTripAccess(expense.tripId, userId);
    if (!hasAccess) {
      res.status(403).json({ error: { code: "FORBIDDEN", message: "Not authorized to modify this trip" } });
      return;
    }

    await prisma.tripExpense.delete({ where: { id } });
    res.json({ message: "Expense deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: { code: "INTERNAL_SERVER_ERROR", message: "Something went wrong" } });
  }
};
