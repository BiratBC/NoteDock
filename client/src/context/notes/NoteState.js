import NoteContext from "./noteContext";
import { useState } from "react";

/*
import {createContext} from 'react';
const noteContext = createContext();
const s1 = {
    "name" : "Birat", //context var name . name
    "class" : "10a"
}

const [state, setState] = useState(s1);
const update =  () => {
    setTimeout(() => {
        setState({
            "name" : "Suman",
            "class" : "9b"
        })
    }, 2000);
}
*/

//This file contains all the states related to notes so it can be shared among every components that needs notes related props

const NoteState =  (props) => {
    
    const notesIntial = [
        {
          "_id": "6786b5b77450b79a16d5e9e3",
          "user": "6778203bd9b70e02ad5e87eb",
          "title": "First Note",
          "description": "this is my first note",
          "tag": "first, note, start",
          "date": "2025-01-14T19:06:31.975Z",
          "__v": 0
        },
        {
            "_id": "6786b5b77450b79a16d5e9e3",
            "user": "6778203bd9b70e02ad5e87eb",
            "title": "First Note",
            "description": "this is my first note",
            "tag": "first, note, start",
            "date": "2025-01-14T19:06:31.975Z",
            "__v": 0
          },
          {
            "_id": "6786b5b77450b79a16d5e9e3",
            "user": "6778203bd9b70e02ad5e87eb",
            "title": "First Note",
            "description": "this is my first note",
            "tag": "first, note, start",
            "date": "2025-01-14T19:06:31.975Z",
            "__v": 0
          }

      ]

      const [notes, setnotes] = useState(notesIntial);


    return (
        <NoteContext.Provider value={{notes, notesIntial}}>

            {props.children}

        </NoteContext.Provider>
    )

}

export default NoteState;