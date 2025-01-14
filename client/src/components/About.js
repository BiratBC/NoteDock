import React, {useContext, useEffect} from 'react'
import noteContext from '../context/notes/noteContext'
function About() {

  const a = useContext(noteContext);

  useEffect(() => {
    a.update();
    // eslint-disable-next-line
  },[])
  

  return (
    <>
    <h1>This is {a.state.name}</h1>
    <h2>I study in {a.state.class}</h2>
    </>
  )
}

export default About
