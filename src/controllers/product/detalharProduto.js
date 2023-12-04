const knex = require("../../database/conexao");
const { message } = require("../../schemas/schemaUsuario");

const detalharProduto = async (req, res) => {
    const { id } = req.params;

    try {
        const produto = await knex("produtos")
        .select("*")
        .where({ id });

        if (!produto || produto.length == 0) {
            return res.status(404).json({ mensagem: "Produto não encontrado" });
        }

        return res.status(200).json(produto[0]);
    } catch (error) {
        console.log(message.error);
        return res.status(500).json({ mensagem: "Erro interno do servidor" });
    }
}

module.exports = detalharProduto;