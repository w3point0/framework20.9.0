/* eslint-disable no-undef */
const mongoose = require('mongoose');
const User = require('../user'); // Adjust the path to where your model is located

 

const userData = {
    username: 'testuser',
    password: 'testpassword',
    email: 'testuser@example.com',
    firstName: 'Test',
    lastName: 'User',
    role: 'user',
    active: true
};

beforeAll(async () => {
    await mongoose.connect('mongodb://localhost/test', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
});

afterAll(async () => {
    await mongoose.disconnect();

});

describe('User Model Test', () => {
    let userId;

    it('create & save user successfully', async () => {
        const user = new User(userData);
        const savedUser = await user.save();
        userId = savedUser._id;
        expect(savedUser._id).toBeDefined();
        expect(savedUser.username).toBe(userData.username);
        expect(savedUser.email).toBe(userData.email);
    });

    it('delete user successfully', async () => {
        const deletedUser = await User.findByIdAndDelete(userId);
        expect(deletedUser).not.toBeNull();
        expect(deletedUser._id.toString()).toBe(userId.toString());
    });
});
