const mongoose = require("mongoose");
const URI = "mongodb://localhost:27017/"


const connectToMongo = async() => {
    mongoose.connect(URI).then(()=>console.log("Connected")).catch((e)=>console.log(e.message))
}

module.exports = connectToMongo;