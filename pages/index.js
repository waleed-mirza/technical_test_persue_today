import Image from "next/image";
import Link from "next/link";
import { REQ_URL } from "../constants";

export default function Home() {
  return (
    <div className="home-section">
      <h1>Welcome User</h1>
      <div className="nav-links">
        <Link href="/signup">
          <button>Signup</button>
        </Link>
        <Link href="/login">
          <button>Login</button>
        </Link>
      </div>
    </div>
  );
}
