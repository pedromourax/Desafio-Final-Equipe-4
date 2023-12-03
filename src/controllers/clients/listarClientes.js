const knex = require("../../database/conexao");

const listarClientes = async(req, res) =>{
    const clientes = await knex("clientes");

    return res.status(200).json({ clientes });
};

module.exports = listarClientes;