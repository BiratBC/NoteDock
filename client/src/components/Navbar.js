import React from "react";
import { Link, NavLink } from "react-router-dom";

function Navbar() {
  const onClickLogOut = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };
  return (
    <>
      <nav className="navbar navbar-expand-lg  navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            Navbar
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
              <NavLink
                to="/"
                className={({ isActive, isPending }) =>
                  isPending
                    ? "pending"
                    : isActive
                    ? "nav-link active"
                    : "nav-link"
                }
              >
                Home
              </NavLink>
              <NavLink
                to="/about"
                className={({ isActive, isPending }) =>
                  isPending
                    ? "pending"
                    : isActive
                    ? "nav-link active"
                    : "nav-link"
                }
              >
                About
              </NavLink>
            </div>
          </div>
          {!localStorage.getItem("token") ? (
            <>
              <div className="d-flex mx-5">
                <Link to="/login">
                  <button className="btn btn-primary mx-3">Log in</button>
                </Link>
                <Link to="/signup">
                  <button className="btn btn-primary">Sign up</button>
                </Link>
              </div>
            </>
          ) : (
            <>
              <div className="d-flex mx-3">
                <button className="btn btn-danger mx-3" onClick={onClickLogOut}>
                  Logout
                </button>
              </div>
            </>
          )}
        </div>
      </nav>
    </>
  );
}

export default Navbar;
