const knex = require("../../database/conexao");

const cadastrarCliente = async (req, res) => {
    const { nome, email, cpf } = req.body;

    try {
        if (!nome || !email || !cpf) {
            return res.status(400).json({ mensagem: "Todos os campos são obrigatórios." });
        }

        const emailExiste = await knex("clientes").where({ email }).first();

        if (emailExiste) {
            return res.status(400).json({ mensagem: "O e-mail informado já está sendo utilizado." });
        }

        const cpfExiste = await knex("clientes").where({ cpf }).first();

        if (cpfExiste) {
            return res.status(400).json({ mensagem: "O CPF informado já está sendo utilizado." });
        }

        const [clienteID] = await knex("clientes").insert({ nome, email, cpf });

        return res.status(201).json({ mensagem: "Cliente cadastrado com sucesso!", clienteID });

    } catch (error) {
        return res.status(500).json({ mensagem: "Erro interno do servidor: " + error.message });
    }
};

module.exports = cadastrarCliente;