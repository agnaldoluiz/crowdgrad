'use strict'
var express = require('express');
var bodyParser = require('body-parser');
var urlencode = bodyParser.urlencoded({extended: false});

var client = require('./../models/redis');

var coursesRouter = express.Router();

coursesRouter.route('/')
	.get(function(req, res){
		client.hkeys('courses', function(error,names){
			if(error) throw error;
			res.json(names);
		});
	})
	.post(urlencode, function(request, response){
		var newCourse = request.body;
		if(!newCourse.name || !newCourse.description){
			response.sendStatus(400);
			return false;
		}
		client.hset('courses', newCourse.name, newCourse.description, function(error){
			if(error) throw error;
			response.status(201).json(newCourse.name);
		});
	});

coursesRouter.route('/:courseName')
	.get(function(req, res){
		var data = {};
		client.hget('courses', req.params.courseName, function(error, description){
			if(error) throw error;
			data.courseName = req.params.courseName
			data.courseDescription = description;
		});

		client.smembers(req.params.courseName, function(error, students){
			data.students = students;
			data.tamanho = students.length;
			console.log(data);
			res.render('showCourse.ejs', data);
		});
	})

	.delete(function(req, res){ 
		client.hdel('courses', req.params.name, function(error){
			if(error) throw error;
			res.sendStatus(204);
		});
	});

var studentsRouter = express.Router({mergeParams: true});

coursesRouter.use('/:courseName/students', studentsRouter);

module.exports = coursesRouter;