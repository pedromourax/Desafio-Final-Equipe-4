const jwt = require("jsonwebtoken");

const verificarToken = async (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization)
        return res.status(401).json({ mensagem: "Não autenticado" });

    try {
        const token = authorization.split(" ")[1];
        const tokenValido = jwt.verify(token, process.env.SENHA_JWT);
        const { id } = tokenValido;
        req.usuario = id;
        next();
    } catch (error) {
        return res.status(401).json({
            mensagem: "Token de autenticação inválido: " + error.message,
        });
    }
};

module.exports = verificarToken;
