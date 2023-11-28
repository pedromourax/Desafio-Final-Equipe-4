const express = require("express");

const { cadastrarUsuario } = require("../controllers/users/cadastrarUsuario");
const validarLogin = require("../middlewares/verificarLogin");
const loginUsuario = require("../controllers/users/efetuarLogin");
const editarUsuario = require("../controllers/users/editarPerfil");
const verificarToken = require("../middlewares/verificarToken");
const detalharPerfil = require("../controllers/users/detalharPerfil");
const validarCorpo = require("../middlewares/validarCorpo");
const schemaUsuario = require("../schemas/schemaUsuario");
const listarCategorias = require("../controllers/categoria/listarCategorias");

const router = express();

router.post("/usuario", validarCorpo(schemaUsuario), cadastrarUsuario);
router.post("/login", validarLogin, loginUsuario);
router.get("/categoria", listarCategorias);

router.use(verificarToken);

router.get("/usuario", detalharPerfil);
router.put("/usuario", validarCorpo(schemaUsuario), editarUsuario);

module.exports = router;
