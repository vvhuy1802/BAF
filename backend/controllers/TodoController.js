const Todo = require("../models/Todo");

const todos = (req, res, next) => {
  Todo.find({
    //conditions here
    $where: function () {
      return this.isComplete === false;
    },
  })
    .then((todos) => res.status(200).json(todos))
    .catch((err) => res.status(500).json({ error: err }));
};

const todo = (req, res, next) => {
  const slug = req.params.slug;
  Todo.findOne({ slug: slug })
    .then((todo) => res.status(200).json(todo))
    .catch((err) => res.status(500).json({ error: err }));
};

const deleteTodo = (req, res, next) => {
  const slug = req.params.slug;
  Todo.deleteOne({ slug: slug })
    .then((todo) => res.status(200).json(todo))
    .catch((err) => res.status(500).json({ error: err }));
};

const createTodo = (req, res, next) => {
  const todo = new Todo({
    name: req.body.name,
    isComplete: req.body.isComplete,
    color: req.body.color,
    slug: req.body.slug,
  });
  todo
    .save()
    .then((todo) =>
      res.status(201).json({
        message: "Todo created successfully",
        todo: todo,
        status: 201,
      })
    )
    .catch((err) => res.status(500).json({ error: err }));
};

module.exports = { todos, createTodo, todo, deleteTodo };
