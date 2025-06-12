// // src/middleware/authMiddleware.ts
// import { Request, Response, NextFunction } from "express";
// import jwt from "jsonwebtoken";

// interface AuthenticatedRequest extends Request {
//   user?: { username: string }; // Extend to include whatever your token holds
// }

// export const authenticateToken = (
//   req: AuthenticatedRequest,
//   res: Response,
//   next: NextFunction
// ) => {
//   const authHeader = req.headers.authorization;
//   const token = authHeader?.split(" ")[1];
//   if (!token) return res.status(401).json({ error: "No token provided" });

//   try {
//     const payload = jwt.verify(token, process.env.JWT_SECRET) as unknown as { username: string };
//     req.user = { username: payload.username };
//     next();
//   } catch (err) {
//     return res.status(403).json({ error: "Invalid token" });
//   }
// };
