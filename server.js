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
let MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/mongoHeadlines';
mongoose.connect(MONGODB_URI, { useNewUrlParser: true });

// Routes
require('./routes/apiRoutes')(app)
require('./routes/htmlRoutes')(app)


// Start the server
app.listen(PORT, function() {
  console.log("App listening on PORT http://localhost:" + PORT);
});