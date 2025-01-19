import React, { useContext , useState, useEffect} from "react";
import contextValue from "../context/notes/noteContext";

function NoteItem(props) {
  const context = useContext(contextValue);
  const { note, updateNote } = props;
  const { deleteNote} = context;

  
  return (
    <>
      <div className="col-md-3">
        <div className="card my-3">
          <div className="card-body">
            <div className="d-flex align-items-center">
              <h5 className="card-title">{note.title}</h5>
              <i
                className="fa-solid fa-trash mx-2"
                onClick={() => {
                  deleteNote(note._id);
                }}
              ></i>
              <i
                className="far fa-edit mx-2"
                onClick={()=> {updateNote(note)}}
              ></i>
            </div>
            <p className="card-text">{note.description}</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default NoteItem;
