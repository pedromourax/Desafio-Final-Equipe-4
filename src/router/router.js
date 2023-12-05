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
const detalharCliente = require("../controllers/clients/detalharCliente");
const cadastrarCliente = require("../controllers/clients/cadastrarClientes");
const validarID = require("../middlewares/validarId");
const editarProduto = require("../controllers/product/editarProduto");

const router = express();

router.post("/usuario", validarCorpo(schemaUsuario), cadastrarUsuario);
router.post("/login", validarLogin, loginUsuario);
router.get("/categoria", listarCategorias);

router.use(verificarToken);

router.put("/usuario", validarCorpo(schemaUsuario), editarUsuario);
router.get("/usuario", detalharPerfil);

router.post(
  "/produto",
  validarCorpo(schemaProduto),
  verificarCategoriaID,
  cadastrarProduto
);
router.get("/produto", listarProdutos);

router.post("/cliente", cadastrarCliente);
router.get("/cliente", listarClientes);


router.put(
  "/cliente/:id",
  validarID,
  verificarClienteID,
  validarCorpo(schemaCliente),
  editarCliente

);

router.get("/cliente/:id", validarID, detalharCliente);

router.get("/produto/:id", validarID, detalharProduto);
router.delete("/produto/:id", validarID, excluirProdutoPorId);



router.get("/cliente/:id", detalharCliente);
router.post("/cliente", validarCorpo(schemaCliente), cadastrarCliente);
router.put("/produto/:id", editarProduto);


module.exports = router;