import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import TodoForm from "../components/Todo/TodoForm";
import TodoList from "../components/Todo/TodoList";
import {
  getTodos,
  addTodo,
  updateTodo,
  deleteTodo,
  getCategories,
} from "./api/todos";

export default function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");

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
      const [todoData, categoryData] = await Promise.all([
        getTodos(),
        getCategories(),
      ]);
      console.log(categoryData);
      setTodos(todoData);
      setCategories(categoryData);
    } catch (error) {
      console.error(error);
      // alert("Error fetching data.");
    }
  };

  const handleAddTodo = async (name, categoryId) => {
    try {
      const result = await addTodo({ name, isCompleted: false, categoryId });
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
        if (selectedCategory === "All") {
          fetchData();
        } else {
          getTodoByCategory(selectedCategory);
        }
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

  const getTodoByCategory = async (categoryId) => {
    try {
      const data = await getTodos(categoryId);
      setTodos(data);
    } catch (error) {
      console.error(error);
      alert("Error fetching data.");
    }
  };

  return (
    <Layout>
      <div className="todo-app">
        <TodoForm onSubmit={handleAddTodo} categories={categories} />

        <div className="filter-category">
          <div>
            <span>Filter by</span>
            <select
              className="todo-filter"
              name="category"
              value={selectedCategory}
              onChange={(e) => {
                setSelectedCategory(e.target.value);
                e.target.value === "All"
                  ? fetchData()
                  : getTodoByCategory(e.target.value);
              }}
            >
              <option value={"All"}>All</option>
              {categories &&
                categories.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.title}
                  </option>
                ))}
            </select>
          </div>

          <Link to={"/category"}>Edit Categories</Link>
        </div>
        <TodoList
          todos={todos}
          onComplete={handleCompleteTodo}
          onDelete={handleDeleteTodo}
          categories={categories}
        />
      </div>
    </Layout>
  );
}
