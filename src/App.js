import React from "react";
import TodoApp from "./pages/todo";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginForm from "./components/LoginForm";
// import Category from "./pages/category";
import Categories from "./components/Category/Categories";
import RegisterForm from "./components/RegisterForm";

function App() {
  return (
    <React.Fragment>
      <Router>
        <Routes>
          <Route exact path="/" element={<LoginForm />} />
          <Route exact path="todo" element={<TodoApp />} />
          <Route exact path="category" element={<Categories />} />
          <Route exact path="register" element={<RegisterForm />} />
        </Routes>
      </Router>
    </React.Fragment>
  );
}

export default App;
