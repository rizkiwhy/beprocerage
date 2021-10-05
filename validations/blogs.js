const Joi = require('joi')

exports.createBlogs = data => {
    const schema = Joi.object({
        title: Joi.string()
                .min(6)
                .required(),
        subtitle: Joi.string()
                .min(6)
                .required(),
        publisher: Joi.string()
                .min(6)
                .required(),
        description: Joi.string()
                .min(6)
                .required(),
        tags: Joi.array()
                .required(),
        active: Joi.boolean()
                .required(),
        image: Joi.string()
                .min(12)
                .required(),
    })
    return schema.validateAsync(data)
}

exports.updateBlogs = data => {
    const schema = Joi.object({
        title: Joi.string()
                .min(6)
                .required(),
        subtitle: Joi.string()
                .min(6)
                .required(),
        publisher: Joi.string()
                .min(6)
                .required(),
        description: Joi.string()
                .min(6)
                .required(),
        tags: Joi.array()
                .required(),
        active: Joi.boolean()
                .required(),
    })
    return schema.validateAsync(data)
}