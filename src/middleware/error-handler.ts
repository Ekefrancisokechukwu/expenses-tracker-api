import { NextFunction, Request, Response } from "express";

interface CustomError extends Error {
  statusCode?: number;
  errors?: { [key: string]: { message: string } };
  value?: string;
}

const errorHandler = async (
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const customError = {
    statusCode: err.statusCode || 500,
    message: err.message || "Something went wrong!",
  };

  if (err.name === "ValidationError" && err.errors) {
    customError.message = Object.values(err.errors)
      .map((item) => item.message)
      .join(",");
    customError.statusCode = 400;
  }

  if (err.name === "CastError") {
    customError.message = `No item found with id : ${err.value}`;
    customError.statusCode = 404;
  }

  res.status(customError.statusCode).json({ message: customError.message });
};

export default errorHandler;
