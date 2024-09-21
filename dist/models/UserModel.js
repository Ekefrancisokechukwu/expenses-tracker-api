import { model, Schema } from "mongoose";
import bycrypt from "bcryptjs";
const UserSchema = new Schema({
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
UserSchema.methods.comparePassword = async function (candidatePassword) {
    const isMatch = await bycrypt.compare(candidatePassword, this.password);
    return isMatch;
};
const User = model("User", UserSchema);
export default User;
//# sourceMappingURL=UserModel.js.map