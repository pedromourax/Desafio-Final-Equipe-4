const knex = require("../../database/conexao");
const { senhaCriptografada } = require("../../utilis/criptografia");

const editarUsuario = async (req, res) => {
  const { nome, email, senha } = req.body;
  const { id } = req.params;

  try {
    const usuarioExiste = await knex("usuarios").where({ id }).first();

    if (!usuarioExiste) {
      return res.status(404).json("Usuário não encontrado");
    }

    const emailExiste = await knex("usuarios").where({ email }).first();

    if (emailExiste && emailExiste.id !== Number(id)) {
      return res.status(400).json({
        mensagem: "O e-mail informado já está sendo utilizado.",
      });
    }

    const senhaHash = await senhaCriptografada(senha);

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
    return res.status(500).json({ mensagem: "Erro interno do servidor" });
  }
};

module.exports = { editarUsuario };
