const express = require("express");
const portNumber = 4200;
const app = express(); //make an instance of express
const server = require("http").createServer(app);
require("dotenv").config();  
// create a server (using the Express framework object)
app.use(express.static(__dirname + "/public"));

app.use(express.json()); // support json encoded bodies
app.use(express.urlencoded({ extended: true })); // support encoded bodies

app.use("/client", clientRoute);
// console.log(process.env) 
const uri = process.env.MONGO_DB_URI;
const { MongoClient, ObjectId } = require('mongodb');
// Database Name
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {});

async function run() {
  try {
     // Connecting to MongoDB
    await client.connect();
    await client.db("admin").command({ping:1});
    console.log("success");
        // Accessing the dataset gathering videos over a billion views
    const db =  client.db("CART451_Final_Project");
    const videos =  db.collection("Youtube_videos_more_than_1Billion_views", {
      collation: { locale: "fr_CA",  numericOrdering: true,},});
   
//Find the four videos that have the most views over a billion views within the muscial category
const neededDocuments = {Category:"Musical"}
let foundResults = await videos.find(neededDocuments).sort({'video views':1}).limit(4);
await foundResults.forEach((doc)=>console.log(doc));
// in try 
  }
catch (error) {
    console.error("error::");
    console.log(error);
    // Expected output: ReferenceError: nonExistentFunction is not defined
  }
 /* The finally block will always execute before control flow exits the try...catch...finally construct. 
 It always executes, regardless of whether an exception was thrown or caught.*/
  finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

run()



// make server listen for incoming messages
server.listen(portNumber, function () {
  console.log("listening on port:: " + portNumber);
  console.log(process.env.Mongo_DB_URI);

});

//default route
app.get("/", function (req, res) {
  res.send("<h1>Hello world</h1>");
});

function clientRoute(req, res, next) {
  res.sendFile(__dirname + "/public/client.html");
}

