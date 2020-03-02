import Joi from "@hapi/joi";

function CreateStudentModel(opts) {
  const validationError = Joi.validate(opts, {
    studentEmail: Joi.string().required(),
    studentFirstName: Joi.string().required(),
    studentLastName: Joi.string().required(),
    studentCampus: Joi.string().required(),
    studentIdentificationType: Joi.string().required(),
    studentIdentificationNumber: Joi.string().required()
  }).error;

  if (validationError !== null) {
    throw validationError;
  }

  Object.assign(this, opts);
}

export default CreateStudentModel;
