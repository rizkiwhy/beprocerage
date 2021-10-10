const Joi = require('joi')

exports.createCompetencyunits = data => {
    const schema = Joi.object({
        code: Joi.string()
                .required()
                .min(6),
        name: Joi.string()
                .required()
                .min(6),
        codeSchema: Joi.string()
                .required(),
        active: Joi.boolean()
                .required()
    })
    return schema.validateAsync(data)
}
