import React, { useContext, useEffect, useRef , useState} from "react";
import contextValue from "../context/notes/noteContext";
import NoteItem from "./NoteItem";

function Notes() {
  const context = useContext(contextValue);
  const { notes, getNotes, editNote } = context;

   const [note, setNote] = useState({
      id : "",
      etitle: "",
      edescription: "",
      etag: "default",
    });
  
  const onChange = (e) => {
    setNote({
      ...note,
      [e.target.name] : e.target.value,
    })
  };
  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({
      id : currentNote._id,
      etitle : currentNote.title,
      edescription : currentNote.description,
      etag : currentNote.tag
    });
  };

  const handleClick = (e) => {
    e.preventDefault();
    console.log("note updated", note);
    editNote(note.id, note.etitle, note.edescription, note.etag);
    refClose.current.click();  
  }
  
  const ref = useRef(null);
  const refClose = useRef(null);
  
  useEffect(() => {
    getNotes();
  }, []);
  return (
    <>
      <div className="container">
      <button type="button" ref = {ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@mdo">Open modal for @mdo</button>
        <div
          className="modal fade"
          id="exampleModal"
          tabIndex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">
                  Update Note
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="mb-3">
                    <label htmlFor="title" className="col-form-label">
                      New Title:
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="etitle"
                      name="etitle"
                      value={note.etitle}
                      onChange={onChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="description" className="col-form-label">
                      New Decription:
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="edescription"
                      name="edescription"
                      value={note.edescription}
                      onChange={onChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="tag" className="col-form-label">
                      New Tag:
                    </label>
                    <textarea
                      className="form-control"
                      id="etag"
                      name="etag"
                      value={note.etag}
                      onChange={onChange}
                    ></textarea>
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button
                ref={refClose}
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleClick}
                >
                  Update Note
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="row my-3">
          <h2>Your notes</h2>
          {notes.map((note) => {
            return (
              <NoteItem
                key={note._id}
                updateNote={updateNote}
                note={note}
              />
            );
          })}
        </div>
      </div>
    </>
  );
}

export default Notes;
