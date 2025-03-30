const Joi = require('joi');

const usuarioSchema = Joi.object({
  nombre: Joi.string().min(3).max(50).required(),
  email: Joi.string().email().required(),
  edad: Joi.number().integer().min(0).required(),
});

module.exports = { usuarioSchema };
