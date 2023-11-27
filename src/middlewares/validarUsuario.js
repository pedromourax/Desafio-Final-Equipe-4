const knex = require("../database/conexao");

const validarUsuario = async (req, res, next) => {
  const { nome, email, senha } = req.body;
  try {
    if (!nome || !email || !senha) {
      return res.status(400).json({
        mensagem:
          "Você deve informar os campos obrigatórios: Nome, Email e Senha!",
      });
    }

    next();
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno do servidor." });
  }
};

module.exports = validarUsuario;
