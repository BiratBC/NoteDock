const connectToMongo = require("./db");
const express = require("express");
const cors = require('cors');

connectToMongo();
const app = express();
const port = 5000;


//middleware
app.use(cors());
app.use(express.json())

//AVAILABLE ROUTES

app.use('/api/auth', require('./routes/auth'))

app.use('/api/notes', require('./routes/notes'))


  app.listen(port, () => {
    console.log(`Listening on http://localhost:${port}`)
  })
