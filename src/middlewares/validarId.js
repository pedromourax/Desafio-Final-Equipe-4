const verficarID = async (req, res, next) => {
    const { id } = req.params;

    try {
        const idConvertido = parseInt(id) ;

        if (isNaN(idConvertido) || !idConvertido) {
            return res.status(400).json({ mensagem: "Erro de solicitação, favor informar ID" });
        }
        next();
    } catch (error) {
        return res.status(400).json({ mensagem: "Erro interno do servidor" });
    }
}

module.exports = verficarID;