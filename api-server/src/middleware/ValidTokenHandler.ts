import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

interface AuthenticatedRequest extends Request {
  user?: JwtPayload; // Add 'user' property to Request
}

const validateToken = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    let token;
    const authHeader = req.headers.authorization || req.headers.authorization;

    if (authHeader && authHeader.startsWith("Bearer")) {
      token = authHeader.split(" ")[1];

      jwt.verify(token, process.env.ACCESS_TOKEN_SECRET || "", (err, decoded) => {
        if (err) res.status(401).json({ message: "user is not authenticated" });
        else {
            const decodedPayload=decoded as JwtPayload
          req.user = decodedPayload.user; // Assign decoded payload to 'user' property
          next();
        }
      });

      if (!token) {
        res.status(401).json({
          message: "user is not authorized or the token is missing",
        });
      }

      
    } else {
      res.status(401).json({
        message: "user is not authorized or the token is missing",
      });
    }
  } catch (error) {
    console.error(error);
  }
};

export default validateToken;
