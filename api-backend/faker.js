const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const {User} = require('./models/user');


// Create connection with mongoose DB
mongoose.connect('mongodb://localhost/ecommerce')
.then(() => console.log("Database connected"))
.catch(error => console.log("Database connected", error));
const seeDB = async() => {
    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash("12345", salt);
    const seedUsers = [
        {
            name: "Ankit",
            email: "ankitthaparbt@gmail.com",
            password: password,
        }
    ];

    await User.deleteMany({});
    await User.insertMany(seedUsers)
};

seeDB().then(()=> {
    mongoose.connection.close();
})