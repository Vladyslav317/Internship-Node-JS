const Joi = require('joi');

const schemaForName = Joi.object({
  name: Joi.string()
  .alphanum()
  .min(3)
  .max(30)
  .required(),
});


const schemaForBoth = Joi.object({
  name: Joi.string()
  .alphanum()
  .min(3)
  .max(30)
  .required(),

  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
})
  .with('name', 'email');

module.exports = {
  schemaForName,
  schemaForBoth
}
