/* eslint-disable no-undef */
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import User from '../path_to_your_model_file';  // adjust the path as necessary
 

jest.mock('../path_to_your_logger_file'); // mock the logger to avoid actual logging during tests

let mongoServer;

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();

    mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
        if (err) console.error(err);
    });
});

afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
});

describe('User Model Test', () => {
    it('should create and save a user successfully', async () => {
        const validUser = new User({
            username: 'testuser',
            password: 'testpassword',
            email: 'testuser@example.com',
            firstName: 'Test',
            lastName: 'User',
            role: 'user',
            active: true
        });

        const savedUser = await validUser.save();

        // Verify the user details
        expect(savedUser._id).toBeDefined();
        expect(savedUser.username).toBe(validUser.username);
        expect(savedUser.email).toBe(validUser.email);
        expect(savedUser.firstName).toBe(validUser.firstName);
        expect(savedUser.lastName).toBe(validUser.lastName);
        expect(savedUser.role).toBe(validUser.role);
        expect(savedUser.active).toBe(validUser.active);
    });

    it('should not save a user with invalid email', async () => {
        const invalidUser = new User({
            username: 'testuser2',
            password: 'testpassword2',
            email: 'invalid-email',
            firstName: 'Test',
            lastName: 'User',
            role: 'user',
            active: true
        });

        let err;
        try {
            await invalidUser.save();
        } catch (error) {
            err = error;
        }

        expect(err).toBeDefined();
        expect(err.errors.email).toBeDefined();
    });

    it('should not save a user without required fields', async () => {
        const userWithoutRequiredFields = new User({});

        let err;
        try {
            await userWithoutRequiredFields.save();
        } catch (error) {
            err = error;
        }

        expect(err).toBeDefined();
        expect(err.errors.username).toBeDefined();
        expect(err.errors.password).toBeDefined();
        expect(err.errors.email).toBeDefined();
        expect(err.errors.firstName).toBeDefined();
        expect(err.errors.lastName).toBeDefined();
    });
});
