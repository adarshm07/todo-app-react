import "./App.css";
import TodoList from "./pages/todo";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  redirect,
} from "react-router-dom";
import LoginForm from "./components/LoginForm";
import { useEffect, useState } from "react";

function App() {
  const [userLoggedIn, setUserLoggedIn] = useState(false);

  useEffect(() => {
    if (window && window.localStorage.getItem("token")) setUserLoggedIn(true);
  }, [userLoggedIn]);

  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/" element={<LoginForm />} />
          <Route exact path="todo" element={<TodoList />} />
          {/* <Route exact path="category" element={userLoggedIn ? <Category /> : <LoginForm />} /> */}
        </Routes>
      </Router>
    </>
  );
}

export default App;
