const express = require("express");
const fetchuser = require("../middleware/fetchuser");
const { query, validationResult, body } = require("express-validator");
const router = express.Router();
const Notes = require("../models/Notes");
const { route } = require("./auth");

//ROUTE 1 : FETCH ALL NOTES : GET : /api/notes/fetchallnotes .LOGIN REQUIRED
router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Notes.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.error(error.message);
  }
});

//ROUTE 2 :Add a new note : POST : /api/notes/addnote .LOGIN REQUIRED
router.post(
  "/addnote",
  fetchuser,
  [
    body("title", "Title must be 5 characters").isLength({ min: 5 }),
    body("description", "Description must be atleast 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    try {
      const { title, description, tag } = req.body;
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res
          .status(400)
          .json({ message: "Error creating notes", error: errors.array() });
      }

      const note = new Notes({
        title,
        description,
        tag,
        user: req.user.id,
      });
      const savedNote = await note.save();
      res.send(savedNote);
    } catch (error) {
      console.error(error.message);
    }
  }
);

//ROUTE 3 :Update an existing note : /api/notes/updatenote .LOGIN REQUIRED
//fetchuser is like authorization

router.put("/updatenote/:id", fetchuser, async (req, res) => {
  try {
    const { title, description, tag } = req.body; //get title, description and tag from user [for new notw]
    const newNote = {}; //empty object to populate the title, description and tag in a single object
    if (title) {
      newNote.title = title;
    }
    if (description) {
      newNote.description = description;
    }
    if (tag) {
      newNote.tag = tag;
    }

    //Find the note to be updated
    let note = await Notes.findById(req.params.id);
    if (!note) {
      res.status(404).send("Notes not found!!!");
    }

    //Validating if the person requesting to update is same to the person whom the notes belong {user is a foreign key in Notes Schema which connects to user from User schema}
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("You are authorised");
    }


    note =  await Notes.findByIdAndUpdate(req.params.id, {$set : newNote}, {new : true}); 
    res.send({note});

  } catch (error) {
    console.error(error.message);
  }
});


//ROUTE 4 : DELETE AN EXISTING NOTE : api/notes/deletenote/:id , LOGIN REQUIRED
router.delete('/deletenote/:id',fetchuser, async (req, res) => {
  try {
    let note = await Notes.findById(req.params.id); //this params contains to note id not user id
    if (!note) {
      res.status(404).send("Note not found!!!");
    }
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("You are not authorised");
    }


    note = await Notes.findByIdAndDelete(req.params.id);
    if(res.status === 200){
      res.send("Note deleted successfully");
    }

  } catch (error) {
    console.error(error.message);
    
  }
})

module.exports = router;
