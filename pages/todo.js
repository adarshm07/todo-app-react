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
    if (Object.keys(user.user).length) {
      getTodo();
    } else {
      Router.push("/login");
    }
  }, []);
  // this function will add the todo to the ui and push it to the database.
  async function handleAddTodo(name) {
    // creating a copy of todos and adding the new todo to the todo state.
    const newTodos = [...todos, { name, isCompleted: false }];

    // on load this will call the getTodo function.
    // empty array means, it will load once on load.

    const data = await fetch("http://localhost:3001/todo/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, isCompleted: false }),
    }).then((res) => {
      console.log(res.json());
    });

    // this is an alternate approach, either we can update the ui this way - by setting the newTodo to todo state.
    // another approach would be - based on the res - you can show it or not in the ui.
    // calling the GET api again after getting the res is another way to get the latest update.
    setTodos(newTodos);
  }

  // this is the function to update the todo.
  // the same can be used to edit the todo with some updates.
  async function handleCompleteTodo(index, id) {
    const newTodos = [...todos];
    const data = await fetch(`http://localhost:3001/todo/update/${id}`, {
      method: "PUT",
    });
    newTodos[index].isCompleted = true;
    setTodos(newTodos);
  }

  // delete the todo api call.
  async function handleDeleteTodo(index) {
    const newTodos = [...todos];
    const data = await fetch(`http://localhost:3001/todo/delete/${index}`, {
      method: "DELETE",
    });
    const res = await data.json();
    newTodos.splice(index, 1);
    setTodos(newTodos);
  }

  // get api call
  const getTodo = async () => {
    const data = await fetch("http://localhost:3001/todo/get");
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
