import Router from "next/router";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Layout from "../components/Layout";
import TodoForm from "../components/TodoForm";
import TodoList from "../components/TodoList";

function TodoApp() {
  const user = useSelector((state) => state.user);
  // state to store the list of todos - default value []
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    // check if user object is empty or not,
    // if empty which means user is not logged in,
    // redirect to login page.
    if (Object.keys(user.user).length) {
      getTodo();
    } else {
      Router.push("/login");
    }
  }, []);

  // this function will add todo to the database.
  async function handleAddTodo(name) {
    const data = await fetch("http://localhost:3001/todo/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-token": user.user.token,
      },
      body: JSON.stringify({ name, isCompleted: false }),
    }).then(async (res) => {
      const result = await res.json();
      // if success, call get api, this is to make sure that we have all the latest data and to get the _id from mongodb.
      result.status === "success" ? getTodo() : alert("Error.");
    });
  }

  // this is the function to update the todo completed status in database.
  // the same can be used to edit the todo with some updates.
  async function handleCompleteTodo(index, id) {
    const newTodos = [...todos];
    const data = await fetch(`http://localhost:3001/todo/update/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "x-token": user.user.token,
      },
    }).then(async (res) => {
      newTodos[index].isCompleted = true;
      const result = await res.json();
      // we can call the getTodo api or just update here in ui without calling the api.
      // but calling the api will make sure that you get the latest data from database.
      result.status === "success" ? getTodo() : alert("Error.");
    });
  }

  // delete the todo api call.
  async function handleDeleteTodo(index) {
    const newTodos = [...todos];
    const data = await fetch(`http://localhost:3001/todo/delete/${index}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "x-token": user.user.token,
      },
    }).then(async (res) => {
      const result = await res.json();
      // we can call the getTodo api or just update here in ui without calling the api.
      result.status === "success" ? getTodo() : alert("Error.");
    });
  }

  // get api call
  const getTodo = async () => {
    const data = await fetch("http://localhost:3001/todo/get", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-token": user.user.token,
      },
    });
    const res = await data.json();
    setTodos(res.data);
  };

  return (
    <Layout>
      <div className="todo-app">
        <TodoForm onSubmit={handleAddTodo} />
        <TodoList
          todos={todos}
          onComplete={handleCompleteTodo}
          onDelete={handleDeleteTodo}
        />
      </div>
    </Layout>
  );
}

export default TodoApp;
