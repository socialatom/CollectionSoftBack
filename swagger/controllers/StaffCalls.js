'use strict';

var utils = require('../utils/writer.js');
var StaffCalls = require('../service/StaffCallsService');

module.exports.createStaff = function createStaff (req, res, next) {
  var staff = req.swagger.params['staff'].value;
  StaffCalls.createStaff(staff)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.deleteStaffById = function deleteStaffById (req, res, next) {
  var staffId = req.swagger.params['staffId'].value;
  StaffCalls.deleteStaffById(staffId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getStaffByID = function getStaffByID (req, res, next) {
  var staffId = req.swagger.params['staffId'].value;
  StaffCalls.getStaffByID(staffId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.listStaff = function listStaff (req, res, next) {
  StaffCalls.listStaff()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.updateStaff = function updateStaff (req, res, next) {
  var staffId = req.swagger.params['staffId'].value;
  var staff = req.swagger.params['staff'].value;
  StaffCalls.updateStaff(staffId,staff)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
