const express = require("express");
const fetchuser = require("../middleware/fetchuser");
const { query, validationResult, body } = require("express-validator");
const router = express.Router();
const Notes = require("../models/Notes");

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

module.exports = router;
