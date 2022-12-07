import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { Toast } from "../components/utility/notifyInfo";
import { REQ_URL } from "../constants";

const validateInputs = (name, password) => {
  if (name.length < 3) {
    Toast("error", "Name must be at least 3 characters long");
    return false;
  }
  if (password.length < 3) {
    Toast("error", "Password must be at least 3 characters long");
    return false;
  }
  return true;
};

const Signup = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
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
    if (validateInputs(formData.name, formData.password)) {
      axios
        .post(`/api/signup`, formData)
        .then((res) => {
          if (res.data.success) {
            Toast("success", res.data.message);
            router.push("/login");
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
    <section className="signup-section">
      <div>
        <h1>Sign Up</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              required
              onChange={handleInputChange}
              value={formData.name}
            />
          </div>
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
            <input type="submit" value="Sign Up" />
          </div>
          <Link href="/login">
            <button>Login</button>
          </Link>
          <Link href="/">
            <button>Home</button>
          </Link>
        </form>
      </div>
    </section>
  );
};

export default Signup;
