import Link from "next/link";

export default function HomePage() {
  return (
    <div>
      <Link href={"/login"}>Login</Link>
      <Link href={"/register"}>Register</Link>
    </div>
  );
}
