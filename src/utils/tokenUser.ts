import { IUser } from "../models/UserModel.js";
import { ITokenUser } from "../types.js";

const tokenUser = (user: IUser): ITokenUser => {
  return {
    email: user.email,
    name: user.name,
    id: user._id,
  };
};

export default tokenUser;
