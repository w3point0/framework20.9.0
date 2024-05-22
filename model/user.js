const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

let uri = process.env.MONGO_USERS;
const USERS_URI = uri ? uri : 'mongodb://localhost/mc1users';
let connectLog = uri ? '==> Connected to remote user database.' : '==> Connected to localhost user database';
console.log(connectLog);
const userDB = mongoose.createConnection(USERS_URI, {});

const Schema = mongoose.Schema;     // Create Model
const User = new Schema({
    username: String,
    password: String,
    email: String,
    firstName: String,
    lastName: String,
    role: String,
    active: Boolean
});

User.plugin(passportLocalMongoose);     // Add the passport stuff before exporting.

module.exports = userDB.model('userData', User, 'userData');