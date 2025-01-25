import React, { useContext, useState } from "react";
import contextValue from "../context/notes/noteContext";

function AddNote() {
  const context = useContext(contextValue);
  const { addNote } = context;
  const [note, setNote] = useState({
    title: "",
    description: "",
    tag: "default",
  });

  const handleClick = async (e) => {
    e.preventDefault();
    addNote(note.title, note.description, note.tag);
  };
  const onChange = (e) => {
    setNote({
      ...note,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <>
      <div className="container my-3">
        <form className="my-3">
          <div className=" mb-3">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              className="form-control"
              id="inputTitle"
              placeholder="Title"
              onChange={onChange}
              name="title"
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="description">Description</label>
            <input
              type="text"
              className="form-control"
              id="inputDescription"
              placeholder="Description"
              onChange={onChange}
              name="description"
              required
            />
          </div>

          
          <div className="mb-3">
            <label htmlFor="tag">Tag</label>
            <input
              type="text"
              className="form-control"
              id="inputTags"
              placeholder="tag"
              onChange={onChange}
              name="tag"
              required
            />
          </div>

       

          <button
            type="submit"
            className="btn btn-primary"
            onClick={handleClick}
            disabled ={note.title.length<5 || note.description.length<10}
          >
            Add Note
          </button>
        </form>
      </div>
    </>
  );
}

export default AddNote;
