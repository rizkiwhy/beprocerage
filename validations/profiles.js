const Joi = require('joi')

exports.createProfiles = data => {
    const schema = Joi.object({
        number: Joi.number()
                .required(),
        content: Joi.string()
                .required()
                .min(6),
        category: Joi.string()
                .required(),
        active: Joi.boolean()
                .required()
    })
    return schema.validateAsync(data)
}
