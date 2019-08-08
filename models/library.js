const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// GeoLocation schema
const GeoSchema = new Schema({
    type: {
        type: String,
        default: "Point",
    },
    coordinates: {
        type: [Number],
        index: "2dsphere"
    }
});

// create schema for books
const BookSchema = new Schema({
    title: {
        type: String,
        required: [true, 'title is required']
    },
    author: {
        type: String,
        required: [true, 'author is required']
    },
    noOfPages: Number,
    stock: Number
});

// create Schema for Library
const LibrarySchema = new Schema( {
    name: {
        type: String,
        required: true
    },
    geometry: GeoSchema,
    books: {
        type: [BookSchema]
    }
});

const Book = mongoose.model('book', BookSchema);
const Library = mongoose.model('library', LibrarySchema);

module.exports.Book = Book;
module.exports.Library = Library;
