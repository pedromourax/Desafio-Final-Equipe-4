const knex = require("../../database/conexao");
const { senhaDescriptografada } = require("../../utilis/criptografia");
const jwt = require('jsonwebtoken');
const senhaJwt = require("../../senhaJwt");

const loginUsuario = async (req, res) => {
    const { email, senha } = req.body;
    try {
        const usuario = await knex('usuarios')
        .where('email', '=', email)
        .first();

        if (!usuario) {
            return res.status(401).json({ mensagem: 'E-mail ou senha inválidos' });
        }

        const validarSenha = await senhaDescriptografada(senha, usuario.senha)

        if (!validarSenha) {
            return res.status(401).json({ mensagem: 'E-mail ou senha inválidos' });
        }

        const token = jwt.sign({ id: usuario.id}, senhaJwt, {expiresIn: "1d"});

        const { senha: _, ...usuarioRetorno } = usuario;

        return res.status(201).json({usuario: usuarioRetorno, token});
    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro interno do servidor' });
    }
}

module.exports = loginUsuario;