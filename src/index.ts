import dotenv from "dotenv";
import "express-async-errors";
import cookieParser from "cookie-parser";

// DB
import connectDB from "./db/connect.js";

// middlewares
import notfoundMiddleware from "./middleware/notfound.js";
import errorHandlerMiddleware from "./middleware/error-handler.js";
import { authenticateUser } from "./middleware/auth.js";

// Express
import express from "express";

// Routers
import authRouter from "./routes/authRoute.js";
import expenseRouter from "./routes/expenseRoute.js";

dotenv.config();
const app = express();

app.use(express.json());
app.use(cookieParser(process.env.JWT_SECRET));

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/expenses", authenticateUser, expenseRouter);

app.use(notfoundMiddleware);
app.use(errorHandlerMiddleware);

const PORT = process.env.PORT || 5000;

const start = async () => {
  connectDB(process.env.MONGO_URL);
  app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
};

start();
