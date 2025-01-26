import React, { useState } from "react";
import { toast } from "react-toastify";

function Login() {
  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  const onChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const host = `http://localhost:5000`;
    try {
      const response = await fetch(`${host}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: input.email, password: input.password }),
      });
      const json = await response.json();
      console.log(json);
      if (response.ok) {
        toast.success("Logged in successfully");
        localStorage.setItem("token", json.jwtToken);
        window.location.href="/"
      }
      else{
        toast.error("Invalid username or password")
      }

      // setnotes(notes.concat());
    } catch (error) {
      console.error(error.message);
      toast.error("Unable to login. Try again later");
    }
  };
  return (
    <>
      <div className="container my-5">
        <form onSubmit={handleSubmit}>
          <div className="">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              aria-describedby="emailHelp"
              value={input.email}
              onChange={onChange}
            />
          </div>
          <div className="">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={input.password}
              onChange={onChange}
            />
          </div>
          <div className="to-register">
            <p>Don't have an account ? <a href="/signup">Register here</a></p>
          </div>
          <div className="button-container my-3">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Login;
