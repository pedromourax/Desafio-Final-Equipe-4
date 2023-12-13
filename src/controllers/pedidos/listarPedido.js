const knex = require("../../database/conexao");

const listarPedido = async (req, res) => {
  const clienteId = req.query.cliente_id;

  try {
    let query = knex("pedidos");

    if (clienteId) {
      query = query.where({ cliente_id: clienteId });
    }

    const pedidos = await query.select();

    if (pedidos.length === 0) {
      return res.status(404).json({ mensagem: "Nenhum pedido encontrado." });
    }

    for (const pedido of pedidos) {
      pedido.pedido_produtos = await knex("pedido_produtos")
        .where({ pedido_id: pedido.id })
        .select();
    }

    return res.status(200).json(pedidos);
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro ao buscar pedidos." });
  }
};

module.exports = { listarPedido };
