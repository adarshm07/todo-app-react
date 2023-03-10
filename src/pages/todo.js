import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import TodoForm from "../components/Todo/TodoForm";
import TodoList from "../components/Todo/TodoList";
import { getTodos, addTodo, updateTodo, deleteTodo } from "./api/todos";

export default function TodoApp() {
  const [todos, setTodos] = useState([]);

  let navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetchData();
    } else {
      navigate("/");
    }
  }, [navigate]);

  const fetchData = async () => {
    try {
      const todoData = await getTodos();
      setTodos(todoData);
    } catch (error) {
      console.error(error);
      // alert("Error fetching data.");
    }
  };

  const handleAddTodo = async (name) => {
    try {
      const result = await addTodo({ name, isCompleted: false });
      if (result.status === "success") {
        fetchData();
      } else {
        alert("Error adding todo.");
      }
    } catch (error) {
      console.error(error);
      alert("Error adding todo.");
    }
  };

  const handleCompleteTodo = async (index, id) => {
    try {
      const result = await updateTodo(id);
      if (result.status === "success") {
        fetchData();
      } else {
        alert("Error updating todo.");
      }
    } catch (error) {
      console.error(error);
      alert("Error updating todo.");
    }
  };

  const handleDeleteTodo = async (index) => {
    try {
      const result = await deleteTodo(index);
      if (result.status === "success") {
        fetchData();
      } else {
        alert("Error deleting todo.");
      }
    } catch (error) {
      console.error(error);
      alert("Error deleting todo.");
    }
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
