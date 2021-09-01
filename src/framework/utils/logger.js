const winston = require('winston');
const { timestamp, combine, printf } = winston.format;

const myFormat = printf(({ level, message, timestamp }) => {
  return `[${level}] ${timestamp} : ${message}`;
})

class Logger {
  constructor(){
    this.logger = winston.createLogger({
      transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: 'logs/log.log' })
      ],
      format: combine(
        timestamp({ format: 'HH:mm:ss'}),
        myFormat
      )
    });
  }

  logInfo(message){
    return this.logger.info(message);
  }

  logError(message){
    return this.logger.error(message);
  }
}

module.exports = new Logger();