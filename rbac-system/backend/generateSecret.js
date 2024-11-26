// generateSecret.js
const crypto = require('crypto');

// Generate a 256-bit (32-byte) random JWT secret
const jwtSecret = crypto.randomBytes(32).toString('hex');

// Output the secret to the console
console.log("Generated JWT Secret:", jwtSecret);
