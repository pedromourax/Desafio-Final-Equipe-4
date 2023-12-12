const knex = require("../../database/conexao");
const uploadFile = require("../../services/uploadFile")
const cadastrarProduto = async (req, res) => {
  const { descricao, quantidade_estoque, valor, categoria_id } = req.body;
  const { file } = req.file;
  try {

    const { url } = await uploadFile(
      file.filename,
      file.buffer,
      file.mimetype
    )

    const produtos = {
      descricao,
      quantidade_estoque,
      valor,
      categoria_id,
      produto_imagem: url
    };
    const novoProduto = await knex("produtos").insert(produtos).returning("*");

    return res.status(201).json(novoProduto[0]);
  } catch (error) {
    return res.status(400).json({ mensagem: error.message });
  }
};

module.exports = cadastrarProduto;
