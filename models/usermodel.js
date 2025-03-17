import mongoose from "mongoose";

const user = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    
  },
  { timestamps: true }
);

const usermodel = mongoose.model("user", user);

export default usermodel;
