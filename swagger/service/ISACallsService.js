'use strict';


/**
 * Creates a new student isa for a student if there is none already.
 * This call creates a new student ISA.
 *
 * studentId String studentId of student
 * studentISA CreateStudentISA Student ISA details for the new user.
 * returns StudentISA
 **/
exports.createStudentISA = function(studentId,studentISA) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "studentISAMinimumIncome" : 3000000,
  "studentISACampus" : "Cali",
  "studentISACollectionCompany" : "Astorga Management",
  "studentISACollectionCompanyAddress" : "Carrera 8 # 122-217, Bogotá, CO",
  "studentISAAcademyOperatorGovID" : "901.114. 515-1",
  "studentISAProgram" : "Software Developer",
  "studentISAAgreementDurationMonths" : 21,
  "studentISATrustFund" : "FudiOccidente",
  "studentISAAcademyOperator" : "Coderise ORG",
  "studentISACohortStartDate" : "2017-07-21",
  "studentISAFiduciary" : "Fake Fiduciary CO",
  "studentISAFiduciaryGovID" : "234234234-nn22",
  "studentISACohort" : "11",
  "studentISAIncomeSharePercentage" : 17,
  "studentISAMaxContractValidity" : 72,
  "studentISACollectionCompanyGovId" : "2839302023jj",
  "studentISAMonthlyInstallments" : 42,
  "studentId" : "12000022-6c54-4b01-90e6-d701748f0851",
  "studentISACap" : 75000000,
  "studentISACollectionCompanyEmail" : "astorga@astorga.com",
  "studentISAAcademyOperatorAddress" : "Carrera 7 # 69-17, Bogotá, CO",
  "studentISAAcademyOperatorEmail" : "holberton@coderise.org"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Deletes a student user usa
 * This call deletes a student ISA.
 *
 * studentId String studentId of student
 * no response value expected for this operation
 **/
exports.deleteStudentISAById = function(studentId) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * Gets a student user isa for a given student
 * This call gets a student user ISA.
 *
 * studentId String studentId of student
 * returns StudentISA
 **/
exports.getStudentISAByID = function(studentId) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "studentISAMinimumIncome" : 3000000,
  "studentISACampus" : "Cali",
  "studentISACollectionCompany" : "Astorga Management",
  "studentISACollectionCompanyAddress" : "Carrera 8 # 122-217, Bogotá, CO",
  "studentISAAcademyOperatorGovID" : "901.114. 515-1",
  "studentISAProgram" : "Software Developer",
  "studentISAAgreementDurationMonths" : 21,
  "studentISATrustFund" : "FudiOccidente",
  "studentISAAcademyOperator" : "Coderise ORG",
  "studentISACohortStartDate" : "2017-07-21",
  "studentISAFiduciary" : "Fake Fiduciary CO",
  "studentISAFiduciaryGovID" : "234234234-nn22",
  "studentISACohort" : "11",
  "studentISAIncomeSharePercentage" : 17,
  "studentISAMaxContractValidity" : 72,
  "studentISACollectionCompanyGovId" : "2839302023jj",
  "studentISAMonthlyInstallments" : 42,
  "studentId" : "12000022-6c54-4b01-90e6-d701748f0851",
  "studentISACap" : 75000000,
  "studentISACollectionCompanyEmail" : "astorga@astorga.com",
  "studentISAAcademyOperatorAddress" : "Carrera 7 # 69-17, Bogotá, CO",
  "studentISAAcademyOperatorEmail" : "holberton@coderise.org"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Updates a student ISA
 * This call updates a student ISA.
 *
 * studentId String studentId of student
 * student UpdateStudentISA Student ISA details to be updated.
 * returns StudentISA
 **/
exports.updateStudentISA = function(studentId,student) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "studentISAMinimumIncome" : 3000000,
  "studentISACampus" : "Cali",
  "studentISACollectionCompany" : "Astorga Management",
  "studentISACollectionCompanyAddress" : "Carrera 8 # 122-217, Bogotá, CO",
  "studentISAAcademyOperatorGovID" : "901.114. 515-1",
  "studentISAProgram" : "Software Developer",
  "studentISAAgreementDurationMonths" : 21,
  "studentISATrustFund" : "FudiOccidente",
  "studentISAAcademyOperator" : "Coderise ORG",
  "studentISACohortStartDate" : "2017-07-21",
  "studentISAFiduciary" : "Fake Fiduciary CO",
  "studentISAFiduciaryGovID" : "234234234-nn22",
  "studentISACohort" : "11",
  "studentISAIncomeSharePercentage" : 17,
  "studentISAMaxContractValidity" : 72,
  "studentISACollectionCompanyGovId" : "2839302023jj",
  "studentISAMonthlyInstallments" : 42,
  "studentId" : "12000022-6c54-4b01-90e6-d701748f0851",
  "studentISACap" : 75000000,
  "studentISACollectionCompanyEmail" : "astorga@astorga.com",
  "studentISAAcademyOperatorAddress" : "Carrera 7 # 69-17, Bogotá, CO",
  "studentISAAcademyOperatorEmail" : "holberton@coderise.org"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}

