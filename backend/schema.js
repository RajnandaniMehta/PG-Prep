import Joi from "joi";
import mongoose from "mongoose";
export const subjectSchema=Joi.object({  
    subjectName:Joi.string().required(),   
})

export const chapterSchema=Joi.object({
    formData:Joi.object({
        chapterName:Joi.string().required(),
        subjectId: Joi.string()
        .custom((value, helpers) => {
            if (!mongoose.Types.ObjectId.isValid(value)) {
                return helpers.error("any.invalid");
            }
            return value;
        })
        .required()
        .messages({
        "any.invalid": "Subject ID must be a valid Mongo ObjectId"
      })
    }).required()
})

export const questionSchema=Joi.object({
    formData:Joi.object({
        question:Joi.string().required(),
        options:Joi.array().items(
            Joi.object({
                num:Joi.string().required(),
                content:Joi.string().required()
            }).unknown(true)
        ).min(1).required(),
        answer: Joi.string().required(),
        explanation: Joi.string().allow('').optional(),
        chapterId: Joi.string()
      .custom((value, helpers) => {
        if (!mongoose.Types.ObjectId.isValid(value)) {
          return helpers.error('any.invalid');
        }
        return value;
      })
      .required()
      .messages({
        'any.invalid': `"chapterId" must be a valid MongoDB ObjectId`
      })
    }).required()
})