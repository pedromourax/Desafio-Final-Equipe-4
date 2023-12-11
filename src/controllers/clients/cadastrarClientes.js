const knex = require("../../database/conexao");

const cadastrarCliente = async (req, res) => {
    const { nome, email, cpf, cep, rua, numero, bairro, cidade, estado } = req.body;

    try {

        const emailExiste = await knex("clientes").where({ email }).first();

        if (emailExiste) {
            return res.status(400).json({ mensagem: "O e-mail informado já está sendo utilizado." });
        }

        const cpfExiste = await knex("clientes").where({ cpf }).first();

        if (cpfExiste) {
            return res.status(400).json({ mensagem: "O CPF informado já está sendo utilizado." });
        }

        const cliente = {
            nome,
            email,
            cpf,
            cep,
            rua,
            numero,
            bairro,
            cidade,
            estado
        }

        const clienteID = await knex("clientes").insert(cliente).returning("*");
        console.log(clienteID)
        return res.status(201).json(clienteID[0]);

    } catch (error) {
        console.log("teste")
        return res.status(500).json({ mensagem: "Erro interno do servidor: " + error.message });
    }
};

module.exports = cadastrarCliente;