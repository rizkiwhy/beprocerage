const Joi = require('joi')

exports.createCertifications = data => {
    const schema = Joi.object({
        name: Joi.string()
                .required()
                .min(6),
        description: Joi.string()
                .required()
                .min(6),
        numberOfMeetings: Joi.number()
                .required(),
        tags: Joi.array()
                .required(),
        level: Joi.string()
                .required(),
        active: Joi.boolean()
                .required()
    })
    return schema.validateAsync(data)
}
