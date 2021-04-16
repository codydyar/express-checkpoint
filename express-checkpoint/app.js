var express = require('express');
var logger = require('morgan');

var moviesRouter = require('./routes/movies');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/movies', moviesRouter);

module.exports = app;
