const Joi = require('joi')

exports.createExpertises = data => {
    const schema = Joi.object({
        name: Joi.string()
                .min(6)
                .required(),
        icon: Joi.string()
                .min(6)
                .required(),
        abbr: Joi.string()
                .min(2)
                .max(4)
                .required(),
        image: Joi.string()
                .min(12)
                .required(),
    })
    return schema.validateAsync(data)
}

exports.updateExpertises = data => {
    const schema = Joi.object({
        name: Joi.string()
                .min(6)
                .required(),
        icon: Joi.string()
                .min(6)
                .required(),
        abbr: Joi.string()
                .min(2)
                .max(4)
                .required(),
    })
    return schema.validateAsync(data)
}