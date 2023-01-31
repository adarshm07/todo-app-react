import React, { useState, useEffect } from "react";
import { store } from "../store";
import { Provider } from "react-redux";
import Login from "../components/Login";

function HomePage() {
  return (
    <Provider store={store}>
      <div className="login-app">
        <Login />
      </div>
    </Provider>
  );
}

export default HomePage;
