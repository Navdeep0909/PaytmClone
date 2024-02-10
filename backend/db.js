const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://navdeep0909:MaaPapag1@cluster0.0vusxfw.mongodb.net/paytm")

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    firstName: String,
    lastName: String
})


//Create a model for schema
const User = mongoose.model('User', userSchema);

module.exports = {
    User
};