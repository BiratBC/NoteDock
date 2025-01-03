const express = require("express");
const router = express.Router();
const { query, validationResult, body } = require("express-validator");
const bcrypt = require('bcrypt');

//models
const User = require("../models/User");

//Create a user using : POST "/api/auth/createUser" {Doesnt require Auth}
router.post(
  "/createUser",
  [
    body("email",'Enter a valid email').isEmail(),
    body("name",'Enter a valid name').isLength({ min: 2 }),
    body("password", 'Password must be atleast 8 character').isLength({ min: 8 }),
  ],
  async (req, res) => {
    try {
      const result = validationResult(req);
      if (!result.isEmpty()) {
        return res
        .status(400)
        .json({ message: "Error creating user", error: result.array()});
      }

      const salt = await bcrypt.genSalt(10);
      const bcryptPass = await bcrypt.hash(req.body.password,salt);

      //Explicit way of checking whether email or any records exists or not
      let user = await User.findOne({email : req.body.email});

      if (user) {
        return res.status(400).json({error : "Sorry a user with same email exists."})
      }

      user = await User.create({
        name : req.body.name,
        email : req.body.email,
        password : bcryptPass
      });
      res.json("Created Successfully");

    } catch (err) {
      console.error(err);
      res
        .status(500)
        .json({ message: "Error creating user", error: err.message });
    }
  }
);

module.exports = router;
