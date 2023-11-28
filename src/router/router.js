const express = require("express");

const { cadastrarUsuario } = require("../controllers/users/cadastrarUsuario");
const validarEmail = require("../middlewares/validarEmail");
const validarUsuario = require("../middlewares/validarUsuario");
const validarLogin = require("../middlewares/verificarLogin");
const loginUsuario = require("../controllers/users/efetuarLogin");
const verificarToken = require("../middlewares/verificarToken");
const detalharPerfil = require("../controllers/users/detalharPerfil");

const router = express();

router.post("/usuario", validarEmail, validarUsuario, cadastrarUsuario);
router.post("/login", validarLogin, loginUsuario);

router.use(verificarToken);

router.get("/usuario", detalharPerfil);

module.exports = router;
