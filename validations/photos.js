const Joi = require('joi')

exports.createPhotos = data => {
    const schema = Joi.object({
        name: Joi.string()
                .min(6)
                .required(),
        image: Joi.string()
                .min(12)
                .required(),
        width: Joi.string()
                .min(3)
                .max(3)
                .required(),
        active: Joi.boolean()
                .required()
    })
    return schema.validateAsync(data)
}

exports.updatePhotos = data => {
    const schema = Joi.object({
        name: Joi.string()
                .min(6)
                .required(),
        width: Joi.string()
                .min(3)
                .max(3)
                .required(),
        active: Joi.boolean()
                .required()
    })
    return schema.validateAsync(data)
}