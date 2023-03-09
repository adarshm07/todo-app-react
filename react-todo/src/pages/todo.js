import React, { useState, useEffect } from "react";
import axios from "axios";
import { redirect } from "react-router-dom";

function TodoList() {
  const [todos, setTodos] = useState([]);
  // const [userLoggedIn, setUserLoggedIn] = useState(false);

  // useEffect(() => {
  //   isLoggedIn();
  //   if (localStorage.getItem("token")) return redirect("/todo");
  // }, [userLoggedIn]);

  // function isLoggedIn() {
  //   // if (localStorage.getItem("token")) {
  //   setUserLoggedIn(true);
  //   // return redirect("/todo");
  //   // }
  // }

  const headers = {
    "Content-Type": "application/json",
    "x-token": window.localStorage.getItem("token"),
  };

  useEffect(() => {
    (async function () {
      await fetch(`${process.env.REACT_APP_PUBLIC_API_URL}/todo/get`, {
        method: "GET",
        headers,
      })
        .then((response) => {
          console.log(response.json());
          setTodos(response.data);
        })
        .catch((error) => console.log(error));
    })();
  }, [headers, todos]);

  console.log(todos);

  const addTodo = async (newTodoText) => {
    await fetch(`${process.env.REACT_APP_PUBLIC_API_URL}/todo/add`, {
      method: "POST",
      headers,
      body: JSON.stringify({ name: newTodoText, isCompleted: false }),
    })
      .then((response) => setTodos([...todos, response.data]))
      .catch((error) => console.log(error));
  };

  const markTodoAsCompleted = (id) => {
    axios
      .put(`http://localhost:3001/todo/update/${id}`)
      .then((response) => {
        const updatedTodos = todos.map((todo) => {
          if (todo.id === id) {
            return { ...todo, completed: true };
          } else {
            return todo;
          }
        });
        setTodos(updatedTodos);
      })
      .catch((error) => console.log(error));
  };

  const deleteTodo = (id) => {
    axios
      .delete(`http://localhost:3001/todo/delete/${id}`)
      .then((response) => {
        const updatedTodos = todos.filter((todo) => todo.id !== id);
        setTodos(updatedTodos);
      })
      .catch((error) => console.log(error));
  };

  return (
    <div>
      <AddTodoForm addTodo={addTodo} />
    </div>
  );
}

function AddTodoForm({ addTodo }) {
  const [newTodoText, setNewTodoText] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    if (newTodoText.trim() !== "") {
      addTodo(newTodoText.trim());
      setNewTodoText("");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={newTodoText}
        onChange={(event) => setNewTodoText(event.target.value)}
      />
      <button type="submit">Add</button>
      <button
        onClick={() => {
          localStorage.removeItem("token");
          return redirect("/");
        }}
      >
        Logout
      </button>
    </form>
  );
}

export default TodoList;
