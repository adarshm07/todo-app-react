import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  let navigate = useNavigate();

  useEffect(() => {
    if (window.localStorage.getItem("token")) {
      return navigate("/todo");
    } else {
      return;
    }
  }, [navigate]);

  return (
    <div className="container">
      <div className="login-col">
        <h2 className="heading-two">Login</h2>
        <form
          className="login-input"
          onSubmit={async (e) => {
            e.preventDefault();
            const values = {
              email: e.target.email.value,
              password: e.target.password.value,
            };
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

              // if login success, redirect to todo page, else show error
              if (
                res.status === "success" &&
                res.message !== "User not found"
              ) {
                if (window) {
                  localStorage.setItem("token", res.data.token);
                }
                return navigate("/todo");
              } else {
                alert("Error.");
              }
            } catch (error) {
              console.log(error);
            }
          }}
        >
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            placeholder="johndoe@example.com"
            type="email"
            required
          />

          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            placeholder="******"
            type="password"
            required
          />
          <button type="submit">Submit</button>
        </form>

        <div>
          <Link to={"/register"}>Create an account.</Link>
        </div>
      </div>
    </div>
  );
}
