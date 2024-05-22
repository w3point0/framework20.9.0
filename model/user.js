const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const uri = process.env.MONGO_USERS || 'mongodb://localhost/mc1users';
const USERS_URI = uri ? uri : 'mongodb://localhost/mc1users';

const userDB = mongoose.createConnection(USERS_URI, {});

// Create Schema
const { Schema } = mongoose;
const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/.+@.+\..+/, 'Please fill a valid email address']
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    active: {
        type: Boolean,
        default: true
    }
});

// Add passportLocalMongoose plugin
UserSchema.plugin(passportLocalMongoose);

// Export the model
module.exports = userDB.model('User', UserSchema, 'userData');

// Error Handling for Connection
userDB.on('error', console.error.bind(console, 'MongoDB connection error:'));
userDB.once('open', () => {
 
});
