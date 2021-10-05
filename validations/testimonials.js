const Joi = require('joi')

exports.createTestimonials = data => {
    const schema = Joi.object({
        name: Joi.string()
                .min(6)
                .required(),
        testimonial: Joi.string()
                .required(),
        image: Joi.string()
                .min(12)
                .required(),
        active: Joi.boolean()
                .required()
    })
    return schema.validateAsync(data)
}

exports.updateTestimonials = data => {
    const schema = Joi.object({
        name: Joi.string()
                .min(6)
                .required(),
        testimonial: Joi.string()
                .required(),
        active: Joi.boolean()
                .required()
    })
    return schema.validateAsync(data)
}