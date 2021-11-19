const app = require('./app');
const dotenv = require('dotenv');
const connectDatabase = require('./config/database');

// Handle Uncaught Exceptions
process.on('uncaughtException', err => {
  console.log(`ERROR: ${err.message}`);
  console.log('Shutting down the server due to Uncaught Rejection');
  process.exit(1);
});

// Setting config file
dotenv.config({ path: 'backend/config/config.env' });

// Connecting to database
connectDatabase();

const server = app.listen(process.env.PORT, () => {
  console.log(
    `Server started on PORT: ${process.env.PORT} in ${process.env.NODE_ENV} mode.`
  );
});

// Handle Unhandled Rejection
process.on('unhandledRejection', err => {
  console.log(`ERROR: ${err.message}`);
  console.log('Shutting down the server due to Unhandled Promise Rejection');
  server.close(() => {
    process.exit(1);
  });
});
