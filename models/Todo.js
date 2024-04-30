const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const Schema = mongoose.Schema;

const todoSchema = new Schema({
  id: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  description: { type: String },
  completed: { type: Boolean, default: false },
});

todoSchema.pre("save", (next) => {
  if (!this.id) {
    this.id = uuidv4();
  }
  next();
});

const Todo = mongoose.model("Todo", todoSchema);

module.exports = Todo;
