const knex = require("../../database/conexao")

const editarCliente = async (req, res) => {
    const { nome, email, cpf } = req.body;
    const id = req.clienteID;

    try {
        const emailExiste = await knex("clientes").where({ email }).first()

        if (emailExiste && emailExiste.id !== id) {
            return res.status(400).json({
                mensagem: "O e-mail informado já está sendo utilizado.",
            });
        }

        const usuarioAtualizado = await knex("clientes")
            .update({ nome, email, cpf })
            .where({ id });

        if (!usuarioAtualizado) {
            return res.status(400).json("Não foi possivel atualizar o cliente");
        }

        return res
            .status(204)
            .json({ mensagem: "Cliente atualizado com sucesso!" });

    } catch (error) {
        return res
            .status(500)
            .json({ mensagem: "Erro interno do servidor " + error.message })
    }
}

module.exports = editarCliente; 