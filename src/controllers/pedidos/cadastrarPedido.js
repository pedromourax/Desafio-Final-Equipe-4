const knex = require("../../database/conexao");
const transportador = require("../../services/email");

const cadastrarPedido = async (req, res) => {
  const { cliente_id, observacao, pedido_produtos } = req.body;

  try {
    if (!cliente_id || !pedido_produtos || pedido_produtos.length === 0) {
      return res
        .status(400)
        .json({ mensagem: "Campos obrigatórios faltando ou vazios." });
    }

    const cliente = await knex("clientes").where("id", cliente_id).first();
    if (!cliente) {
      return res.status(404).json({ mensagem: "Cliente não encontrado." });
    }

    let valor_total = 0;

    for (const item of pedido_produtos) {
      const produto = await knex("produtos")
        .where({ id: item.produto_id })
        .first();

      if (!produto) {
        return res.status(400).json({
          mensagem: `Não existe produto com o id ${item.produto_id}.`,
        });
      }

      if (produto.quantidade_estoque < item.quantidade_produto) {
        return res.status(400).json({
          mensagem: `Não há estoque suficiente - produto com quantidade inferior a ${item.quantidade_produto} unidades.`,
        });
      }

      const subtracao = produto.quantidade_estoque - item.quantidade_produto;

      const atualizarEstoque = await knex("produtos")
        .where({ id: item.produto_id })
        .update({ quantidade_estoque: subtracao });

      if (!atualizarEstoque) {
        return res
          .status(500)
          .json({ mensagem: "Não foi possível atualizar o estoque." });
      }

      valor_total += produto.valor * item.quantidade_produto;
    }

    const registrarTabelaPedidos = await knex("pedidos").insert({
      cliente_id,
      observacao,
      valor_total,
    });

    if (!registrarTabelaPedidos) {
      return res
        .status(500)
        .json({ mensagem: "Não foi possível atualizar os pedidos." });
    }

    const pedidoPorID = await knex("pedidos").where({ cliente_id });

    for (const item of pedido_produtos) {
      const produto = await knex("produtos")
        .where({ id: item.produto_id })
        .first();
      let pedido_id = pedidoPorID[pedidoPorID.length - 1].id;

      const novoPedido = await knex("pedido_produtos").insert({
        pedido_id,
        produto_id: item.produto_id,
        quantidade_produto: item.quantidade_produto,
        valor_produto: produto.valor,
      });

      if (!novoPedido) {
        return res.status(500).json({
          mensagem: "Não foi possível atualizar os produtos dos pedidos",
        });
      }
    }

    await transportador.sendMail({
      from: `<${process.env.EMAIL_FROM}>`,
      to: `${cliente.nome} <${cliente.email}>`,
      subject: `${cliente.nome}, seu pedido foi cadastrado!`,
      text: "Seu pedido foi cadastrado com sucesso em nosso sistema!",
    });
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno do servidor" });
  }

  return res.status(201).json({ mensagem: "Pedido cadastrado com sucesso!" });
};

module.exports = { cadastrarPedido };
