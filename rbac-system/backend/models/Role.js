const mongoose = require('mongoose');

const roleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  permissions: {
    type: [String], // Array of permission names (e.g., 'read', 'write', 'delete')
    required: true,
  },
});

const Role = mongoose.model('Role', roleSchema);

module.exports = Role;
