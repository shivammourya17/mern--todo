import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
  text: String,
  completed: { type: Boolean, default: false }
});

export default mongoose.model("Todo", todoSchema);
