'use strict';

require('dotenv').config();

const mongoose = require('mongoose');

const URI = process.env.MONGODB_CONNECTION_STRING;

// We subscribe to an event with .on();
mongoose.connection.on('error', (err) => {
  console.log('Database connection error', err);
  process.exit(1);
});

mongoose.connection.once('open', () => {
  console.log(
    'The application',
    mongoose.connection.name.toUpperCase(),
    "it's now connected to a DATABASE (MongoDB)!"
  );
});

mongoose.connect(URI, {});

module.exports = mongoose.connection;
