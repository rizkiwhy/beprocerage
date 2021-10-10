const Joi = require('joi')

exports.createInbox = data => {
    const schema = Joi.object({
        name: Joi.string()
                .required()
                .min(6),
        email: Joi.string()
                .required()
                .min(7)
                .email(),
        notelp: Joi.number()
                .required()
                .min(12),
        subject: Joi.string()
                .required()
                .min(6),
        message: Joi.string()
                .required()
                .min(6),
    })
    return schema.validateAsync(data)
}
