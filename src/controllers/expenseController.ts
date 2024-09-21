import { Request, Response } from "express";
import Expense from "../models/ExpenseModel.js";
import BadRequestError from "../errors/bad-request.js";
import checkUserpermissions from "../utils/checkUserPermission.js";
import NotFoundError from "../errors/notfound-error.js";

const createExpense = async (req: Request, res: Response) => {
  const { amount, description, category, title } = req.body;

  if (!amount || !category || !title) {
    throw new BadRequestError("Please provide all credentials");
  }
  const expense = await Expense.create({
    amount,
    description,
    category,
    title,
    userId: req.user.id,
  });

  res.status(201).json({ message: "Expense added successfully", expense });
};

const getAllExpenses = async (req: Request, res: Response) => {
  const { filterType, startDate, endDate } = req.query;

  let filter: any = { userId: req.user.id };

  const currentDate = new Date();

  const resetTime = (date: Date) => {
    date.setUTCHours(0, 0, 0, 0);
    return date;
  };

  if (filterType === "pastWeek") {
    const pastWeek = new Date();
    pastWeek.setDate(currentDate.getDate() - 7);
    filter.date = { $gte: resetTime(pastWeek) };
  } else if (filterType === "pastMonth") {
    const pastMonth = new Date();
    pastMonth.setMonth(currentDate.getMonth() - 1);
    filter.date = { $gte: resetTime(pastMonth) };
  } else if (filterType === "last3Months") {
    const last3Months = new Date();
    last3Months.setMonth(currentDate.getMonth() - 3);
    filter.date = { $gte: resetTime(last3Months) };
  } else if (filterType === "custom" && startDate && endDate) {
    filter.date = {
      $gte: resetTime(new Date(startDate as string)),
      $lte: resetTime(new Date(endDate as string)),
    };
  }

  const expenses = await Expense.find(filter);
  res.status(200).json({ expenses, count: expenses.length });
};

const updateExpense = async (req: Request, res: Response) => {
  const { id: expenseId } = req.params;
  const { title, category, amount, description } = req.body;

  const expense = await Expense.findOne({ _id: expenseId });

  if (!expense) {
    throw new NotFoundError(`No expense with id: ${expenseId} found! .`);
  }

  const requestUserId = expense.userId.toString();
  checkUserpermissions(req.user.id, requestUserId);

  expense.title = title;
  expense.category = category;
  expense.amount = amount;
  expense.description = description;
  await expense.save();

  res.status(200).json({ message: "Expense updated successfully", expense });
};

const deleteExpense = async (req: Request, res: Response) => {
  const { id: expenseId } = req.params;

  const expense = await Expense.findOne({ _id: expenseId });

  if (!expense) {
    throw new NotFoundError(`No expense with id: ${expenseId} found! .`);
  }

  const requestUserId = expense.userId.toString();
  checkUserpermissions(req.user.id, requestUserId);

  await expense.deleteOne();

  res.status(200).json({ message: "Expense deleted successfully" });
};

export { createExpense, getAllExpenses, updateExpense, deleteExpense };
