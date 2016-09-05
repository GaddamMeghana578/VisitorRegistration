

/**
 * Created by Meghana on Feb-06-2016.
 */

// Initializing the node module variables...
var Visitor = require('../models/visitor');      // Reference to Visitor.js
var multiparty = require('multiparty');          // Multipart/form-data parser which supports streaming.
var uuid = require('node-uuid');                 // Creates unique id.
var path = require('path');                      // Provides utilities for working with file and directory paths.
var fs = require('fs');                          //  Provides file system.
var nodemailer = require("nodemailer");
var smtpTransport = require('nodemailer-smtp-transport');

// Find and get all the documents from the VisitorRegistration table.
module.exports = function(server) {
    server.get('/VisitorRegistration', function (req, res) {
        // use mongoose to get all user data in the database
        Visitor.find(function (err, VisitorRegistration) {
            // if there is an error retrieving, send the error. Nothing after res.send(err) will execute.
            if (err) return res.status(500).send("Error occured");
            res.json(VisitorRegistration); // return all the data in JSON format
        });
    });

    // Inserts the image into the destination path in the server.
    server.post('/uploadImage', function (req, res) {

        var form = new multiparty.Form();
        form.parse(req, function (err, fields, files) {
            var file = files.file[0];
            var contentType = file.headers['content-type'];
            var tmpPath = file.path;
            var extIndex = tmpPath.lastIndexOf('.');
            var extension = (extIndex < 0) ? '' : tmpPath.substr(extIndex);
            var fileUniqueName = uuid.v4();
            var fileName = fileUniqueName + extension;
            var destPath = 'images/upload/' + fileName;

            // Server side file type checker.
            if (contentType !== 'image/png' && contentType !== 'image/jpeg') {
                fs.unlink(tmpPath);
                return res.status(400).send('Unsupported file type.');
            }

            // Rename the client side path with the server side path.
            fs.rename(tmpPath, destPath, function (err) {
                if (err) {
                    return res.status(400).send('Image is not saved');
                }

                return res.json(fileUniqueName);
            })
        })
    });

    // Inserts the data in to the VisitorRegistration table.
    server.post('/VisitorRegistration', function (req, res) {
        var visitorData = req.body;
        // create reusable transport method (opens pool of SMTP connections)
         var transporter = nodemailer.createTransport(smtpTransport({
         service: "Gmail",  // sets automatically host, port and connection security settings
         auth: {
         user: "maggi.reddy84@gmail.com",
         pass: "FrenchConnectionUnitedKingdom578"
         }
         }));

         // setup e-mail data with unicode symbols
         var mailOptions = {
         from: "maggi.reddy84@gmail.com", // sender address
         to: "meghana_reddy9092@yahoo.com", // list of receivers
         subject: "VisitorDetails", // Subject line
         text: "Hello this person has come to visit you. The name of the person is mentioned below", // plaintext body
         html: visitorData.FirstName// html body
         }
         // send mail with defined transport object
         transporter.sendMail(mailOptions, function(error, response){
         if(error){
         console.log(error);
         }else{
         console.log("Message sent: " + response.message);
         }

         // if you don't want to use this transport object anymore, uncomment following line
         transporter.close(); // shut down the connection pool, no more messages
         });

        console.log(visitorData);
        var visitor = new Visitor(visitorData);
        visitor.save(function (err, result) {
            if (err) {
                console.log(err);
                res.send(err);
            }
            console.log(result);
            res.json(result);
        });
    });

    // Retrieves the image from the destination path of the server.
    server.get('/VisitorImage/:imgloc', function (req, res) {
        var imagePath = 'images/upload/' + req.params.imgloc;
        fs.readFile(imagePath, function (err, img) {
            if(!err) {
                // Convert Uint8Array img to base64 encoded string.
                var b64encoded = new Buffer(img).toString('base64');
                res.writeHead(200, { 'Content-type':(('image/jpg')  || ('image/png')) });
                res.end(b64encoded);
                console.log("Image retrieved");
            }
            console.log("Image retrieval failed");
        });
    });

    // Find and get a specific document from the VisitorRegistration table by property name(UUID).
   server.get('/VisitorRegistration/:objName', function (req, res) {
       Visitor.findOne({UUID: req.params.objName}, function (err, VisitorRegistration) {
           if (err) return res.status(500).send("Error occured");
           res.json(VisitorRegistration);
        });
    });

    // Find and Update the document from the VisitorRegistration table by property name passed(UUID).
    server.put('/VisitorRegistration/:objName', function (req, res) {
        Visitor.findOneAndUpdate({UUID: req.params.objName}, req.body, function (err, VisitorRegistration) {
            if (err) return res.status(500).send("Error occured");
            res.json(VisitorRegistration);
        });
    });

    // Find and Remove the document from VisitorRegistration table by the property name passed(UUID).
    server.delete('/VisitorRegistration/:objName', function (req, res) {
        Visitor.findOneAndRemove({UUID: req.params.objName}, req.body, function (err, VisitorRegistration) {
            if (err) return res.status(500).send("Error occured");
            res.json(VisitorRegistration);
        });
    });

    // Default route.
    server.get('/', function (req, res) {
    // Load the single view file(angular will handle the page changes on the front-end).
        res.sendFile(path.join(_dirname + 'index.html'));
    });
}