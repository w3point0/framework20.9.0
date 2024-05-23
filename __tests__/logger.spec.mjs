/* eslint-disable no-undef */
// logger.test.js
const winston = require('winston');
const Logger = require('../logger');

jest.mock('winston', () => {
  const mLog = { log: jest.fn(), info: jest.fn(), warn: jest.fn(), error: jest.fn() };
  const mCreateLogger = jest.fn(() => mLog);
  const mFormat = {
    combine: jest.fn((...args) => args),
    timestamp: jest.fn(() => 'timestamp'),
    json: jest.fn(() => 'json')
  };
  return {
    createLogger: mCreateLogger,
    transports: {
      Console: jest.fn(),
      File: jest.fn(),
    },
    format: mFormat,
  };
});

describe('Logger Tests', () => {
  let logger;
  let mockLogger;

  beforeEach(() => {
    jest.clearAllMocks(); // Clear all mocks before each test
    mockLogger = winston.createLogger();
  });

  it('should initialize winston logger with correct configuration', () => {
    const createLoggerSpy = jest.spyOn(winston, 'createLogger');
    new Logger(); // Create a new logger instance to trigger the spy
    expect(createLoggerSpy).toHaveBeenCalledWith(expect.objectContaining({
      level: 'info',
      format: expect.arrayContaining(['timestamp', 'json']),
      transports: expect.any(Array),
    }));
  });

  it('should log info message', () => {
    logger = new Logger();
    const message = 'info message';
    logger.info(message);
    expect(mockLogger.log).toHaveBeenCalledWith({ level: 'info', message });
  });

  it('should log warn message', () => {
    logger = new Logger();
    const message = 'warn message';
    logger.warn(message);
    expect(mockLogger.log).toHaveBeenCalledWith({ level: 'warn', message });
  });

  it('should log error message', () => {
    logger = new Logger();
    const message = 'error message';
    logger.error(message);
    expect(mockLogger.log).toHaveBeenCalledWith({ level: 'error', message });
  });

  it('should log with custom level', () => {
    logger = new Logger();
    const level = 'debug';
    const message = 'debug message';
    logger.log(level, message);
    expect(mockLogger.log).toHaveBeenCalledWith({ level, message });
  });
});
