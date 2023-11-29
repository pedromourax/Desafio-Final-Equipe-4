const knex = require("../../database/conexao")

const listarCategorias = async (req, res) => {
    const categorias = await knex('categorias');

    res.status(200).json({ categorias });
};

module.exports = listarCategorias
