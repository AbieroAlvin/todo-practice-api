const Todo = require("../models/Todo");

// Get all todos
const getAllTodos = async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

// Get a specific todo
const getTodoById = async (req, res) => {
  try {
    const todo = await Todo.findOne({ id: req.params.id });
    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }
    res.json(todo);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

// create a new todo
const createTodo = async (req, res) => {
  const { title, description } = req.body;

  const newTodo = new Todo({
    title,
    description,
  });

  try {
    const todo = await newTodo.save();
    res.status(201).json(todo);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

// update an existing todo
const updateTodo = async (req, res) => {
  try {
    const todo = await Todo.findOne({ id: req.params.id });
    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    if (req.body.title != null) {
      todo.title = req.body.title;
    }
    if (req.body.description != null) {
      todo.description = req.body.description;
    }
    if (req.body.completed != null) {
      todo.completed = req.body.completed;
    }

    const updatedTodo = await todo.save();
    res.json(updatedTodo);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

// delete a todo
const deleteTodo = async (req, res) => {
  try {
    const todo = await Todo.findOne({ id: req.params.id });
    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    await todo.remove();
    res.json({ message: "Todo deleted" });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

module.exports = {
  getAllTodos,
  getTodoById,
  createTodo,
  updateTodo,
  deleteTodo,
};
