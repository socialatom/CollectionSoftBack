'use strict';

var utils = require('../utils/writer.js');
var StudentCalls = require('../service/StudentCallsService');

module.exports.createStudent = function createStudent (req, res, next) {
  var student = req.swagger.params['student'].value;
  StudentCalls.createStudent(student)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.deleteStudentById = function deleteStudentById (req, res, next) {
  var studentId = req.swagger.params['studentId'].value;
  StudentCalls.deleteStudentById(studentId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getStudentByID = function getStudentByID (req, res, next) {
  var studentId = req.swagger.params['studentId'].value;
  StudentCalls.getStudentByID(studentId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.listStudent = function listStudent (req, res, next) {
  StudentCalls.listStudent()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.updateStudent = function updateStudent (req, res, next) {
  var studentId = req.swagger.params['studentId'].value;
  var student = req.swagger.params['student'].value;
  StudentCalls.updateStudent(studentId,student)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
