import { Request, Response } from "express";
import BadRequestError from "../errors/bad-request.js";
import User from "../models/UserModel.js";
import tokenUser from "../utils/tokenUser.js";
import { attachcookiesToResponse } from "../utils/jwt.js";
import NotFoundError from "../errors/notfound-error.js";

const register = async (req: Request, res: Response) => {
  const { email, name, password } = req.body;

  if (!email || !name || !password) {
    throw new BadRequestError("Invalid Please provide all values");
  }

  const isEmailExist = await User.findOne({ email: email });

  if (isEmailExist) {
    throw new BadRequestError("Email already exist");
  }

  const user = await User.create(req.body);

  res.status(201).json({ message: "User registered successfully", user });
};

const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequestError("Please provide email and password");
  }

  const user = await User.findOne({ email });

  if (!user) {
    throw new NotFoundError("No user found!");
  }

  const passwordMatch = await user.comparePassword(password);

  if (!passwordMatch) {
    throw new BadRequestError("Invalid Password");
  }

  const formatedUser = tokenUser(user);

  const token = attachcookiesToResponse(res, formatedUser);

  res.status(200).json({ user: formatedUser, token });
};

export { register, login };
