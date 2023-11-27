const express = require("express");

const { cadastrarUsuario } = require("../controllers/users/cadastrarUsuario");
const validarEmail = require("../middlewares/validarEmail");
const validarUsuario = require("../middlewares/validarUsuario");

const router = express();

router.post("/usuario", validarEmail, validarUsuario, cadastrarUsuario);

module.exports = router;
