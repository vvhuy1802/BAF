const express = require("express");

const {deleteTodo, todo, todos, createTodo } = require("../controllers/TodoController");

const router = express.Router();

router.get("/todos/:slug", todo);
router.get("/todos", todos);

router.delete("/todos/:slug", deleteTodo);

router.post("/create", createTodo);

router.get("/public", (req, res, next) => {
  res.status(200).json({ message: "here is your public resource" });
});

// will match any other path
router.use("/", (req, res, next) => {
  res.status(404).json({ error: "page not found" });
});

module.exports = router;
