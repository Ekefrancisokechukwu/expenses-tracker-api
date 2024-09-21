import { Document, Model, model, Schema } from "mongoose";
import bycrypt from "bcryptjs";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const UserSchema: Schema<IUser> = new Schema({
  name: { type: String, required: [true, "Please Provide Name"] },
  email: {
    type: String,
    required: [true, "Please Provide Email"],
    unique: true,
  },
  password: { type: String, required: [true, "Please Provide Password"] },
});

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bycrypt.genSalt(14);
  this.password = await bycrypt.hash(this.password, salt);
});

UserSchema.methods.comparePassword = async function (
  candidatePassword: string
) {
  const isMatch = await bycrypt.compare(candidatePassword, this.password);
  return isMatch;
};

const User: Model<IUser> = model<IUser>("User", UserSchema);

export default User;
