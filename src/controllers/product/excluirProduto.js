const knex = require("../../database/conexao");

const excluirProdutoPorId = async (req, res) => {
  const { id } = req.params;
  try {
    const produtoEncontrado = await knex("produtos")
      .where({ id })
      .first()
      .returning("*");
    if (!produtoEncontrado) {
      return res.status(404).json({ mensagem: "Produto não encontrado." });
    }

    const produtoDeletado = await knex("produtos").where({ id }).delete();
    return res.status(204).send();
  } catch (error) {
    return res.status(400).json({ mensagem: error.message });
  }
};

module.exports = excluirProdutoPorId;
