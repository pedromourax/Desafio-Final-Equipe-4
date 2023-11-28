const knex = require("../database/conexao");

const validarEmail = async (req, res, next) => {
    const { email } = req.body;
    if (!email) {
        return res
            .status(400)
            .json({ mensagem: "O campo email é obrigatório!" });
    }

    try {
        const encontrarUsuario = await knex("usuarios")
            .where({ email })
            .returning("*");
        req.validarEmail =
            encontrarUsuario.length === 0 ? null : encontrarUsuario[0];
        next();
    } catch (error) {
        return res.status(400).json({
            mensagem: "Já existe usuário cadastrado com o e-mail informado.",
        });
    }
};

module.exports = validarEmail;
