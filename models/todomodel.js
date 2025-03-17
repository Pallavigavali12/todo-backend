import mongoose from "mongoose";

const todoschema = new mongoose.Schema({
  task: { type: String, required: true },
  status: { type: Boolean, default: false },
  userid: { type: String, required: true },
  createdAt: { type: Date, default: Date.now() },
});

const todomodel = mongoose.model("todos", todoschema);

export default todomodel;
