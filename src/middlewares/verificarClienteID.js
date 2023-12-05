const knex = require("../database/conexao");

const verificarClienteID = async (req, res, next) => {
    const { id } = req.params;
    if (!id || isNaN(Number(id))) {
        return res.status(400).json({
            mensagem: "É necessário informar o id do cliente válido.",
        });
    }
    try {
        const produtoEncontrado = await knex("clientes").where({ id }).first();
        if (!produtoEncontrado) {
            return res.status(404).json({ mensagem: "O ID informado não existe." });
        }
        req.clienteID = id;
        next();
    } catch (error) {
        return res.status(500).json({ mensagem: "Erro interno do servidor" + error.message });
    }
}

module.exports = verificarClienteID;    