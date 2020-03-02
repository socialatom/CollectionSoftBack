import Joi from "@hapi/joi";

function UpdateStaffModel(opts) {
  const validationError = Joi.validate(opts, {
    staffFirstName: [Joi.string().optional(), Joi.allow(null)],
    staffLastName: [Joi.string().optional(), Joi.allow(null)],
    staffCampus: [Joi.string().optional(), Joi.allow(null)],
    staffPosition: [Joi.string().optional(), Joi.allow(null)],
    staffImage: [Joi.string().optional(), Joi.allow(null)]
  }).error;

  if (validationError !== null) {
    throw validationError;
  }

  Object.assign(this, opts);
}

export default UpdateStaffModel;
