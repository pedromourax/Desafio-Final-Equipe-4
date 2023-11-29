const knex = require("../../database/conexao");
const criptografarSenha = require("../../utils/criptografarSenha");

const cadastrarUsuario = async (req, res) => {
    const { nome, email, senha } = req.body;
    try {
        const emailExiste = await knex("usuarios")
            .where({ email })
            .returning("*")
            .first();

        if (emailExiste) {
            return res.status(400).json({ mensagem: "Email já existe!" });
        }

        const senhaHash = await criptografarSenha(senha);
        const novoUsuario = {
            nome,
            email,
            senha: senhaHash,
        };
        const cadastrarUsuario = await knex("usuarios")
            .insert(novoUsuario)
            .returning("*");

        if (cadastrarUsuario.length === 0) {
            return res.status(400).json("O usuário não foi cadastrado.");
        }
        delete cadastrarUsuario[0].senha;
        return res.status(201).json(cadastrarUsuario[0]);
    } catch (error) {
        return res.status(400).json({ mensagem: error.message });
    }
};

module.exports = {
    cadastrarUsuario,
};
