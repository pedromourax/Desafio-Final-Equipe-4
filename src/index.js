require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const router = require("./router/router");

app.use(cors());
app.use(express.json());

app.use(router);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Servidor aberto: http://localhost:${port}`);
});
// app.listen(3000);
