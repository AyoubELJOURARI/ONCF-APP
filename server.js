const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

const app = require('./app');

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log('DB Connection successful!');
  });
console.log(process.env.NODE_ENV);

const port = process.env.PORT || 2000;
const server = app.listen(port, () => {
  console.log(`APP running on port ${port}`);
});

process.on('SIGTERM', () => {
  console.log('SIGTERM Received, Shutting down gracefully');
  server.close(() => {
    console.log('Process Terminated!');
  });
});
