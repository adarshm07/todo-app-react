import { Field, Form, Formik } from "formik";
import { useSelector } from "react-redux";

export default function LoginForm() {
  const user = useSelector((state) => state.user);
  return (
    <div>
      <h2>Login</h2>
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
            console.log(res);
          } catch (error) {
            console.log(error);
          }
        }}
      >
        <Form>
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
  );
}
