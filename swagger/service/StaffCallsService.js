'use strict';


/**
 * Creates a new staff user
 * This call creates a new staff user.
 *
 * staff CreateStaff Staff details for the new user.
 * returns Staff
 **/
exports.createStaff = function(staff) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "staffFirstName" : "Andres",
  "staffLastName" : "Rojas",
  "staffEmail" : "andres@andres.com",
  "staffImage" : "1100001-1000100-1000101",
  "staffCampus" : "Cali",
  "staffId" : "d290f1ee-6c54-4b01-90e6-d701748f0851",
  "staffPosition" : "Software Engineer"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Deletes a staff user
 * This call deletes a staff user.
 *
 * staffId String staffId of staff to delete
 * no response value expected for this operation
 **/
exports.deleteStaffById = function(staffId) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * Gets a staff user
 * This call gets a staff user.
 *
 * staffId String staffId of staff to return
 * returns Staff
 **/
exports.getStaffByID = function(staffId) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "staffFirstName" : "Andres",
  "staffLastName" : "Rojas",
  "staffEmail" : "andres@andres.com",
  "staffImage" : "1100001-1000100-1000101",
  "staffCampus" : "Cali",
  "staffId" : "d290f1ee-6c54-4b01-90e6-d701748f0851",
  "staffPosition" : "Software Engineer"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Lists all staff users
 * This call lists all staff users
 *
 * returns List
 **/
exports.listStaff = function() {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
  "staffFirstName" : "Andres",
  "staffLastName" : "Rojas",
  "staffEmail" : "andres@andres.com",
  "staffImage" : "1100001-1000100-1000101",
  "staffCampus" : "Cali",
  "staffId" : "d290f1ee-6c54-4b01-90e6-d701748f0851",
  "staffPosition" : "Software Engineer"
}, {
  "staffFirstName" : "Andres",
  "staffLastName" : "Rojas",
  "staffEmail" : "andres@andres.com",
  "staffImage" : "1100001-1000100-1000101",
  "staffCampus" : "Cali",
  "staffId" : "d290f1ee-6c54-4b01-90e6-d701748f0851",
  "staffPosition" : "Software Engineer"
} ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Updates a staff user
 * This call updates a staff user.
 *
 * staffId String staffId of user to update
 * staff UpdateStaff Staff details for the user to be updated.
 * returns Staff
 **/
exports.updateStaff = function(staffId,staff) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "staffFirstName" : "Andres",
  "staffLastName" : "Rojas",
  "staffEmail" : "andres@andres.com",
  "staffImage" : "1100001-1000100-1000101",
  "staffCampus" : "Cali",
  "staffId" : "d290f1ee-6c54-4b01-90e6-d701748f0851",
  "staffPosition" : "Software Engineer"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}

