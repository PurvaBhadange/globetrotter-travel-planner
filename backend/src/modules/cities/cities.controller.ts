import { Response, Request } from "express";
import prisma from "../../utils/prisma";

export const getCities = async (req: Request, res: Response): Promise<void> => {
  try {
    const { search, country, region, page = "1", limit = "20" } = req.query;

    const skip = (Number(page) - 1) * Number(limit);
    const take = Number(limit);

    const where: any = {};
    if (search) {
      where.name = { contains: String(search), mode: "insensitive" };
    }
    if (country) {
      where.country = { equals: String(country), mode: "insensitive" };
    }
    if (region) {
      where.region = { equals: String(region), mode: "insensitive" };
    }

    const cities = await prisma.city.findMany({
      where,
      skip,
      take,
      orderBy: { popularityScore: 'desc' }
    });

    res.json(cities);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: { code: "INTERNAL_SERVER_ERROR", message: "Something went wrong" } });
  }
};
