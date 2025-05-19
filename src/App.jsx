import React from "react";
import { useEffect } from "react";
import { useState } from "react";

function App() {
  const [users, setusers] = useState([]);
  const [name, setname] = useState("");
  const [email, setemail] = useState("");

  const getuser = async () => {
    try {
      const res = await fetch(`http://51.20.191.139/api/user`, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();
      console.log(data);
      if (data.success) {
        console.log(data.user)
        setusers(data.user);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const submit = async (e) => {
    e.preventDefault();
    const data = {
      name,
      email,
    };
    try {
      const res = await fetch(`http://51.20.191.139/api`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const value = await res.json();
      if (value.success) {
        setusers(value.user, ...users);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getuser();
  }, []);
  return (
    <div>
      <h1>Your name and email</h1>
      <label htmlFor="">Name</label>
      <input
        type="text"
        placeholder="name"
        onChange={(e) => setname(e.target.value)}
      />
      <label htmlFor="">Email</label>
      <input
        type="text"
        placeholder="email"
        onChange={(e) => setemail(e.target.value)}
      />
      <button onClick={submit}>Submit</button>
      <div>
        {Array.isArray(users) &&
          users.map((user, i) => (
            <div key={i}>
              <span>{user?.name}</span>
              <span>{user?.email}</span>
            </div>
          ))}
      </div>
    </div>
  );
}

export default App;
