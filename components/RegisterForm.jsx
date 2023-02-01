import { Field, Form, Formik } from "formik";
// import { useSelector } from "react-redux";

export default function RegisterForm() {
  // const user = useSelector((state) => state.user);
  return (
    <div>
      <h2>Register</h2>
      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          email: "",
          password: "",
        }}
        onSubmit={async (values) => {
          // alert(JSON.stringify(values, null, 2));
          console.log(values);
          try {
            const data = await fetch("http://localhost:3001/register", {
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
          <label htmlFor="firstName">First Name</label>
          <Field
            id="firstName"
            name="firstName"
            placeholder="John"
            type="text"
          />

          <label htmlFor="lastName">Last Name</label>
          <Field id="lastName" name="lastName" placeholder="Doe" type="text" />

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
