import express from "express";
import Todo from "../models/Todo.js";

const router = express.Router();

// Get all todos
router.get("/", async (req, res) => {
  const todos = await Todo.find();
  res.json(todos);
});

// Add new todo
router.post("/", async (req, res) => {
  const todo = new Todo({ text: req.body.text });
  const saved = await todo.save();
  res.json(saved);
});

// Toggle complete
router.put("/:id", async (req, res) => {
  const todo = await Todo.findById(req.params.id);
  todo.completed = !todo.completed;
  const updated = await todo.save();
  res.json(updated);
});

// Update text
router.put("/edit/:id", async (req, res) => {
  const updated = await Todo.findByIdAndUpdate(
    req.params.id,
    { text: req.body.text },
    { new: true }
  );
  res.json(updated);
});

// Delete
router.delete("/:id", async (req, res) => {
  await Todo.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

export default router;
