import Link from "next/link";
import Router from "next/router";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Layout from "../components/Layout";
import TodoForm from "../components/Todo/TodoForm";
import TodoList from "../components/Todo/TodoList";

function TodoApp() {
  const user = useSelector((state) => state.user);
  // state to store the list of todos - default value []
  const [todos, setTodos] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  const headers = {
    "Content-Type": "application/json",
    "x-token": user.user.token,
  };

  useEffect(() => {
    // check if user object is empty or not,
    // if empty which means user is not logged in,
    // redirect to login page.
    if (Object.keys(user.user).length) {
      getTodo();
      getAllCategories();
    } else {
      Router.push("/login");
    }
  }, []);

  // this function will add todo to the database.
  async function handleAddTodo(name, categoryId) {
    const data = await fetch(
      `${process.env.REACT_APP_PUBLIC_API_URL}/todo/add`,
      {
        method: "POST",
        headers,
        body: JSON.stringify({ name, isCompleted: false, categoryId }),
      }
    ).then(async (res) => {
      const result = await res.json();
      // if success, call get api, this is to make sure that we have all the latest data and to get the _id from mongodb.
      result.status === "success" ? getTodo() : alert("Error.");
    });
  }

  // this is the function to update the todo completed status in database.
  // the same can be used to edit the todo with some updates.
  async function handleCompleteTodo(index, id) {
    const data = await fetch(
      `${process.env.REACT_APP_PUBLIC_API_URL}/todo/update/${id}`,
      {
        method: "PUT",
        headers,
      }
    ).then(async (res) => {
      const result = await res.json();
      // we can call the getTodo api or just update here in ui without calling the api.
      // but calling the api will make sure that you get the latest data from database.
      result.status === "success"
        ? selectedCategory === "All"
          ? getTodo()
          : getTodoByCategory(selectedCategory)
        : alert("Error.");
    });
  }

  // delete the todo api call.
  async function handleDeleteTodo(index) {
    // const newTodos = [...todos];
    const data = await fetch(
      `${process.env.REACT_APP_PUBLIC_API_URL}/todo/delete/${index}`,
      {
        method: "DELETE",
        headers,
      }
    ).then(async (res) => {
      const result = await res.json();
      // we can call the getTodo api or just update here in ui without calling the api.
      result.status === "success" ? getTodo() : alert("Error.");
    });
  }

  // get api call
  const getTodo = async () => {
    const data = await fetch(
      `${process.env.REACT_APP_PUBLIC_API_URL}/todo/get`,
      {
        method: "GET",
        headers,
      }
    );
    const res = await data.json();
    setTodos(res.data);
  };

  const getTodoByCategory = async (categoryId) => {
    const data = await fetch(
      `${process.env.REACT_APP_PUBLIC_API_URL}/todo/get/${categoryId}`,
      {
        method: "GET",
        headers,
      }
    );
    const res = await data.json();
    setTodos(res.data);
  };

  // get all categories
  const getAllCategories = async () => {
    const data = await fetch(
      `${process.env.REACT_APP_PUBLIC_API_URL}/category/get`,
      {
        method: "GET",
        headers,
      }
    );
    const res = await data.json();
    setCategories(res.data);
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
              onChange={(e) => {
                setSelectedCategory(e.target.value);
                // check if selected filter is All or category.
                e.target.value === "All"
                  ? getTodo()
                  : getTodoByCategory(e.target.value);
              }}
            >
              {/* adding a default option. */}
              <option value={"All"}>All</option>
              {categories &&
                categories.map((item, index) => {
                  return (
                    <option key={index} value={item._id} name={index}>
                      {item.title}
                    </option>
                  );
                })}
            </select>
          </div>

          <Link href={"/category"}>Edit Categories</Link>
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

export default TodoApp;
