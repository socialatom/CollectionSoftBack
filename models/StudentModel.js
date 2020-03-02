import Joi from "@hapi/joi";

function StudentModel(opts) {
  const validationError = Joi.validate(opts, {
    studentProfileId: Joi.string().required(),
    studentEmail: Joi.string().required(),
    studentFirstName: Joi.string().required(),
    studentLastName: Joi.string().required(),
    studentCampus: Joi.string().required(),
    studentIdentificationType: Joi.string().required(),
    studentIdentificationNumber: Joi.string().required(),
    studentAddressLine1: [Joi.string().optional(), Joi.allow(null)],
    studentAddressLine2: [Joi.string().optional(), Joi.allow(null)],
    studentAddressCity: [Joi.string().optional(), Joi.allow(null)],
    studentAddressProvince: [Joi.string().optional(), Joi.allow(null)],
    studentAddressPostalCode: [Joi.string().optional(), Joi.allow(null)],
    studentAddressCountry: [Joi.string().optional(), Joi.allow(null)],
    studentPhoneNumber: [Joi.string().optional(), Joi.allow(null)],
    studentBirthDate: [Joi.string().optional(), Joi.allow(null)],
    studentProfileImage: [Joi.string().optional(), Joi.allow(null)]
  }).error;

  if (validationError !== null) {
    throw validationError;
  }

  Object.assign(this, opts);
}

export default StudentModel;
