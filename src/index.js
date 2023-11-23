require("dotenv").config();
const express = require("express");
const app = express();

app.use(express.json());

// app.use(router)

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Servidor aberto: http://localhost:${port}`);
});
