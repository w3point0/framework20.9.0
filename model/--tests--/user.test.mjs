/* eslint-disable no-undef */
// file: test/userModel.test.mjs

import { describe, it, before, after } from 'node:test';
import assert from 'assert';
import mongoose from 'mongoose';
import User from '../user.mjs'; // Adjust the path as necessary

describe('User Model Test', () => {
  before(async () => {
    try {
      await mongoose.connect('mongodb://localhost/testDB', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log('Connected to MongoDB');
      await User.deleteMany({});
      console.log('Cleared User collection');
    } catch (error) {
      console.error('Error in before hook:', error);
      throw error;
    }
  });

  it('should create a new user with valid data', async () => {
    const userData = {
      username: 'testuser',
      password: 'testpassword',
      email: 'testuser@example.com',
      firstName: 'Test',
      lastName: 'User',
      role: 'user',
      active: true,
    };

    try {
      const user = new User(userData);
      const savedUser = await user.save();

      assert.strictEqual(savedUser.username, 'testuser');
      assert.strictEqual(savedUser.email, 'testuser@example.com');
      assert.strictEqual(savedUser.firstName, 'Test');
      assert.strictEqual(savedUser.lastName, 'User');
      assert.strictEqual(savedUser.role, 'user');
      assert.strictEqual(savedUser.active, true);
    } catch (error) {
      console.error('Error in creating valid user:', error);
      throw error;
    }
  });

  it('should not create a user with invalid email', async () => {
    const userData = {
      username: 'invalidemailuser',
      password: 'testpassword',
      email: 'invalid-email',
      firstName: 'Test',
      lastName: 'User',
      role: 'user',
      active: true,
    };

    try {
      const user = new User(userData);
      await user.save();
    } catch (err) {
      assert.strictEqual(err.errors.email.kind, 'user defined');
    }
  });

  it('should not create a user without required fields', async () => {
    const userData = {
      username: 'missingfieldsuser',
      // Missing password, email, firstName, lastName
    };

    try {
      const user = new User(userData);
      await user.save();
    } catch (err) {
      assert.strictEqual(err.errors.password.kind, 'required');
      assert.strictEqual(err.errors.email.kind, 'required');
      assert.strictEqual(err.errors.firstName.kind, 'required');
      assert.strictEqual(err.errors.lastName.kind, 'required');
    }
  });

  after(async () => {
    try {
      await mongoose.connection.close();
      console.log('Closed MongoDB connection');
    } catch (error) {
      console.error('Error in after hook:', error);
      throw error;
    }
  });
});
