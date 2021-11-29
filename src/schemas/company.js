const Joi = require('joi') 

const newCompanySchema = Joi.object().keys({ 
  name: Joi.string().required(),
  domain: Joi.string().required(), 
});

module.exports = {
  newCompanySchema,
};
