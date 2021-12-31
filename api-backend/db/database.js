const mongoose = require("mongoose");
const config = require("config");

// Create connection with mongoose DB
const db = config.get("db");
const connection = () => {
    mongoose.connect(db)
    .then(() => console.log(`Database connected ${db}`))
    .catch(error => console.log("Database connected", error));
}
module.exports = connection;