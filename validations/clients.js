const Joi = require('joi')

exports.createClients = data => {
    const schema = Joi.object({
        name: Joi.string()
                .min(6)
                .required(),
        period: Joi.string()
                .required(),
        numberOfParticipants: Joi.number()
                .required(),
        article: Joi.string()
                .required(),
        instagram: Joi.string()
                .required(),
        image: Joi.string()
                .min(12)
                .required(),
        active: Joi.boolean()
                .required()
    })
    return schema.validateAsync(data)
}

exports.updateClients = data => {
    const schema = Joi.object({
        name: Joi.string()
                .min(6)
                .required(),
        period: Joi.string()
                .required(),
        numberOfParticipants: Joi.number()
                .required(),
        article: Joi.string()
                .required(),
        instagram: Joi.string()
                .required(),
        active: Joi.boolean()
                .required()
    })
    return schema.validateAsync(data)
}