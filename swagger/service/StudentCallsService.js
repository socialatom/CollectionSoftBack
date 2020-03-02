'use strict';


/**
 * Creates a new student user
 * This call creates a new student user.
 *
 * student CreateStudent Student details for the new user.
 * returns Student
 **/
exports.createStudent = function(student) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "studentLastName" : "Chatterjee",
  "studentBirthDate" : "2017-07-21",
  "studentAddressPostalCode" : "3077 MP",
  "studentPhoneNumber" : "+31638146100",
  "studentImage" : "1122001-12200100-1000101",
  "studentProvince" : "Zuid Holland",
  "studentProfileId" : "12000022-6c54-4b01-90e6-d701748f0851",
  "studentIdentificationNumber" : "1233555665",
  "studentIdentificationType" : "Driving License",
  "studentEmail" : "sumeru@sumeru.com",
  "studentAddressCity" : "Rotterdam",
  "studentAddressCountry" : "Netherlands",
  "studentCampus" : "Cali",
  "studentAddressLine2" : "1st Floor",
  "studentFirstName" : "Sumeru",
  "studentAddressLine1" : "Bas Paauwestraat 11"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Deletes a student user
 * This call deletes a student user.
 *
 * studentId String studentId of student user to delete
 * no response value expected for this operation
 **/
exports.deleteStudentById = function(studentId) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * Gets a student user
 * This call gets a student user.
 *
 * studentId String studentId of student to return
 * returns Student
 **/
exports.getStudentByID = function(studentId) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "studentLastName" : "Chatterjee",
  "studentBirthDate" : "2017-07-21",
  "studentAddressPostalCode" : "3077 MP",
  "studentPhoneNumber" : "+31638146100",
  "studentImage" : "1122001-12200100-1000101",
  "studentProvince" : "Zuid Holland",
  "studentProfileId" : "12000022-6c54-4b01-90e6-d701748f0851",
  "studentIdentificationNumber" : "1233555665",
  "studentIdentificationType" : "Driving License",
  "studentEmail" : "sumeru@sumeru.com",
  "studentAddressCity" : "Rotterdam",
  "studentAddressCountry" : "Netherlands",
  "studentCampus" : "Cali",
  "studentAddressLine2" : "1st Floor",
  "studentFirstName" : "Sumeru",
  "studentAddressLine1" : "Bas Paauwestraat 11"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Lists all student users
 * This call lists all student users
 *
 * returns List
 **/
exports.listStudent = function() {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
  "studentLastName" : "Chatterjee",
  "studentBirthDate" : "2017-07-21",
  "studentAddressPostalCode" : "3077 MP",
  "studentPhoneNumber" : "+31638146100",
  "studentImage" : "1122001-12200100-1000101",
  "studentProvince" : "Zuid Holland",
  "studentProfileId" : "12000022-6c54-4b01-90e6-d701748f0851",
  "studentIdentificationNumber" : "1233555665",
  "studentIdentificationType" : "Driving License",
  "studentEmail" : "sumeru@sumeru.com",
  "studentAddressCity" : "Rotterdam",
  "studentAddressCountry" : "Netherlands",
  "studentCampus" : "Cali",
  "studentAddressLine2" : "1st Floor",
  "studentFirstName" : "Sumeru",
  "studentAddressLine1" : "Bas Paauwestraat 11"
}, {
  "studentLastName" : "Chatterjee",
  "studentBirthDate" : "2017-07-21",
  "studentAddressPostalCode" : "3077 MP",
  "studentPhoneNumber" : "+31638146100",
  "studentImage" : "1122001-12200100-1000101",
  "studentProvince" : "Zuid Holland",
  "studentProfileId" : "12000022-6c54-4b01-90e6-d701748f0851",
  "studentIdentificationNumber" : "1233555665",
  "studentIdentificationType" : "Driving License",
  "studentEmail" : "sumeru@sumeru.com",
  "studentAddressCity" : "Rotterdam",
  "studentAddressCountry" : "Netherlands",
  "studentCampus" : "Cali",
  "studentAddressLine2" : "1st Floor",
  "studentFirstName" : "Sumeru",
  "studentAddressLine1" : "Bas Paauwestraat 11"
} ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Updates a student user
 * This call updates a student user.
 *
 * studentId String studentId of user to update
 * student UpdateStudent Student details for the user to be updated.
 * returns Student
 **/
exports.updateStudent = function(studentId,student) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "studentLastName" : "Chatterjee",
  "studentBirthDate" : "2017-07-21",
  "studentAddressPostalCode" : "3077 MP",
  "studentPhoneNumber" : "+31638146100",
  "studentImage" : "1122001-12200100-1000101",
  "studentProvince" : "Zuid Holland",
  "studentProfileId" : "12000022-6c54-4b01-90e6-d701748f0851",
  "studentIdentificationNumber" : "1233555665",
  "studentIdentificationType" : "Driving License",
  "studentEmail" : "sumeru@sumeru.com",
  "studentAddressCity" : "Rotterdam",
  "studentAddressCountry" : "Netherlands",
  "studentCampus" : "Cali",
  "studentAddressLine2" : "1st Floor",
  "studentFirstName" : "Sumeru",
  "studentAddressLine1" : "Bas Paauwestraat 11"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}

