import React, { useState, useEffect } from "react";
import TodoForm from "../components/TodoForm";
import TodoList from "../components/TodoList";

function HomePage() {
  const [todos, setTodos] = useState([]);

  async function handleAddTodo(title) {
    const newTodos = [...todos, { title, isCompleted: false }];

    const data = await fetch("http://localhost:3001/todo/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, isCompleted: false }),
    }).then((res) => {
      console.log(res.json());
    });

    setTodos(newTodos);
  }

  function handleCompleteTodo(index) {
    const newTodos = [...todos];
    newTodos[index].isCompleted = true;
    setTodos(newTodos);
  }

  async function handleDeleteTodo(index) {
    console.log(index);
    const newTodos = [...todos];
    const data = await fetch(`http://localhost:3001/todo/delete/${index}`, {
      method: "DELETE",
    });
    const res = await data.json();
    console.log(res);
    newTodos.splice(index, 1);
    setTodos(newTodos);
  }

  const getTodo = async () => {
    const data = await fetch("http://localhost:3001/todo/get");
    const res = await data.json();
    setTodos(res.data);
  };

  useEffect(() => {
    getTodo();
  }, []);

  return (
    <div className="todo-app">
      <TodoForm onSubmit={handleAddTodo} />
      <TodoList
        todos={todos}
        onComplete={handleCompleteTodo}
        onDelete={handleDeleteTodo}
      />
    </div>
  );
}

export default HomePage;
