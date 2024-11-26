const User = require('../models/User');
const Role = require('../models/Role');
const bcrypt = require('bcrypt');


// Get all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().populate('role');
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users' });
  }
};

// Add a new user
exports.addUser = async (req, res) => {
    try {
      const { username, password, email, role, isActive } = req.body;
  
      // Validate input
      if (!username || !password || !email || !role) {
        return res.status(400).json({ message: 'Username, password, email, and role are required' });
      }
  
      const roleExists = await Role.findById(role);
      if (!roleExists) {
        return res.status(400).json({ message: 'Role does not exist' });
      }
  
      // Check if email already exists in the database
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: 'Email already exists' });
      }
  
      // Hash the password before saving it
      const hashedPassword = await bcrypt.hash(password, 10);
  
      const newUser = new User({
        username,
        password: hashedPassword, // Save the hashed password
        email,
        role,
        isActive: isActive || true,  // Default to true if isActive is not provided
      });
  
      await newUser.save();
      res.status(201).json({ message: 'User created successfully', user: newUser });
    } catch (error) {
      console.error('Error creating user:', error);
      res.status(500).json({ message: 'Error creating user', error: error.message });
    }
  };
  
  

// Update user role or status
exports.updateUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const { role, isActive } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { role, isActive },
      { new: true }
    );
    if (!updatedUser) return res.status(404).json({ message: 'User not found' });
    res.status(200).json({ message: 'User updated successfully', user: updatedUser });
  } catch (error) {
    res.status(500).json({ message: 'Error updating user' });
  }
};

// Delete a user
exports.deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const deletedUser = await User.findByIdAndDelete(userId);
    if (!deletedUser) return res.status(404).json({ message: 'User not found' });
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting user' });
  }
};
