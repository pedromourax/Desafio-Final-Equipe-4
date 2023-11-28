const knex = require("../../database/conexao");
const criptografarSenha = require("../../utils/criptografarSenha");

const editarUsuario = async (req, res) => {
    const { nome, email, senha } = req.body;
    const id = [req.usuario][0];

    try {
        const emailExiste = await knex("usuarios").where({ email }).first();

        if (emailExiste && emailExiste.id !== id) {
            return res.status(400).json({
                mensagem: "O e-mail informado já está sendo utilizado.",
            });
        }

        const senhaHash = await criptografarSenha(senha);

        const usuarioAtualizado = await knex("usuarios")
            .update({ nome, email, senha: senhaHash })
            .where({ id });

        if (!usuarioAtualizado) {
            return res.status(400).json("Não foi possivel atualizar o usuário");
        }

        return res
            .status(204)
            .json({ mensagem: "Usuário atualizado com sucesso!" });
    } catch (error) {
        return res
            .status(500)
            .json({ mensagem: "Erro interno do servidor " + error.message });
    }
};

module.exports = editarUsuario;
