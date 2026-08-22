import { Response, Request } from "express";
import prisma from "../../utils/prisma";

export const getActivities = async (req: Request, res: Response): Promise<void> => {
  try {
    const { city_id, category, maxCost, page = "1", limit = "20" } = req.query;

    const skip = (Number(page) - 1) * Number(limit);
    const take = Number(limit);

    const where: any = {};
    if (city_id) {
      where.cityId = String(city_id);
    }
    if (category) {
      where.category = String(category);
    }
    if (maxCost) {
      where.cost = { lte: Number(maxCost) };
    }

    const activities = await prisma.activity.findMany({
      where,
      skip,
      take,
      orderBy: { rating: 'desc' }
    });

    res.json(activities);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: { code: "INTERNAL_SERVER_ERROR", message: "Something went wrong" } });
  }
};
