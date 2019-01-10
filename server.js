// Requiring dependencies
const express = require('express');
const exphbs = require('express-handlebars');
 const mongoose = require('mongoose');

const app = express();
//Set the port 
const PORT = process.env.PORT || 8080;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Make public a static folder
app.use(express.static("public"));
//Handlebars set up
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

//Mongo DB conncection
//--------database configuration with Mongoose------------
let databaseUrl = 'mongodb://localhost/week18day3mongoose';
if(process.env.MONGODB_URI){
  mongoose.connect(process.env.MONGODB_URI);
}else {
  mongoose.connect(databaseUrl)
}
// --end database configuration -------
 var db = mongoose.connection;

 //show any mongoose errors
 db.on('error',function(err){
   console.log('Mongoose Error: ' , err);
 })
//once logged in to the db through mongoose, log a success message 
db.once('open', function(){
  console.log('Mongoose connection successful.')
})
// Routes
require('./routes/apiRoutes')(app)
require('./routes/htmlRoutes')(app)


// Start the server
app.listen(PORT, function() {
  console.log("App listening on PORT http://localhost:" + PORT);
});