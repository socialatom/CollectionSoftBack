import Joi from "@hapi/joi";

function StaffModel(opts) {
  const validationError = Joi.validate(opts, {
    staffProfileId: Joi.string().required(),
    staffFirstName: Joi.string().required(),
    staffLastName: Joi.string().required(),
    staffCampus: Joi.string().required(),
    staffEmail: Joi.string().required(),
    staffPosition: [Joi.string().optional(), Joi.allow(null)],
    staffImage: [Joi.string().optional(), Joi.allow(null)]
  }).error;

  if (validationError !== null) {
    throw validationError;
  }

  Object.assign(this, opts);
}

export default StaffModel;
