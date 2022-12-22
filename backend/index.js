const express = require("express");
const router = require("./routers/routers.js");
const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

const db = require("./config/db");
db.connect();

app.use(router);

app.listen(port, '192.168.0.109', () => console.log(`App listening on port ${port}!`));
