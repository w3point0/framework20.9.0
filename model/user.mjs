import mongoose from 'mongoose';
import passportLocalMongoose from 'passport-local-mongoose';
import logger from './logger.mjs';

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
const User = userDB.model('User', UserSchema, 'userData');
export default User;

// Error Handling for Connection
userDB.on('error', (err) => {
    logger.error('MongoDB connection error:', err);
});

userDB.once('open', () => {
    logger.info('MongoDB connection successful');
});
