import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { z } from "zod";
import prisma from "../../utils/prisma";

const registerSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string(),
});

const refreshSchema = z.object({
  refreshToken: z.string({ required_error: "Refresh token is required" }),
});

const generateTokens = (userId: string) => {
  const accessToken = jwt.sign(
    { userId },
    process.env.JWT_SECRET || "default_access_secret",
    { expiresIn: "15m" }
  );
  
  const refreshToken = jwt.sign(
    { userId },
    process.env.JWT_REFRESH_SECRET || "default_refresh_secret",
    { expiresIn: "7d" }
  );

  return { accessToken, refreshToken };
};

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const data = registerSchema.parse(req.body);
    
    const existingUser = await prisma.user.findUnique({
      where: { email: data.email },
    });

    if (existingUser) {
      res.status(400).json({ error: { code: "USER_EXISTS", message: "Email already in use" } });
      return;
    }

    const passwordHash = await bcrypt.hash(data.password, 10);

    const user = await prisma.user.create({
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        passwordHash,
      },
    });

    const tokens = generateTokens(user.id);

    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
      },
      ...tokens,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ error: { code: "VALIDATION_ERROR", message: error.errors } });
      return;
    }
    console.error("Register error:", error);
    res.status(500).json({ error: { code: "INTERNAL_SERVER_ERROR", message: "Something went wrong" } });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const data = loginSchema.parse(req.body);

    const user = await prisma.user.findUnique({
      where: { email: data.email },
    });

    if (!user) {
      res.status(401).json({ error: { code: "INVALID_CREDENTIALS", message: "Invalid email or password" } });
      return;
    }

    const isValidPassword = await bcrypt.compare(data.password, user.passwordHash);

    if (!isValidPassword) {
      res.status(401).json({ error: { code: "INVALID_CREDENTIALS", message: "Invalid email or password" } });
      return;
    }

    const tokens = generateTokens(user.id);

    res.json({
      message: "Logged in successfully",
      user: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
      },
      ...tokens,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ error: { code: "VALIDATION_ERROR", message: error.errors } });
      return;
    }
    console.error("Login error:", error);
    res.status(500).json({ error: { code: "INTERNAL_SERVER_ERROR", message: "Something went wrong" } });
  }
};

export const refresh = async (req: Request, res: Response): Promise<void> => {
  try {
    const data = refreshSchema.parse(req.body);

    const payload = jwt.verify(
      data.refreshToken,
      process.env.JWT_REFRESH_SECRET || "default_refresh_secret"
    ) as { userId: string };

    const user = await prisma.user.findUnique({
      where: { id: payload.userId },
    });

    if (!user) {
      res.status(401).json({ error: { code: "INVALID_TOKEN", message: "User not found" } });
      return;
    }

    const tokens = generateTokens(user.id);

    res.json({
      ...tokens,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ error: { code: "VALIDATION_ERROR", message: error.errors } });
      return;
    }
    console.error("Refresh token error:", error);
    res.status(401).json({ error: { code: "INVALID_TOKEN", message: "Invalid or expired refresh token" } });
  }
};
