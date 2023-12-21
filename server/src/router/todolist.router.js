const { render, add, remove,edit } = require("../controller/todolist.controller");

const toDoList = (app) => {
  console.log("router");

  app.get("/render", render);
  app.post("/render", add);
  app.delete("/render/:id", remove);
  app.put("/render/:id", edit);
};
module.exports = { toDoList };
