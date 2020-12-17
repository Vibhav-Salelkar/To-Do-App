import React, { useState, useRef, useEffect } from "react";
import "./styles.css";
import uuidv4 from "uuid/v4";

const LOCAL_STORAGE_KEY = "todos";

export default function App() {
  const [todos, setTodos] = useState([]);
  const todoName = useRef();
  function handleAddItem() {
    let todoInputName = todoName.current.value;
    if (todoInputName === "") return;
    setTodos((prev) => {
      return [...prev, { id: uuidv4(), name: todoInputName, complete: false }];
    });
    todoName.current.value = null;
  }
  function handleClearItem() {
    let todosCopy = [...todos];
    let finalTodoList = todosCopy.filter((e) => e.complete === false);
    setTodos(finalTodoList);
  }
  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (storedTodos) setTodos(storedTodos);
  }, []);
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);
  function handleCheck(id) {
    const newTodos = [...todos];
    const item = newTodos.find((e) => e.id === id);
    item.complete = !item.complete;
    setTodos(newTodos);
  }
  return (
    <div className="App">
      <h1>To-Do List</h1>
      <div className="list">
        <ul>
          {todos.map((e) => {
            return (
              <li key={e.id}>
                <input
                  type="checkbox"
                  defaultChecked={e.complete}
                  onClick={() => handleCheck(e.id)}
                ></input>
                {e.name}
              </li>
            );
          })}
        </ul>
      </div>
      <input className="inputText" ref={todoName} type="text" />
      <br />
      <p>{todos.filter((e) => e.complete === false).length} pending</p>
      <br />
      <button className="btn1" onClick={handleAddItem}>
        Add Item
      </button>
      <button className="btn2" onClick={handleClearItem}>
        Clear Item
      </button>
    </div>
  );
}
