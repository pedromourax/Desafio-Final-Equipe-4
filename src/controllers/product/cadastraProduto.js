const knex = require("../../database/conexao");
const uploadFile = require("../../services/uploadFile")
const cadastrarProduto = async (req, res) => {
  const { descricao, quantidade_estoque, valor, categoria_id } = req.body;
  const { file } = req;
  try {
    let produto_imagem = undefined;

    if (file) {
      const { url } = await uploadFile(
        `${Date.now()}-${file.originalname}`,
        file.buffer,
        file.mimetype
      )
      produto_imagem = url
    }

    const produtos = {
      descricao,
      quantidade_estoque,
      valor,
      categoria_id,
      produto_imagem
    };
    const novoProduto = await knex("produtos").insert(produtos).returning("*");

    return res.status(201).json(novoProduto[0]);
  } catch (error) {
    return res.status(400).json({ mensagem: error.message });
  }
};

module.exports = cadastrarProduto;
