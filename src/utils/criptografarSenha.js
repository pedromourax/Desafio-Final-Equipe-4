const bcrypt = require("bcrypt");

const criptografarSenha = async (senha, salt = 10) => {
    return await bcrypt.hash(senha, salt);
};

module.exports = criptografarSenha;
