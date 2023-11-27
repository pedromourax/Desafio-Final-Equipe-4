const knex = require("../database/conexao");

const validarLogin = async (req,res) => {
    const { email, senha } = req.body;

    try {
        if (!email || !senha) {
            return res.status(400).json({ 
                mensagem: 'Você deve informar os campos obrigatórios: Nome, Email e Senha!'})
        };
    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro interno do servidor' });
    }
}

module.exports = validarLogin;