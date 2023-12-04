const knex = require("../../database/conexao");

const listarProdutos = async (req, res) => {
    try {
        const produtos = await knex("produtos").select("*");
        return res.status(200).json(produtos);
    } catch (error) {
        return res.status(400).json({ mensagem: error.message });
    }
}

module.exports = listarProdutos;    