import * as Joi from "joi";

// #region add Business
export const booksValidation = Joi.object().keys({
  title: Joi.string().max(255).required(),
  author: Joi.string().required(),
  summary: Joi.string().required(),
});

export const booksUpdateValidation = Joi.object().keys({
  title: Joi.string().max(255),
  author: Joi.string(),
  summary: Joi.string(),
});
