import NoteContext from "./noteContext";
import { useState } from "react";
import { toast } from "react-toastify";



//This file contains all the states related to notes so it can be shared among every components that needs notes related props

const NoteState = (props) => {
  const [notes, setnotes] = useState([]);
  const host = "http://localhost:5000";

  //GET ALL NOTES :

  const getNotes = async () => {
    try {
      const response = await fetch(`${host}/api/notes/fetchallnotes`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token":
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjc3ODIwM2JkOWI3MGUwMmFkNWU4N2ViIn0sImlhdCI6MTczNzMwNDQyNn0.j-kWjflWC_JYc4JPIkohKeFI0-xd-nhTI04Q56KuJlM",
        },
      });
      const jsonData = await response.json();
      console.log(jsonData);
      setnotes(jsonData);
    } catch (error) {
      console.error(error.message);
    }
  };

  //Add a note
  const addNote = async (title, description, tag) => {
    //TODO : API CALL
    try {
      const response = await fetch(`${host}/api/notes/addnote`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token":
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjc3ODIwM2JkOWI3MGUwMmFkNWU4N2ViIn0sImlhdCI6MTczNzMwNDQyNn0.j-kWjflWC_JYc4JPIkohKeFI0-xd-nhTI04Q56KuJlM",
        },
        body: JSON.stringify({ title, description, tag }),
      });
      if (response.ok) {
        toast.success("Note created successfully");
      }

      // setnotes(notes.concat());
    } catch (error) {
      console.error(error.message);
      toast.error("Error while creating note");
    }
  };

  //Delete a note
  const deleteNote = async (id) => {
    //TODO : API CALL
    try {
      const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token":
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjc3ODIwM2JkOWI3MGUwMmFkNWU4N2ViIn0sImlhdCI6MTczNzMwNDQyNn0.j-kWjflWC_JYc4JPIkohKeFI0-xd-nhTI04Q56KuJlM",
        },
        body: JSON.stringify(),
      });

      if (response.ok) {
        toast.success("Note Deleted Successfully");
      }
    } catch (error) {
      console.error(error.message);
      toast.error("Error while deleting note");
    }
  };

  //Edit a note
  const editNote = async (id, title, description, tag) => {
    //TODO : API CALL
    try {
      const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token":
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjc3ODIwM2JkOWI3MGUwMmFkNWU4N2ViIn0sImlhdCI6MTczNzMwNDQyNn0.j-kWjflWC_JYc4JPIkohKeFI0-xd-nhTI04Q56KuJlM",
        },
        body: JSON.stringify({ title, description, tag }),
      });

      //Immediately rendering in front end after successfull response
      let newNotes = JSON.parse(JSON.stringify(notes));
      for (let index = 0; index < newNotes.length; index++) {
        const element = newNotes[index];
        if (element._id === id) {
          newNotes[index].title = title;
          newNotes[index].description = description;
          newNotes[index].tag = tag;
          break;
        }
      }
      setnotes(newNotes);

      if (response.ok) {
        toast.success("Note updated Successfully");
      }
    } catch (error) {
      console.log(error.message);
      toast.error("Failed to update note");
    }
  };

  return (
    <NoteContext.Provider
      value={{ notes, addNote, deleteNote, editNote, getNotes }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
