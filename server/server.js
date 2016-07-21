/**
 * Created by Meghana on 2/23/2016.
 */

// Initialize node modules.
var express = require('express');                       // Reference express.
var server = express();                                 // Create server with express.
var bodyParser = require('body-parser');                // Required for POST requests.
var methodOverride = require('method-override');        // Required for DELETE AND PUT requests.
var mongoose = require('mongoose');                     // Helper for communicating with Mongodb.
var morgan = require("morgan");                         // Log requests to console.
var db = require('./db');                               // Reference database.

// Configuration.
var port = 3000;
server.use(express.static(__dirname + '/../client'));
server.use(morgan('dev'));                              // Logging requests to console.
server.use(bodyParser.json());                          // Parse application/json.
server.use(bodyParser.urlencoded({extended: true}));    // Parse application
server.use(methodOverride('X-HTTP-Method-Override'));   // Required to do an HTTP POST request.

require('./routes/visitorApi')(server); // Configure our routes

// Listen on port.
server.listen(port);
console.log("Server listening on port", port);