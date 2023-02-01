import React, { useEffect, useState } from "react";
// import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import Router from "next/router";
import { isLoggedIn } from "../store/user";

export default function AuthProvider({ children }) {
  const dispatch = useDispatch();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const user = useSelector((state) => state.user);

  // var config = {
  //   method: "GET",
  //   url: `http://localhost:3001/me`,
  //   headers: {
  //     "Content-Type": "application/json",
  //     Authorization: `Bearer ${userData.user.token}`,
  //   },
  //   // data: {}
  // };
  useEffect(() => {
    // axios(config)
    //   .then(function (res) {
    //     setIsAuthenticated(true);
    //   })
    //   .catch(function (error) {
    //     setIsAuthenticated(false);
    //     dispatch(isLoggedIn(""));
    //     if (process.env.NODE_ENV === "production")
    //       Router.push(`${domain}/login`);
    //   });
  }, [user]);

  if (isAuthenticated) Router.push("/dashboard");
  if (!isAuthenticated && !Router.pathname.includes("/login"))
    Router.push("/login");

  return <React.Fragment>{!isAuthenticated && children}</React.Fragment>;
}
