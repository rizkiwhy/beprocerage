const Joi = require('joi')

exports.createContacts = data => {
    const schema = Joi.object({
        key: Joi.string()
                .required()
                .min(5),
        value: Joi.string()
                .required()
                .min(6),
        icon: Joi.string()
                .required()
                .min(6),
        link: Joi.string(),
        active: Joi.boolean()
                .required()
    })
    return schema.validateAsync(data)
}
