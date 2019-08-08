const express = require('express');
const router = express.Router();
const Library = require('../models/library').Library;
const Book = require('../models/library').Book;

// get all libraries
router.get('/libraries', function(request, response, next) {
    Library.find({}).then(function(libraries) {
        response.send(libraries);
    });
});

// get libraries for a location
router.get('/librariesNear', function(request, response, next) {
    coordinates = [
        parseFloat(request.query.long), parseFloat(request.query.latt)
    ];
    console.log("GET received for location " + coordinates);
    Library.aggregate([
        {
            $geoNear: {
                near: {
                    type: "Point",
                    coordinates: coordinates
                },
                includeLocs: "dist.location",
                spherical: true,
                maxDistance: 100000000,
                num: 5,
                distanceField: "dist.calculated"
            }
        }
    ]).then(function(libraries) {
        libraries.forEach(function(library) {
            library.dist.calculated /= 1000;
        });
        response.send(libraries);
    }).catch(next);
});

// insert one library
router.post('/libraries', function(request, response, next) {
    var newLibrary = new Library(request.body);
    newLibrary.save().then(function(library) {
        response.send(newLibrary);
    }).catch(next);
});

// add book to a library
router.put('/libraries/:id', function(request, response, next) {
    var libId = request.params.id;
    Library.findOne({
        _id: libId
    }).then(function(library) {
        console.log(library);
        console.log(libId);
        var newBook = new Book(request.body);
        library.books.push(newBook);
        library.save().then(function(savedLibrary) {
            response.send(savedLibrary);
        });
    }).catch(next);
});

module.exports = router;
