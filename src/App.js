import React, { useEffect, useState } from "react";
import TodoApp from "./pages/todo";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import LoginForm from "./components/LoginForm";
import Category from "./pages/category";
import { useSelector } from "react-redux";

function App() {
  const user = useSelector((state) => state.user);
  // console.log(user.user);
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  useEffect(() => {
    Object.keys(user.user).length > 0
      ? setUserLoggedIn(true)
      : setUserLoggedIn(false);
  }, [user]);
  return (
    <React.Fragment>
      <Router>
        <Routes>
          <Route exact path="/" element={userLoggedIn ? <TodoApp /> : <LoginForm />} />
          <Route exact path="todo" element={userLoggedIn ? <TodoApp /> : <LoginForm />} />
          <Route exact path="category" element={userLoggedIn ? <Category /> : <LoginForm />} />
        </Routes>
      </Router>
    </React.Fragment>
  );
}

export default App;
