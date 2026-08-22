import { Response, Request } from "express";
import { z } from "zod";
import prisma from "../../utils/prisma";
import { AuthRequest } from "../../middleware/auth.middleware";

// Schemas
const postSchema = z.object({
  content: z.string().min(1),
  tripId: z.string().uuid().optional(),
  imageUrl: z.string().url().optional()
});

const commentSchema = z.object({
  content: z.string().min(1)
});

export const getPosts = async (req: Request, res: Response): Promise<void> => {
  try {
    const { page = "1", limit = "20" } = req.query;
    const skip = (Number(page) - 1) * Number(limit);
    const take = Number(limit);

    const posts = await prisma.communityPost.findMany({
      skip,
      take,
      orderBy: { createdAt: 'desc' },
      include: {
        user: { select: { id: true, firstName: true, lastName: true, profilePhotoUrl: true } },
        trip: { select: { id: true, name: true, coverPhotoUrl: true, shareToken: true } },
        comments: {
          include: {
            user: { select: { id: true, firstName: true, lastName: true, profilePhotoUrl: true } }
          },
          orderBy: { createdAt: 'asc' }
        }
      }
    });

    res.json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: { code: "INTERNAL_SERVER_ERROR", message: "Something went wrong" } });
  }
};

export const createPost = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.userId!;
    const data = postSchema.parse(req.body);

    const post = await prisma.communityPost.create({
      data: {
        userId,
        content: data.content,
        tripId: data.tripId,
        imageUrl: data.imageUrl
      }
    });

    res.status(201).json(post);
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ error: { code: "VALIDATION_ERROR", message: error.errors } });
      return;
    }
    console.error(error);
    res.status(500).json({ error: { code: "INTERNAL_SERVER_ERROR", message: "Something went wrong" } });
  }
};

export const addComment = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id: postId } = req.params;
    const userId = req.userId!;
    const data = commentSchema.parse(req.body);

    const post = await prisma.communityPost.findUnique({ where: { id: postId } });
    if (!post) {
      res.status(404).json({ error: { code: "NOT_FOUND", message: "Post not found" } });
      return;
    }

    const comment = await prisma.communityComment.create({
      data: {
        postId,
        userId,
        content: data.content
      }
    });

    res.status(201).json(comment);
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ error: { code: "VALIDATION_ERROR", message: error.errors } });
      return;
    }
    console.error(error);
    res.status(500).json({ error: { code: "INTERNAL_SERVER_ERROR", message: "Something went wrong" } });
  }
};

export const likePost = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id: postId } = req.params;

    const post = await prisma.communityPost.findUnique({ where: { id: postId } });
    if (!post) {
      res.status(404).json({ error: { code: "NOT_FOUND", message: "Post not found" } });
      return;
    }

    // In a real app we'd track who liked it to prevent multiple likes per user.
    // For now we just increment the counter.
    const updated = await prisma.communityPost.update({
      where: { id: postId },
      data: { likesCount: { increment: 1 } }
    });

    res.json(updated);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: { code: "INTERNAL_SERVER_ERROR", message: "Something went wrong" } });
  }
};
