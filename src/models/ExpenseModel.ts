import { Document, Model, model, Schema } from "mongoose";

enum Category {
  GROCERIES = "groceries",
  LEISURE = "leisure",
  ELECTRONICS = "electronics",
  UTILITIES = "utilities",
  CLOTHING = "clothing",
  HEALTH = "health",
}

interface IExpenses extends Document {
  description: string;
  date: Date;
  amount: number;
  title: string;
  userId: Schema.Types.ObjectId;
  category: Category;
}

const ExpensesSchema: Schema<IExpenses> = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  category: {
    type: String,
    enum: Object.values(Category),
    required: true,
    lowercase: true,
    set: (v: string) => v.toLowerCase(),
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const Expense: Model<IExpenses> = model<IExpenses>("Expenses", ExpensesSchema);

export default Expense;
