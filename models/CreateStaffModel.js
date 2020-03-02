import Joi from "@hapi/joi";

function CreateStaffModel(opts) {
  const validationError = Joi.validate(opts, {
    staffFirstName: Joi.string().required(),
    staffLastName: Joi.string().required(),
    staffEmail: Joi.string().required(),
    staffCampus: Joi.string().required()
  }).error;

  if (validationError !== null) {
    throw validationError;
  }

  Object.assign(this, opts);
}

export default CreateStaffModel;
