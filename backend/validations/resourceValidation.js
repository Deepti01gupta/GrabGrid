import Joi from 'joi';

export const resourceValidation = Joi.object({
  title: Joi.string().min(2).max(100).required(),
  description: Joi.string().max(500),
  // Add more fields as per your resource
});
