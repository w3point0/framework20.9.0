// file: test/functionTests.mjs

import { describe, it, beforeEach } from 'node:test';
import assert from 'assert';
import { function1, function2, function3, function4, errorHandler } from '../functions.mjs'; // Adjust the path as necessary

// Mock logger
const logger = {
  info: (msg) => console.log('INFO:', msg),
  error: (msg) => console.log('ERROR:', msg)
};

// Test suite for the functions
describe('Function Tests', () => {
  let payload;

  beforeEach(() => {
    payload = {}; // Reset payload before each test
  });

  it('should modify payload in function1', () => {
    const result = function1(payload);
    assert.strictEqual(result.f1, 'f1');
  });

  it('should modify payload in function2', () => {
    const result = function2(payload);
    assert.strictEqual(result.f2, 'f2');
  });

  it('should modify payload in function3', () => {
    const result = function3(payload);
    assert.strictEqual(result.f3, 'f3');
  });

  it('should modify payload in function4', () => {
    const result = function4(payload);
    assert.strictEqual(result.f4, 'f4');
  });

  it('should handle error in errorHandler', () => {
    const err = new Error('Test error');
    const req = {};
    const res = {
      status: (code) => {
        assert.strictEqual(code, 499);
        return {
          send: (message) => {
            assert.strictEqual(message, 'Something broke!');
          }
        };
      }
    };
    const next = () => {};

    errorHandler(err, req, res, next);
  });
});
