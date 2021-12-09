'use strict';

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// TODO: Have I create a table user in MongoDB?

// Create schema
const userSchema = mongoose.Schema({
  email: { type: String, unique: true },
  password: String,
});

// Encrypt password
userSchema.statics.hashPassword = function (passwordNonCrypt) {
  return bcrypt.hash(passwordNonCrypt, 7);
};

// Check password comparing hash
userSchema.methods.comparePassword = function (passwordNonCrypt) {
  return bcrypt.compare(passwordNonCrypt, this.password);
};

// Create model
const User = mongoose.model('User', userSchema);

// Export the model
module.exports = User;
