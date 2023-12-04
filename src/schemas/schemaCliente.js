const joi = require("joi");

const schemaCliente = joi.object({
    nome: joi.string().required().messages({
        "any.required": "O campo nome é obrigatório",
        "string.empty": "O campo nome não pode ser vazio",
    }),

    email: joi.string().email().required().messages({
        "string.email": "O campo email precisa ter um formato válido",
        "any.required": "O campo email é obrigatório",
        "string.empty": "O campo email não pode ser vazio",
    }),

    cpf: joi.string().length(11).required().messages({
        "any.required": "O campo cpf senha é obrigatório",
        "string.empty": "O campo cpf não pode ser vazio",
        "string.length": "O campo cpf deve conter 11 caracteres",
    }),
});

module.exports = schemaCliente;
