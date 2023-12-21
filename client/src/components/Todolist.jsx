import React, { useEffect, useState } from "react";
import publicAxios from "../config/pulicAxios";

export default function Todolist() {
  const [toDoList, setTodDoList] = useState([]);
  const [newToDo, setNewToDo] = useState({
    name: "",
    work: "",
    status: 0,
    complete: 0,
  });
  const [check, setCheck] = useState(true);
  const takeTodolist = async () => {
    try {
      const response = await publicAxios.get("/render");
      setTodDoList(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    takeTodolist();
  }, []);
  const handleTakeValue = async (e) => {
    setNewToDo({
      ...newToDo,
      [e.target.name]: e.target.value,
    });
  };
  const handleAdd = async () => {
    try {
      await publicAxios.post("/render", newToDo);
      takeTodolist();
      setNewToDo({
        name: "",
        work: "",
        status: 0,
        complete: 0,
      });
    } catch (error) {
      console.log(error);
    }
  };
  const handleDelete = async (id) => {
    console.log(id);
    try {
      await publicAxios.delete(`/render/${id}`);
      takeTodolist();
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = async (item) => {
    let newItem = { ...item, complete: 1 };
    setNewToDo(newItem);
    setCheck(!check);
  };
  const handleSave = async () => {
    try {
      await publicAxios.put(`/render/${newToDo.id}`, newToDo);
      takeTodolist();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      {" "}
      <div className="wrapper">
        <div className="task-input">
          <ion-icon name="create-outline" />
          <input
            type="text"
            placeholder="Add a Name"
            onChange={handleTakeValue}
            name="name"
            value={newToDo.name}
          />
        </div>
        <div className="task-input" style={{ marginTop: "10px" }}>
          <ion-icon name="create-outline" />
          <input
            type="text"
            placeholder="Add a Work"
            onChange={handleTakeValue}
            name="work"
            value={newToDo.work}
          />
        </div>
        <div v className="task-input" style={{ marginTop: "10px" }}>
          {check ? (
            <button className="clear-btn active" onClick={handleAdd}>
              Add
            </button>
          ) : (
            <button className="clear-btn active" onClick={handleSave}>
              Save
            </button>
          )}
        </div>
        <div className="controls" style={{ marginTop: "-30px" }}>
          <div className="filters">
            <span className="active" id="all">
              All
            </span>
            <span id="pending">Pending</span>
            <span id="completed">Completed</span>
          </div>
          <button className="clear-btn active">Clear All</button>
        </div>
        <ul className="task-box">
          {toDoList.map((item, index) => (
            <li className="task" key={index}>
              <label
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "left",
                  justifyContent: "left",
                }}
              >
                {item.complete == 1 ? (
                  <p style={{ textDecoration: "line-through" }}>{item.name}</p>
                ) : (
                  <p>{item.name}</p>
                )}
              </label>
              <div>
                <button className="clear-btn active">
                  {newToDo.complete == 1 ? <>complate</> : <>complated</>}
                </button>{" "}
                <button
                  className="clear-btn active"
                  style={{ marginRight: "20px" }}
                  onClick={() => handleEdit(item)}
                >
                  Edit
                </button>
                <button
                  className="clear-btn active"
                  onClick={() => handleDelete(item.id)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
