import mongoose from "mongoose";

export interface IUser {
  first_name: string;
  last_name: string;
  email: string;
  password?: string;
  username?: string;
  gender?: string;
}

const userSchema = new mongoose.Schema<IUser>({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String },
  username: { type: String },
  gender: { type: String },
});

export const User = mongoose.model<IUser>("User", userSchema);
