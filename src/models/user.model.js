import mongoose from "mongoose";
import { RoleIds } from "../enums/roles.enum.js";

const UserModel = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: Object.values(RoleIds),
      default: RoleIds.USER,
      required: true,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserModel);
export default User;
