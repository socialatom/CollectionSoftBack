import Joi from "@hapi/joi";

function UpdateStudentModel(opts) {
  const validationError = Joi.validate(opts, {
    studentEmail: [Joi.string().optional(), Joi.allow(null)],
    studentFirstName: [Joi.string().optional(), Joi.allow(null)],
    studentLastName: [Joi.string().optional(), Joi.allow(null)],
    studentCampus: [Joi.string().optional(), Joi.allow(null)],
    studentIdentificationType: [Joi.string().optional(), Joi.allow(null)],
    studentIdentificationNumber: [Joi.string().optional(), Joi.allow(null)],
    studentAddressLine1: [Joi.string().optional(), Joi.allow(null)],
    studentAddressLine2: [Joi.string().optional(), Joi.allow(null)],
    studentAddressCity: [Joi.string().optional(), Joi.allow(null)],
    studentAddressProvince: [Joi.string().optional(), Joi.allow(null)],
    studentAddressPostalCode: [Joi.string().optional(), Joi.allow(null)],
    studentAddressCountry: [Joi.string().optional(), Joi.allow(null)],
    studentPhoneNumber: [Joi.string().optional(), Joi.allow(null)],
    studentBirthDate: [Joi.string().optional(), Joi.allow(null)],
    studentImage: [Joi.string().optional(), Joi.allow(null)]
  }).error;

  if (validationError !== null) {
    throw validationError;
  }

  Object.assign(this, opts);
}

export default UpdateStudentModel;
