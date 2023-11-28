const knex = require("../../database/conexao");
const descriptografarSenha = require("../../utils/descriptografarSenha");
const jwt = require("jsonwebtoken");

const loginUsuario = async (req, res) => {
    const { email, senha } = req.body;
    try {
        const usuario = await knex("usuarios")
            .where("email", "=", email)
            .first();

        if (!usuario) {
            return res
                .status(401)
                .json({ mensagem: "E-mail ou senha inválidos" });
        }

        const validarSenha = await descriptografarSenha(senha, usuario.senha);

        if (!validarSenha) {
            return res
                .status(401)
                .json({ mensagem: "E-mail ou senha inválidos" });
        }

        const token = jwt.sign({ id: usuario.id }, process.env.SENHA_JWT, {
            expiresIn: "1d",
        });

        const { senha: _, ...usuarioRetorno } = usuario;

        return res.status(201).json({ usuario: usuarioRetorno, token });
    } catch (error) {
        return res
            .status(500)
            .json({ mensagem: "Erro interno do servidor" + error.message });
    }
};

module.exports = loginUsuario;
