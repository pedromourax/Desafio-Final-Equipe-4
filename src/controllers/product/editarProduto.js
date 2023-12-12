const knex = require("../../database/conexao");
const uploadFile = require("../../services/uploadFile")

const atualizarProduto = async (req, res) => {
    const { descricao, quantidade_estoque, valor, categoria_id } = req.body;
    const { file } = req;

    const idProduto = req.params.id;
    try {
        const produtoExiste = await knex("produtos").where({ id: idProduto }).first();

        if (!produtoExiste) {
            return res.status(404).json({ mensagem: "Produto não encontrado." });
        }

        if (!descricao || !quantidade_estoque || !valor || !categoria_id) {
            return res.status(400).json({ mensagem: "Todos os campos são obrigatórios." });
        }

        // const categoriaExiste = await knex("categorias").where({ id: categoria_id }).first();

        // if (!categoriaExiste) {
        //     return res.status(400).json({ mensagem: "A categoria informada não existe." });
        // }

        let produto_imagem = undefined;

        if (file) {
            const { url } = await uploadFile(
                `${Date.now()}-${file.originalname}`,
                file.buffer,
                file.mimetype
            )
            produto_imagem = url
        }



        const produtoAtualizado = await knex("produtos")
            .update({ descricao, quantidade_estoque, valor, categoria_id, produto_imagem })
            .where({ id: idProduto });

        if (!produtoAtualizado) {
            return res.status(400).json({ mensagem: "Não foi possível atualizar o produto." });
        }

        return res.status(204).json({ mensagem: "Produto atualizado com sucesso!" });

    } catch (error) {
        return res.status(500).json({ mensagem: "Erro interno do servidor: " + error.message });
    }
};

module.exports = atualizarProduto;