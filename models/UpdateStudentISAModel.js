import Joi from "@hapi/joi";

function UpdateStudentISAModel(opts) {
  const validationError = Joi.validate(opts, {
    studentISAProgram: [Joi.string().optional(), Joi.allow(null)],
    studentISACap: [Joi.number().integer().optional(), Joi.allow(null)],
    studentISAMinimumIncome: [Joi.number().integer().optional(), Joi.allow(null)],
    studentISAIncomeSharePercentage: [Joi.number().integer().optional(), Joi.allow(null)],
    studentISAAgreementDurationMonths: [Joi.number().integer().optional(), Joi.allow(null)],
    studentISAMonthlyInstallments: [Joi.number().integer().optional(), Joi.allow(null)],
    studentISAMaxContractValidity: [Joi.number().integer().optional(), Joi.allow(null)],
    studentISATrustFund: [Joi.string().optional(), Joi.allow(null)],
    studentISAFiduciary: [Joi.string().optional(), Joi.allow(null)],
    studentISAFiduciaryGovID: [Joi.string().optional(), Joi.allow(null)],
    studentISAAcademyOperator: [Joi.string().optional(), Joi.allow(null)],
    studentISAAcademyOperatorGovID: [Joi.string().optional(), Joi.allow(null)],
    studentISAAcademyOperatorEmail: [Joi.string().optional(), Joi.allow(null)],
    studentISAAcademyOperatorAddress: [Joi.string().optional(), Joi.allow(null)],
    studentISACollectionCompany: [Joi.string().optional(), Joi.allow(null)],
    studentISACollectionCompanyGovId: [Joi.string().optional(), Joi.allow(null)],
    studentISACollectionCompanyEmail: [Joi.string().optional(), Joi.allow(null)],
    studentISACollectionCompanyAddress: [Joi.string().optional(), Joi.allow(null)],
    studentISACampus: [Joi.string().optional(), Joi.allow(null)],
    studentISACohort: [Joi.string().optional(), Joi.allow(null)],
    studentISACohortStartDate: [Joi.string().optional(), Joi.allow(null)]
  }).error;

  if (validationError !== null) {
    throw validationError;
  }

  Object.assign(this, opts);
}

export default UpdateStudentISAModel;
