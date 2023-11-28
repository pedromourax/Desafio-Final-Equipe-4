const bcrypt = require("bcrypt");

const senhaCriptografada = async (senha, salt = 10) => {
  return await bcrypt.hash(senha, salt);
};

module.exports = {
  senhaCriptografada,
};
