import { createLogger, format, transports } from "winston"; // this is the winston logger library we are using where and createLogger, format, transports are the methods we are using from the winston library
// We are using the createLogger method from the winston library to create a logger instance. The createLogger method takes an object as an argument where we can specify the level of logging, format of the logs, and the transport mechanism for the logs.
// We are using the transports method from the winston library to specify the transport mechanism for the logs. The transports method has a Console method which is used to log the logs to the console. The transports method has a File method which is used to log the logs to a file.
// We are using the format method from the winston library to specify the format of the logs. The format method has a combine method which is used to combine multiple formats. The format method has a timestamp method which is used to add a timestamp to the logs. The format method has a json method which is used to format the logs as JSON. The format method has a colorize method which is used to add colors to the logs.


const { combine, timestamp, json, colorize } = format;  // this is the format method we are using from the winston library where combine, timestamp, json, colorize are the methods we are using from the format method

// Custom format for console logging with colors
const consoleLogFormat = format.combine( 
  format.colorize(), 
  format.printf(({ level, message, timestamp }) => {  
    return `${level}: ${message}`; 
  })
);

// Create a Winston logger
const logger = createLogger({ 
  level: "info", 
  format: combine(colorize(), timestamp(), json()), 
  transports: [  
    new transports.Console({ 
      format: consoleLogFormat,
    }),
    new transports.File({ filename: "app.log" }), 
  ],
});

export default logger;