const jwt = require("jsonwebtoken");

const fetchuser = (req, res, next) => {
  //GET THE USER FROM THE JWT TOKEN
  const jwt_secret = "Compression";

  const token = req.header("auth-token");

  if (!token) {
    res.status(401).send("You are not authorised");
  }

  try {
    const data = jwt.verify(token, jwt_secret);

    req.user = data.user;
  } catch (error) {
    console.error(error.message);
    res.status(401).send("You are not authorised");
  }

  next();
};
module.exports = fetchuser;
