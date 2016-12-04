var express = require('express');
var app = express();

var courses = require('./routes/courses.js');
var students = require('./routes/students.js');
//Redis Connection
var client = require('./models/redis');

app.set('view engine', 'ejs');

app.use(express.static('public'));

app.use('/courses', courses);

module.exports = app;