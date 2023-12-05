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
const { schemaProduto } = require("../schemas/schemaProduto");
const verificarCategoriaID = require("../middlewares/verficarCategoria");
const cadastrarProduto = require("../controllers/product/cadastraProduto");
const excluirProdutoPorId = require("../controllers/product/excluirProduto");
const listarClientes = require("../controllers/clients/listarClientes");
const listarProdutos = require("../controllers/product/listarProdutos");
const schemaCliente = require("../schemas/schemaCliente");
const editarCliente = require("../controllers/clients/editarCliente");
const verificarClienteID = require("../middlewares/verificarClienteID");
const detalharProduto = require("../controllers/product/detalharProduto");

const router = express();

router.post("/usuario", validarCorpo(schemaUsuario), cadastrarUsuario);
router.post("/login", validarLogin, loginUsuario);
router.get("/categoria", listarCategorias);

router.use(verificarToken);

router.get("/usuario", detalharPerfil);
router.put("/usuario", validarCorpo(schemaUsuario), editarUsuario);

router.post(
  "/produto",
  validarCorpo(schemaProduto),
  verificarCategoriaID,
  cadastrarProduto
);

router.delete("/produto/:id", excluirProdutoPorId);
router.get("/cliente", listarClientes);
router.get("/produto", listarProdutos);


router.get("/produto/:id", detalharProduto);
router.put("/cliente/:id", verificarClienteID, validarCorpo(schemaCliente), editarCliente)

module.exports = router;
