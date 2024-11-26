const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'], // Add this validation if email is mandatory
      unique: true,
    },
    role: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Role',
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  });
  

const User = mongoose.model('User', userSchema);

module.exports = User;
