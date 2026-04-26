import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { sql } from "../utils/db.js";

interface User {
  user_id: number;
  name: string;
  email: string;
  phone_number: string;
  role: "jobseeker" | "recruiter";
  bio: string | null;
  resume: string | null;
  resume_public_id: string | null;
  profile_picture: string | null;
  profile_picture_public_id: string | null;
  skills: string[];
  subscription: string | null;
}

export interface AuthenticatedRequest extends Request {
  user?: User;
}

export const isAuth = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      res.status(401).json({
        message: "Authorization header is missing or invalid",
      });
      return;
    }

    const token = authHeader.split(" ")[1];

    if (!process.env.JWT_SEC) {
      res.status(500).json({
        message: "JWT secret is not configured",
      });
      return;
    }

    const decodedPayload = jwt.verify(
      token,
      process.env.JWT_SEC
    ) as JwtPayload;

    if (!decodedPayload || !decodedPayload.id) {
      res.status(401).json({
        message: "Invalid token",
      });
      return;
    }

    const users = await sql`
      SELECT 
        u.user_id,
        u.name,
        u.email,
        u.phone_number,
        u.role,
        u.bio,
        u.resume,
        u.resume_public_id,
        u.profile_picture,
        u.profile_picture_public_id,
        u.subscription,
        COALESCE(
          ARRAY_AGG(s.name) FILTER (WHERE s.name IS NOT NULL),
          '{}'
        ) AS skills
      FROM users u
      LEFT JOIN user_skills us ON u.user_id = us.user_id
      LEFT JOIN skills s ON us.skill_id = s.skill_id
      WHERE u.user_id = ${decodedPayload.id}
      GROUP BY u.user_id;
    `;

    if (users.length === 0) {
      res.status(401).json({
        message: "User associated with this token no longer exists",
      });
      return;
    }

    req.user = users[0] as User;

    next();
  } catch (error) {
    console.log("Auth middleware error:", error);

    res.status(401).json({
      message: "Authentication Failed. Please login again",
    });
  }
};