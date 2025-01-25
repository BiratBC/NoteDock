import React from "react";
import { Link, NavLink } from "react-router-dom";

function Navbar() {
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
                  isPending ? "pending" : isActive ? "nav-link active" : "nav-link"
                }
              >
                Home
              </NavLink>
              <NavLink to="/about"
                className={({ isActive, isPending }) =>
                  isPending ? "pending" : isActive ? "nav-link active" : "nav-link"
                }>
                About
              </NavLink>
            </div>
          </div>
          <div className="d-flex mx-5">
            <Link to="/login"><button className="btn btn-primary mx-3">Log in</button></Link>
            <Link to="/signup"><button className="btn btn-primary">Sign up</button></Link>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
