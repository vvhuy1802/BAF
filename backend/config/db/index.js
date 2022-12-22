const mongoose = require("mongoose");
mongoose.set("strictQuery", true);

const connect = () => {
  mongoose
    .connect("mongodb://localhost:27017/learn_nodejs_dev", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.log(err));
};

module.exports = { connect };
