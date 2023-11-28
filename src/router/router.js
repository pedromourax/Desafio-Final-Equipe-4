const express = require("express");

const { cadastrarUsuario } = require("../controllers/users/cadastrarUsuario");
const validarEmail = require("../middlewares/validarEmail");
const validarUsuario = require("../middlewares/validarUsuario");
const validarLogin = require("../middlewares/verificarLogin");
const loginUsuario = require("../controllers/users/efetuarLogin");
const { editarUsuario } = require("../controllers/users/editarPerfil");

const router = express();

router.post("/usuario", validarEmail, validarUsuario, cadastrarUsuario);
router.post("/login", validarLogin, loginUsuario);
router.put("/usuario/:id", editarUsuario);

module.exports = router;
