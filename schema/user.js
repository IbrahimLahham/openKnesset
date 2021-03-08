const mongoose = require("mongoose");
// const  mongoose  = require('../server');

const UserSchema = new mongoose.Schema({
    email: { type: String, unique: true },
    password: String,
    firstName: String,
    lastName: String,
    phone: String,
    company: String,
    type: String,
    active: { type: Boolean, default: true },
    language: String
});


const User = mongoose.model("users", UserSchema);
module.exports = User;