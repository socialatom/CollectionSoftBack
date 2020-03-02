'use strict';

var utils = require('../utils/writer.js');
var UniversalCalls = require('../service/UniversalCallsService');

module.exports.dashboard = function dashboard (req, res, next) {
  UniversalCalls.dashboard()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.user = function user (req, res, next) {
  UniversalCalls.user()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
