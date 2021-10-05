const Joi = require('joi')

exports.createSocialMedias = data => {
    const schema = Joi.object({
        type: Joi.string()
                .required()
                .min(3),
        value: Joi.string()
                .required()
                .min(6),
        icon: Joi.string()
                .required()
                .min(6),
        link: Joi.string()
                .required(),
        active: Joi.boolean()
                .required()
    })
    return schema.validateAsync(data)
}
