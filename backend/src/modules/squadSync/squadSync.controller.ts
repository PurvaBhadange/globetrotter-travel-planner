import { Response } from "express";
import { z } from "zod";
import prisma from "../../utils/prisma";
import { AuthRequest } from "../../middleware/auth.middleware";
import { getIo } from "../../sockets";

// Schemas
const inviteSchema = z.object({
  email: z.string().email(),
  role: z.enum(['editor', 'viewer']).default('editor')
});

const splitSchema = z.object({
  splitType: z.enum(['equal', 'custom']),
  shares: z.array(z.object({
    userId: z.string().uuid(),
    amountOwed: z.number().nonnegative()
  }))
});

export const inviteCollaborator = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id: tripId } = req.params;
    const userId = req.userId!;
    const data = inviteSchema.parse(req.body);

    const trip = await prisma.trip.findUnique({ where: { id: tripId } });
    if (!trip || trip.ownerId !== userId) {
      res.status(403).json({ error: { code: "FORBIDDEN", message: "Only trip owner can invite" } });
      return;
    }

    const invitee = await prisma.user.findUnique({ where: { email: data.email } });
    if (!invitee) {
      res.status(404).json({ error: { code: "NOT_FOUND", message: "User not found with this email" } });
      return;
    }

    if (invitee.id === userId) {
      res.status(400).json({ error: { code: "BAD_REQUEST", message: "Cannot invite yourself" } });
      return;
    }

    const collab = await prisma.tripCollaborator.upsert({
      where: {
        tripId_userId: { tripId, userId: invitee.id }
      },
      update: { role: data.role },
      create: {
        tripId,
        userId: invitee.id,
        role: data.role
      }
    });

    res.status(201).json(collab);
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ error: { code: "VALIDATION_ERROR", message: error.errors } });
      return;
    }
    console.error(error);
    res.status(500).json({ error: { code: "INTERNAL_SERVER_ERROR", message: "Something went wrong" } });
  }
};

export const acceptInvite = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id: tripId } = req.params;
    const userId = req.userId!;

    const collab = await prisma.tripCollaborator.findUnique({
      where: { tripId_userId: { tripId, userId } }
    });

    if (!collab) {
      res.status(404).json({ error: { code: "NOT_FOUND", message: "Invite not found" } });
      return;
    }

    const updated = await prisma.tripCollaborator.update({
      where: { tripId_userId: { tripId, userId } },
      data: { acceptedAt: new Date() }
    });

    res.json(updated);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: { code: "INTERNAL_SERVER_ERROR", message: "Something went wrong" } });
  }
};

export const getCollaborators = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id: tripId } = req.params;
    
    const collaborators = await prisma.tripCollaborator.findMany({
      where: { tripId },
      include: {
        user: { select: { id: true, firstName: true, lastName: true, email: true, profilePhotoUrl: true } }
      }
    });

    res.json(collaborators);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: { code: "INTERNAL_SERVER_ERROR", message: "Something went wrong" } });
  }
};

export const splitExpense = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id: expenseId } = req.params;
    const userId = req.userId!;
    const data = splitSchema.parse(req.body);

    const expense = await prisma.tripExpense.findUnique({
      where: { id: expenseId },
      include: { trip: { include: { collaborators: true } } }
    });

    if (!expense) {
      res.status(404).json({ error: { code: "NOT_FOUND", message: "Expense not found" } });
      return;
    }

    const isOwner = expense.trip.ownerId === userId;
    const isEditor = expense.trip.collaborators.some((c: { userId: string; role: string }) => c.userId === userId && (c.role === 'editor' || c.role === 'owner'));

    if (!isOwner && !isEditor) {
      res.status(403).json({ error: { code: "FORBIDDEN", message: "Not authorized to split expenses" } });
      return;
    }

    // Delete existing splits for this expense
    await prisma.tripExpenseSplit.deleteMany({
      where: { tripExpenseId: expenseId }
    });

    // Create new splits
    const splits = await prisma.$transaction(
      data.shares.map(share => prisma.tripExpenseSplit.create({
        data: {
          tripExpenseId: expenseId,
          userId: share.userId,
          amountOwed: share.amountOwed
        }
      }))
    );
    
    getIo().to(`trip:${expense.tripId}`).emit("expense:split:updated", { expenseId, splits });

    res.status(201).json(splits);
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ error: { code: "VALIDATION_ERROR", message: error.errors } });
      return;
    }
    console.error(error);
    res.status(500).json({ error: { code: "INTERNAL_SERVER_ERROR", message: "Something went wrong" } });
  }
};

export const getBalances = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id: tripId } = req.params;

    const expenses = await prisma.tripExpense.findMany({
      where: { tripId },
      include: { splits: true }
    });

    // Simplistic balance logic: how much each user has paid vs how much they owe total.
    // Negative balance = they owe money to the group. Positive balance = the group owes them.
    const balances: Record<string, number> = {};

    expenses.forEach((exp: any) => {
      const payerId = exp.paidByUserId;
      balances[payerId] = (balances[payerId] || 0) + Number(exp.amount);
      
      exp.splits.forEach((split: any) => {
        if (!split.settled) {
          balances[split.userId] = (balances[split.userId] || 0) - Number(split.amountOwed);
        }
      });
    });

    res.json(balances);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: { code: "INTERNAL_SERVER_ERROR", message: "Something went wrong" } });
  }
};

export const settleBalances = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id: tripId } = req.params;
    
    // Simplistic settlement: mark all splits for this trip as settled.
    // In a real app, users would settle pair-wise or select specific expenses.
    await prisma.tripExpenseSplit.updateMany({
      where: { tripExpense: { tripId } },
      data: { settled: true }
    });

    res.json({ message: "Balances settled for trip" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: { code: "INTERNAL_SERVER_ERROR", message: "Something went wrong" } });
  }
};
