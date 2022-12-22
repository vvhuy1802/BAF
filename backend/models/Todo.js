const mongoose = require("mongoose");
const slug = require("mongoose-slug-generator");

const todoSchema = new mongoose.Schema({
  name: { type: String, required: true },
  isComplete: { type: Boolean, required: true },
  color: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  slug: { type: String, required: true },
});

todoSchema.plugin(slug);

const Todo = mongoose.model("Todo", todoSchema);

module.exports = Todo;
