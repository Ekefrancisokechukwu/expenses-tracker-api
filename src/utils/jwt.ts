import jwt, { JwtPayload } from "jsonwebtoken";
import { ITokenUser } from "../types.js";
import { Response } from "express";

export interface CustomJwtPayload extends JwtPayload {
  email: string;
  name: string;
  id: string;
}

const createToken = (payload: ITokenUser) => {
  const secretKey = process.env.JWT_SECRET;
  const options = { expiresIn: "1d" };

  const token = jwt.sign(payload, secretKey, options);

  return token;
};

const isTokenvalid = (token: string): CustomJwtPayload | string => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET) as CustomJwtPayload;
  } catch (err) {
    throw new Error("Invalid token");
  }
};

const attachcookiesToResponse = (res: Response, tokenUser: ITokenUser) => {
  const token = createToken(tokenUser);

  const oneDay = 1000 * 60 * 60 * 24;

  res.cookie("token", token, {
    httpOnly: true,
    expires: new Date(Date.now() + oneDay),
    secure: process.env.NODE_ENV === "production",
    signed: true,
  });

  return token;
};

export { attachcookiesToResponse, isTokenvalid };
