const Joi = require('joi')

exports.createCategories = data => {
    const schema = Joi.object({
        name: Joi.string()
                .required()
                .min(6),
        active: Joi.boolean()
                .required()
    })
    return schema.validateAsync(data)
}
