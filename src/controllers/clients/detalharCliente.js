const knex = require("../../database/conexao");

const detalharCliente = async (req, res) => {
  const { id } = req.params;

  try {
    const clienteEncontrado = await knex("clientes").where({ id });

    if (!clienteEncontrado) {
      return res.status(404).json({ mensagem: "Cliente não encontrado." });
    }

    return res.json(clienteEncontrado);
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno do servidor" });
  }
};

module.exports = detalharCliente;
