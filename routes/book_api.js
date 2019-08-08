const express = require('express');
const router = express.Router();
const library = require('../models/library');
const Book = library.Book;
const Library = library.Library;

// get all books from DB
router.get('/books', function(request, response, next) {
    console.log('GET request for all books.');
    Book.find({}).then(function(records) {
        response.send(records);
        console.log('All records sent.');
    });
});

// insert a book into the DB
router.post('/books', function(request, response, next) {
    console.log('POST request for insertion.');
    var newBook = new Book(request.body);
    newBook.save().then(function(record) {
        response.send(record);
        console.log('Inserted record sent.');
    }).catch(next);
});

// update a book record in the DB
router.put('/books/:id', function(request, response, next) {
    console.log('PUT request for updation.');
    Book.findByIdAndUpdate({
        _id: request.params.id
    }, request.body).then(function() {
        Book.findOne({
            _id: request.params.id
        }).then(function(record) {
            response.send(record);
            console.log('Updated record sent.');
        });
    }).catch(next);
});

// delete a record in the DB
router.delete('/books/:id', function(request, response, next) {
    console.log('DELETE request for deletion.');
    Book.findByIdAndRemove({
        _id: request.params.id
    }).then(function(record) {
        response.send(record);
        console.log('Deleted record sent.');
    });
});

module.exports = router;
