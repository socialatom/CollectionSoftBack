import Joi from "@hapi/joi";

function CreateStudentISAModel(opts) {
  const validationError = Joi.validate(opts, {
    studentISAProgram: Joi.string().required(),
    studentISACap: Joi.number().integer().required(),
    studentISAMinimumIncome: Joi.number().integer().required(),
    studentISAIncomeSharePercentage: Joi.number().integer().required(),
    studentISAAgreementDurationMonths: Joi.number().integer().required(),
    studentISAMonthlyInstallments: Joi.number().integer().required(),
    studentISAMaxContractValidity: Joi.number().integer().required(),
    studentISATrustFund: Joi.string().required(),
    studentISAFiduciary: Joi.string().required(),
    studentISAFiduciaryGovID: Joi.string().required(),
    studentISAAcademyOperator: Joi.string().required(),
    studentISAAcademyOperatorGovID: Joi.string().required(),
    studentISAAcademyOperatorEmail: Joi.string().required(),
    studentISAAcademyOperatorAddress: Joi.string().required(),
    studentISACollectionCompany: Joi.string().required(),
    studentISACollectionCompanyGovId: Joi.string().required(),
    studentISACollectionCompanyEmail: Joi.string().required(),
    studentISACollectionCompanyAddress: Joi.string().required(),
    studentISACampus: Joi.string().required(),
    studentISACohort: Joi.string().required(),
    studentISACohortStartDate: Joi.string().required(),
  }).error;

  if (validationError !== null) {
    throw validationError;
  }

  Object.assign(this, opts);
}

export default CreateStudentISAModel;
