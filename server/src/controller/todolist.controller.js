const {
  getToDoList,
  addToDoList,
  deleteTodo,
} = require("../repository/todolist.repository");

async function render(req, res) {
  console.log("controller");
  const toDoList = await getToDoList();
  console.log(toDoList);
  res.status(200).json(toDoList);
}
async function add(req, res) {
  console.log(req.body);
  const newTodoList = await addToDoList(req.body);
  res.status(200).json(newTodoList);
}
async function remove(req, res) {
  const { id } = req.params;
  const newTodoList = await deleteTodo(id);
  res.status(200).json(newTodoList);
}
async function edit(req, res) {
  const { id } = req.params;
  const item = req.body;

  const newTodoList = await editTodo(id, item);
  res.status(200).json(newTodoList);
}

module.exports = {
  render,
  add,
  remove,
  edit,
};
