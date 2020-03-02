'use strict';


/**
 * Gets the user dashboard data
 * This call gets the dashboard data for the current user.
 *
 * returns User
 **/
exports.dashboard = function() {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "userStatus" : "CONFIRMED",
  "userLastName" : "Rojas",
  "userCreateDate" : "2020-01-31T02:42:53.468Z",
  "userFirstName" : "Andres",
  "userId" : "d290f1ee-6c54-4b01-90e6-d701748f0851",
  "userGroup" : "staff"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Gets the user details
 * This call gets the details of the current user.
 *
 * returns User
 **/
exports.user = function() {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "userStatus" : "CONFIRMED",
  "userLastName" : "Rojas",
  "userCreateDate" : "2020-01-31T02:42:53.468Z",
  "userFirstName" : "Andres",
  "userId" : "d290f1ee-6c54-4b01-90e6-d701748f0851",
  "userGroup" : "staff"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}

