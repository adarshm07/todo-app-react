import { Field, Form, Formik } from "formik";
import { Link, useNavigate } from "react-router-dom";

export default function RegisterForm() {
  let navigate = useNavigate();
  return (
    <div className="container">
      <div className="login-col">
        <h2>Register</h2>
        <Formik
          initialValues={{
            firstName: "",
            lastName: "",
            email: "",
            password: "",
          }}
          onSubmit={async (values) => {
            try {
              const data = await fetch(
                `${process.env.REACT_APP_PUBLIC_API_URL}/register`,
                {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify(values),
                }
              );
              const res = await data.json();
              // if register success, redirect to login page
              if (res.status === "success") {
                return navigate("/");
              }
            } catch (error) {
              console.log(error);
            }
          }}
        >
          <Form className="login-input">
            <label htmlFor="firstName">First Name</label>
            <Field
              id="firstName"
              name="firstName"
              placeholder="John"
              type="text"
            />

            <label htmlFor="lastName">Last Name</label>
            <Field
              id="lastName"
              name="lastName"
              placeholder="Doe"
              type="text"
            />

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
        <div>
          <Link to={"/"}>Login</Link>
        </div>
      </div>
    </div>
  );
}
