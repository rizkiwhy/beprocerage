const Joi = require('joi')

exports.createCertifications = data => {
    const schema = Joi.object({
        code: Joi.string()
                .required()
                .min(6),
        name: Joi.string()
                .required()
                .min(6),
        tags: Joi.string()
                .required(),
        mea: Joi.string()
                .required(),
        field: Joi.string()
                .required(),
        category: Joi.string()
                .required(),
        image: Joi.string()
                .required(),
        active: Joi.boolean()
                .required()
    })
    return schema.validateAsync(data)
}

exports.updateCertifications = data => {
        const schema = Joi.object({
            code: Joi.string()
                    .required()
                    .min(6),
            name: Joi.string()
                    .required()
                    .min(6),
            tags: Joi.string()
                    .required(),
            mea: Joi.string()
                    .required(),
            field: Joi.string()
                    .required(),
            category: Joi.string()
                    .required(),
            active: Joi.boolean()
                    .required()
        })
        return schema.validateAsync(data)
    }
    