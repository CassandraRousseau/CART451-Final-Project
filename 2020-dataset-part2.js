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
    await client.connect();
      // A:
    await client.db("admin").command({ping:1});
    console.log("success");
    const db =  client.db("CART451_Final_Project");
    const videos =  db.collection("videos", {
      collation: { locale: "fr_CA",  numericOrdering: true,},});
      
        

//     // **1** Count the number of input in the collection
//     const estimate = await videos.estimatedDocumentCount();
//     console.log(`Estimated number of documents in the videos collection: ${estimate}`);
    
//     // **2** Display all the data in the console
// let results = await videos.find({}).toArray();
// console.log(results);


// //**3** Retrieves the data from the history category and only display their title 
// // Retrieves data
//     const yt_video = "title";
//     // Specify an optional query document to narrow results
//     const content = { category: "history" };
//     // Execute the distinct operation
//     const distinctValues = await videos.distinct(yt_video, content);

//     // Print the result
//     console.log(distinctValues);

    
// // **4**Only find videos with subscribers over 100
// const documentsToFind = {upload_date:"2020"}
// let resultat = videos.find(documentsToFind);
// let docCount = videos.countDocuments(documentsToFind);
// await resultat.forEach((doc)=>console.log(doc))
// console.log('Found ${await docCount} documents')

// // **5** Find the video with the specific inserted id
// const document = {_id: new ObjectId("65246667d654716acf8a431e")}
// let answer = await videos.findOne(document)
// console.log("Found document")
// console.log(answer)

//   // **6** Filter the art and music video category by displaying only the videos with less or equal than 400 subscribers on the channel, and only display their title and descriptions
  const pipeline = [ 
    // {$match: {UploadYear:2015}},
      {$sort:{viewCount:-1}},
      // {$project:{
      //   _id:0,
      //   link:0,
      // category:0,
      // },},
      { $limit : 10 },
];

let filteredResults = await videos.aggregate(pipeline)
for await (const doc of filteredResults){
console.log(doc);
// console.log("art achieved");
};
// // // **7** Find the food category videos, sort in alphabetical order the results, and limit the results to 5 videos
// const neededDocuments = {UploadYear:2020}
// let foundResults = await videos.find(neededDocuments).sort({'video views':1}).limit(3);
// await foundResults.forEach((doc)=>console.log(doc));
// console.log('Found ${await docCounting} documents');


// //**8**Find one video according to the inputed data categories
// const options = {

//   projection: {'description':1, 'category':1}
// }
// let isInGroup = await videos.findOne({'category':{$in:["beauty","vlogs", "travel", "food"]}}, options)
// console.log(isInGroup);
// // in try 
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

