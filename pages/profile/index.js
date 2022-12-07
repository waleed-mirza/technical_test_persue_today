import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Toast } from "../../components/utility/notifyInfo";
import { useRouter } from "next/router";

const Profile = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [name, setName] = useState("");
  const router = useRouter();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios
        .get(`/api/user/verify`, {
          headers: {
            "x-access-token": token,
          },
        })
        .then((res) => {
          if (res.data.success) {
            setUserInfo(res.data.result);
          } else {
            Toast("error", res.data.message);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.length < 3) {
      Toast("error", "Name must be at least 3 characters long");
      return;
    }
    const token = localStorage.getItem("token");
    if (token) {
      axios
        .post(`/api/user/updatename`, {
          newname: name,
          userid: userInfo._id,
        })
        .then((res) => {
          if (res.data.success) {
            Toast("success", res.data.message);
            setUserInfo(res.data.result);
            setName("");
          } else {
            Toast("error", res.data.message);
          }
        });
    }
  };

  if (userInfo) {
    return (
      <div className="profile-section">
        <div className="logout-btn">
          <button
            onClick={() => {
              localStorage.removeItem("token");
              router.push("/login");
            }}
          >
            Logout
          </button>
        </div>
        <h1>Profile</h1>
        <div>
          <h5>Name: {userInfo.name}</h5>
          <h5>Email: {userInfo.email}</h5>
        </div>
        <div className="name-form">
          <h3>Edit Name</h3>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name">Name</label>
              <input
                type="text"
                placeholder="Enter New Name"
                id="name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </div>
            <input type="submit" value="UPDATE" />
          </form>
        </div>
      </div>
    );
  }
  return (
    <div className="profile-section">
      <div>Restricted Page</div>
      <Link href="/login">
        <button>Login</button>
      </Link>
    </div>
  );
};

export default Profile;
