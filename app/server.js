const express = require('express');
const bodyParser = require("body-parser");
const cors = require("cors");
const router = require('./router');

const port = process.env.PORT || 2222;

const app = express();

var corsOptions = {
    origin: "http://localhost:4200"
};

app.use(cors(corsOptions));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use('/v1', router);

app.listen(port, () => {
    console.log(`Serveur lancé sur http://localhost:${port}/v1`);
});