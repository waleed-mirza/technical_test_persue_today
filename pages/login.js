import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { Toast } from "../components/utility/notifyInfo";
import { REQ_URL } from "../constants";

const validateInputs = (password) => {
  if (password.length < 3) {
    Toast("error", "Password must be at least 3 characters long");
    return false;
  }
  return true;
};

const Login = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateInputs(formData.password)) {
      axios
        .post(`/api/login`, formData)
        .then((res) => {
          if (res.data.success) {
            Toast("success", res.data.message);
            localStorage.setItem("token", res.data.token);
            router.push("/profile");
          } else {
            Toast("error", res.data.message);
          }
        })
        .catch((err) => {
          Toast("error", err.message);
        });
    }
  };
  return (
    <section className="login-section">
      <div>
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              required
              onChange={handleInputChange}
              value={formData.email}
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              required
              onChange={handleInputChange}
              value={formData.password}
            />
          </div>
          <div>
            <input type="submit" value="Login" />
          </div>
          <Link href="/signup">
            <button>Sign Up</button>
          </Link>
          <Link href="/">
            <button>Home</button>
          </Link>
        </form>
      </div>
    </section>
  );
};

export default Login;
