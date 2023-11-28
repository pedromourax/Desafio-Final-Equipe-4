const knex = require("../../database/conexao");

const detalharPerfil = async (req, res) => {
    const id = [req.usuario][0];

    try {
        const usuario = await knex("usuarios").select("*").where({ id });

        if (!usuario) {
            return res
                .status(404)
                .json({ mensagem: "Usuário não encontrado!" })
                .first();
        }

        const { senha: _, ...perfil } = usuario[0];

        return res.status(200).json(perfil);
    } catch (error) {
        return res.status(500).json({
            mensagem: `Erro interno do servidor - ${error.message}`,
        });
    }
};

module.exports = detalharPerfil;
