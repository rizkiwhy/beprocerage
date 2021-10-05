const Joi = require('joi')

exports.createAssesors = data => {
    const schema = Joi.object({
        name: Joi.string()
                .min(6)
                .required(),
        tags: Joi.array()
                .required(),
        degree: Joi.string()
                .min(6)
                .required(),
        graduateOf: Joi.string()
                .min(6)
                .required(),
        quote: Joi.string()
                .min(6)
                .required(),
        image: Joi.string()
                .min(12)
                .required(),
        active: Joi.boolean()
                .required()
    })
    return schema.validateAsync(data)
}

exports.updateAssesors = data => {
    const schema = Joi.object({
        name: Joi.string()
                .min(6)
                .required(),
        tags: Joi.array()
                .required(),
        degree: Joi.string()
                .min(6)
                .required(),
        graduateOf: Joi.string()
                .min(6)
                .required(),
        quote: Joi.string()
                .min(6)
                .required(),
        active: Joi.boolean()
                .required()
    })
    return schema.validateAsync(data)
}