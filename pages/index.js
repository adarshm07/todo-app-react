import Link from "next/link";

export default function HomePage() {
  return (
    <div className="container">
      <h2 className="text-align-center">Todo App</h2>
      <div className="login-register">
        <Link href={"/login"}>Login</Link>
        <Link href={"/register"}>Register</Link>
      </div>
    </div>
  );
}
