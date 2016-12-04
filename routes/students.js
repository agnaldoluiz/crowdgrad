'use strict'
var express = require('express');
var bodyParser = require('body-parser');
var urlencode = bodyParser.urlencoded({extended: false});

var client = require('./../models/redis');
var studentsRouter = require('./courses.js')

studentsRouter.param('name', function(req, res, next){
	var name = req.params.name;
	//Permite digitar Fixed ou fixed na url
	var studentName = name[0].toUpperCase() + name.slice(1).toLowerCase();

	req.studentName = studentName;

	next();
});

studentsRouter.route('/')
	.get(function(req, res){
		client.hkeys('students', function(error,names){
			if(error) throw error;
			res.json(names);
		})
	})
	.post(urlencode, function(request, response){
		var newStudent = request.body;
		if(!newStudent.name || !newStudent.description){
			response.sendStatus(400);
			return false;
		}
		client.hset('students', newStudent.name, newStudent.description, function(error){
			if(error) throw error;
			response.status(201).json(newStudent.name);
		});
	});

studentsRouter.route('/:studentName')
	.get(function(req, res){
		client.hget('students', req.params.studentName, function(error, description){
			if(error) throw error;
			res.render('showStudent.ejs', 
				{student: 
					{name: req.params.studentName, description: description}
				});
		});
	})

	.delete(function(req, res){ 
		client.hdel('students', req.params.name, function(error){
			if(error) throw error;
			res.sendStatus(204);
		});
	});

module.exports = studentsRouter;