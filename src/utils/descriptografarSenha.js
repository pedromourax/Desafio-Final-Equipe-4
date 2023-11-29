const bcrypt = require("bcrypt");

const descriptografarSenha = async (senha, userPass) => {
    const senhaValida = await bcrypt.compare(senha, userPass);
    return senhaValida;
};

module.exports = descriptografarSenha;
