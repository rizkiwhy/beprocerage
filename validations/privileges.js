const Joi = require('joi')

exports.createPrivileges = data => {
    const schema = Joi.object({
        title: Joi.string()
                .required()
                .min(6),
        description: Joi.string()
                .required()
                .min(6),
        icon: Joi.string()
                .required()
                .min(6),
        active: Joi.boolean()
                .required()
    })
    return schema.validateAsync(data)
}
