import React, { useState } from "react";
import { toast } from "react-toastify";

function Signup() {
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });

  const onChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const host = `http://localhost:5000`;
      const response = await fetch(`${host}/api/auth/createUser`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: inputs.name,
          email: inputs.email,
          password: inputs.password,
        }),
      });
      const json = await response.json();
      console.log(json);
      if (response.ok) {
        toast.success("Logged in successfully");
        localStorage.setItem("token", json.jwtToken);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <>
      <div className="container my-5">
        <form onSubmit={handleSubmit}>
          <div className="">
            <label htmlFor="email">Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={inputs.name}
              onChange={onChange}
            />
          </div>
          <div className="">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              aria-describedby="emailHelp"
              value={inputs.email}
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
              value={inputs.password}
              onChange={onChange}
            />
          </div>
          <div className="">
            <label htmlFor="cpassword">Confirm Password</label>
            <input
              type="password"
              className="form-control"
              id="cpassword"
              name="cpassword"
              value={inputs.cpassword}
              onChange={onChange}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </>
  );
}

export default Signup;
