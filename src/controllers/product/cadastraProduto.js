const knex = require("../../database/conexao");

const cadastrarProduto = async (req, res) => {
  const { descricao, quantidade_estoque, valor, categoria_id } = req.body;

  try {
    const produtos = {
      descricao,
      quantidade_estoque,
      valor,
      categoria_id,
    };
    const novoProduto = await knex("produtos").insert(produtos).returning("*");

    return res.status(201).json(novoProduto[0]);
  } catch (error) {
    return res.status(400).json({ mensagem: error.message });
  }
};

module.exports = cadastrarProduto;
