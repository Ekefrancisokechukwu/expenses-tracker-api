import { model, Schema } from "mongoose";
var Category;
(function (Category) {
    Category["GROCERIES"] = "groceries";
    Category["LEISURE"] = "leisure";
    Category["ELECTRONICS"] = "electronics";
    Category["UTILITIES"] = "utilities";
    Category["CLOTHING"] = "clothing";
    Category["HEALTH"] = "health";
})(Category || (Category = {}));
const ExpensesSchema = new Schema({
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
        set: (v) => v.toLowerCase(),
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
});
const Expense = model("Expenses", ExpensesSchema);
export default Expense;
//# sourceMappingURL=ExpenseModel.js.map