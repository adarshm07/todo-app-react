import { Field, Form, Formik } from "formik";
import Router from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { isLoggedIn } from "../store/user";

export default function LoginForm() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  // console.log(user);
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
            // alert(JSON.stringify(values, null, 2));
            try {
              const data = await fetch("http://localhost:3001/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(values),
              });
              const res = await data.json();
              const user = {
                firstName: res.data.getUser.firstName,
                lastName: res.data.getUser.lastName,
                email: res.data.getUser.email,
                token: res.data.token,
              };
              dispatch(isLoggedIn(user));

              res.status === "success" ? Router.push("/todo") : alert("Error.");
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
