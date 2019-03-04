/**
 * Created by Meghana on 2/23/2016.
 */

// Setup.
var mongoose = require('mongoose'); // Helper for communicating with Mongodb.
var db = require('../db');
mongoose.connect(db.url, { useNewUrlParser: true }, function(err, result) {
    if (!err) {console.log("Connected to the database")} else {console.log(err)};
});

// Schema Definition
var VisitorSchema = new mongoose.Schema({

    Email: {
        type: String,
        required: true
    },

    FirstName:  {
        type: String,
        required: true
    },

    LastName:  {
        type: String,
        required: true
    },

    JobTitle:  {
        type: String,
    },

    MobileNumber:  {
        type: Number,
    },

    Company:  {
        type: String,
    },

    Person:  {
        type: String,
        required: true
    },

    Visit:  {
        type: String,
        required: true
    },

    Image: {
        type: String,
        required: true
    },

    UUID: {
        type: String,
        required: true
    },

    Date: {
        type: Date,
        default: Date.now()
    }

});

// Define model.
module.exports = mongoose.model('VisitorRegistration', VisitorSchema);
