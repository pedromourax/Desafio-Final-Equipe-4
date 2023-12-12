const knex = require("../../database/conexao");

const excluirProdutoPorId = async (req, res) => {
  const { id } = req.params;
  try {
    const verificarProduto = await knex("pedido_produtos")
    .select("produto_id")
    .where({ produto_id: id });

    if (verificarProduto.length > 0) {
        console.log("Produto vinculado a pedidos. Impedindo exclusão.");
        return res.status(404).json({ mensagem: "Operação inválida. O produto informado está vinculado a um ou mais pedidos." });
    }
    
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
