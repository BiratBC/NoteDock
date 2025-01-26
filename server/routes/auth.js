const express = require("express");
const router = express.Router();
const { query, validationResult, body } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const jwt_secret = "Compression";

//middleware
const fetchuser = require("../middleware/fetchuser");

//models
const User = require("../models/User");

//ROUTES


//ROUTE 1 : 
//Create a user using : POST "/api/auth/createUser" {Doesnt require Auth}
router.post(
  "/createUser",
  [
    body("email", "Enter a valid email").isEmail(),
    body("name", "Enter a valid name").isLength({ min: 2 }),
    body("password", "Password must be atleast 8 character").isLength({
      min: 8,
    }),
  ],
  async (req, res) => {
    try {
      //Information validation
      const result = validationResult(req);
      if (!result.isEmpty()) {
        return res
          .status(400)
          .json({ message: "Error creating user", error: result.array() });
      }

      const salt = await bcrypt.genSalt(10);
      const bcryptPass = await bcrypt.hash(req.body.password, salt);

      //Explicit way of checking whether email or any records exists or not
      let user = await User.findOne({ email: req.body.email });

      if (user) {
        return res
          .status(400)
          .json({ error: "Sorry a user with same email exists." });
      }

      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: bcryptPass,
      });

      const payloadData = {
        user: {
          id: user.id,
        },
      };

      const jwtToken = jwt.sign(payloadData, jwt_secret, {expiresIn : '1hr'});

      // console.log(jwtToken);

      res.json({ jwtToken: jwtToken });
    } catch (err) {
      console.error(err);
      res
        .status(500)
        .json({ message: "Error creating user", error: err.message });
    }
  }
);



//ROUTE 2
//Authenticate a user using : POST : "/api/auth/login" . No Login required!
router.post(
  "/login",
  [
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password cannot be blank").exists(),
  ],
  async (req, res) => {
    //Email validation
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res
        .status(400)
        .json({ message: "Error creating user", error: result.array() });
    }
    try {
      //Destructuring email and password
      const { email, password } = req.body;
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ error: "Incorrect credentials!" });
      }

      const passwordCompare = await bcrypt.compare(password, user.password);

      if (!passwordCompare) {
        return res.status(400).json({ error: "Incorrect credentials!" });
      }

      const payloadData = {
        user: {
          id: user.id,
        },
      };

      const jwtToken = jwt.sign(payloadData, jwt_secret);

      res.json({jwtToken});
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error")
    }
  }
);


//ROUTE 3
//Get logged in user detail {for dashboard} : POST : "/api/auth/getuser". Login required 

router.post("/getuser",fetchuser, async (req, res) => {
    try {

      const userID = req.user.id;//todo;
      const user = await User.findById(userID).select("-password");
      res.send(user);
      
    } catch (error) {
      console.error(error.message);
      
    }
});


module.exports = router;
