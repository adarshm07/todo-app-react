import { Field, Form, Formik } from "formik";
import { useState } from "react";
import { useEffect } from "react";
import { redirect } from "react-router-dom";

export default function LoginForm() {
  // const [userLoggedIn, setUserLoggedIn] = useState(false);

  // useEffect(() => {
  //   isLoggedIn();
  // }, [userLoggedIn]);

  // function isLoggedIn() {
  if (window.localStorage.getItem("token")) {
    return redirect("/todo");
  }
  // }
  return (
    <div className="container">
      <div className="login-col">
        <h2 className="heading-two">Login</h2>
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          onSubmit={async (values) => {
            try {
              const data = await fetch(
                `${process.env.REACT_APP_PUBLIC_API_URL}/login`,
                {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify(values),
                }
              );
              const res = await data.json();

              if (window) window.localStorage.setItem("token", res.data.token);
              // dispatch(isLoggedIn(user));
              // if login success, redirect to todo page, else show error
              if (res) {
                // return redirect("/todo");
                // setUserLoggedIn(true);
              } else {
                alert("Error.");
              }
            } catch (error) {
              console.log(error);
            }
          }}
        >
          <Form className="login-input">
            <label htmlFor="email">Email</label>
            <Field
              id="email"
              name="email"
              placeholder="johndoe@example.com"
              type="email"
            />

            <label htmlFor="password">Password</label>
            <Field
              id="password"
              name="password"
              placeholder="******"
              type="password"
            />
            <button type="submit">Submit</button>
          </Form>
        </Formik>
      </div>
    </div>
  );
}
