const express = require("express");
const app = express();
require("dotenv").config();
const port = process.env.PORT || 3000;
const cors = require("cors");

const { toDoList } = require("./src/router/todolist.router");
const bodyParser = require("body-parser");

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

toDoList(app);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
