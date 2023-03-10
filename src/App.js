import React from "react";
import TodoApp from "./pages/todo";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import Category from "./pages/category";
import Categories from "./components/Category/Categories";
import Login from "./pages/login";
import Register from "./pages/register";

function App() {
  return (
    <React.Fragment>
      <Router>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route exact path="todo" element={<TodoApp />} />
          <Route exact path="category" element={<Categories />} />
          <Route exact path="register" element={<Register />} />
        </Routes>
      </Router>
    </React.Fragment>
  );
}

export default App;
