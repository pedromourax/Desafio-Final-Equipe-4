const knex = require("../../database/conexao");

const listarProdutos = async (req, res) => {
    const { categoria_id } = req.query
    try {
        let produtos;
        if (!categoria_id) {
            produtos = await knex("produtos").select("*")
        }
        else if (categoria_id.length == 1) {
            produtos = await knex("produtos").select("*").where({ categoria_id })
        }
        else {
            produtos = await knex("produtos").select("*").whereIn('categoria_id', categoria_id)
        }

        return res.status(200).json(produtos);
    } catch (error) {
        return res.status(400).json({ mensagem: error.message });
    }
}

module.exports = listarProdutos;