import React, { useContext } from "react";
import contextValue from '../context/notes/noteContext';
import Notes from '../components/Notes';


function Home() {
  
  return (
    <>
    <div className="container my-3">
        <form className="my-3">

          <div class=" mb-3">
            <label for="inputEmail4">Email</label>
            <input
              type="email"
              class="form-control"
              id="inputEmail4"
              placeholder="Email"
            />
          </div>
          
          <div class="mb-3">
            <label for="inputPassword4">Password</label>
            <input
              type="password"
              class="form-control"
              id="inputPassword4"
              placeholder="Password"
            />
          </div>

          <div class="form-check mb-3">
            <input class="form-check-input" type="checkbox" id="gridCheck" />
            <label class="form-check-label" for="gridCheck">
              Check me out
            </label>
          </div>

          <button type="submit" class="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
      <Notes/>
    </>
  );
}

export default Home;
