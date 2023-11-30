const knex = require("../database/conexao");

const verificarCategoriaID = async (req, res, next) => {
  const { categoria_id } = req.body;
  const categoriaEncontrada = await knex("categorias").where({
    id: categoria_id,
  });
  if (categoriaEncontrada.length === 0) {
    return res.status(404).json({ mensagem: "Insira uma categoria válida." });
  }
  next();
};

module.exports = verificarCategoriaID;
