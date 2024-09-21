import { NextFunction, Request, Response, ErrorRequestHandler } from "express";
import { CustomJwtPayload, isTokenvalid } from "../utils/jwt.js";
import UnAuthenticatedError from "../errors/unauthenticated-error.js";

const isCustomJwtPayload = (payload: any): payload is CustomJwtPayload => {
  return (
    payload &&
    typeof payload === "object" &&
    "email" in payload &&
    "name" in payload &&
    "id" in payload
  );
};

interface User {
  id: string;
  email: string;
  name: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}

const authenticateUser = (req: Request, res: Response, next: NextFunction) => {
  const token = req.signedCookies.token;

  if (!token) {
    return next(new UnAuthenticatedError("No token, authorization denied"));
  }

  try {
    const decodedToken = isTokenvalid(token);

    if (!isCustomJwtPayload(decodedToken)) {
      return next(new UnAuthenticatedError("Invalid token"));
    }

    req.user = {
      name: decodedToken.name,
      email: decodedToken.email,
      id: decodedToken.id,
    };

    next();
  } catch (err) {
    next(new UnAuthenticatedError("Invalid token"));
  }
};

export { authenticateUser };
