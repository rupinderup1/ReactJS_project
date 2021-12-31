const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("./db/database")();

const app = express();

const auth = require("./routes/auth");
const users = require("./routes/users");
const categories = require("./routes/categories");
const products = require("./routes/products");

app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.json());

app.options("*", cors({ origin: 'http://localhost:3000', optionsSuccessStatus: 200 }));

app.use(cors({ origin: "http://localhost:3000", optionsSuccessStatus: 200 }));

app.use('/api/auth', auth);
app.use('/api/user', users);
app.use('/api/categories', categories);
app.use('/api/products', products);

// Created the server
const server = app.listen(8080)

module.exports = server;
