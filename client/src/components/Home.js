import React, { useContext } from "react";
import contextValue from '../context/notes/noteContext';
import Notes from '../components/Notes';
import AddNote from "./AddNote";


function Home() {
  
  return (
    <>
          <AddNote/>
          <Notes/>
    </>
  );
}

export default Home;
