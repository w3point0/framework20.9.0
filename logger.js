const winston = require('winston');

class logger {
  constructor() {

    this.logger = winston.createLogger({
      level: 'info',
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
      ),
      transports: [
        new winston.transports.Console(),
        // Add other transports such as File if needed
        // new winston.transports.File({ filename: 'logfile.log' })
      ],
    });
  }

  log(level, message) {
    this.logger.log({ level, message });
  }

  info(message) {
    this.log('info', message);
  }

  warn(message) {
    this.log('warn', message);
  }

  error(message) {
    this.log('error', message);
  }
}

module.exports = logger;