const express = require('express'); 
const mongoose = require('mongoose');
const books_routes = require('./routes/book_api');
const libraries_routes = require('./routes/library_api');
const bodyParser = require('body-parser');

const myApp = express();
myApp.use(express.static('public'));

// middle-ware for request parsing
myApp.use(bodyParser.json());

// using custom routes
// myApp.use('/api', books_routes);
myApp.use('/api', libraries_routes);

// middle-ware for error-handling
myApp.use(function(err, request, response, next) {
    // console.log(err);
    response.status(403).send({
        error: err.message
    });
});

// connect to mongoDB
mongoose.set('useNewUrlParser', true);
mongoose.connect('mongodb://localhost/ultrarestapi');
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.Promise = global.Promise;

myApp.listen(4000, function() {
    console.log('Listening for requests...');
});
