'use strict';

var utils = require('../utils/writer.js');
var ISACalls = require('../service/ISACallsService');

module.exports.createStudentISA = function createStudentISA (req, res, next) {
  var studentId = req.swagger.params['studentId'].value;
  var studentISA = req.swagger.params['studentISA'].value;
  ISACalls.createStudentISA(studentId,studentISA)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.deleteStudentISAById = function deleteStudentISAById (req, res, next) {
  var studentId = req.swagger.params['studentId'].value;
  ISACalls.deleteStudentISAById(studentId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getStudentISAByID = function getStudentISAByID (req, res, next) {
  var studentId = req.swagger.params['studentId'].value;
  ISACalls.getStudentISAByID(studentId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.updateStudentISA = function updateStudentISA (req, res, next) {
  var studentId = req.swagger.params['studentId'].value;
  var student = req.swagger.params['student'].value;
  ISACalls.updateStudentISA(studentId,student)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
