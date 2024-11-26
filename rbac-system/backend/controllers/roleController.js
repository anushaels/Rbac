const Role = require('../models/Role');

// Get all roles
exports.getAllRoles = async (req, res) => {
  try {
    const roles = await Role.find();
    res.status(200).json(roles);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching roles' });
  }
};

// Add a new role
exports.addRole = async (req, res) => {
  try {
    const { name, permissions } = req.body;

    if (!name || !permissions) {
      return res.status(400).json({ message: 'Role name and permissions are required' });
    }

    const newRole = new Role({ name, permissions });
    await newRole.save();
    res.status(201).json({ message: 'Role created successfully', role: newRole });
  } catch (error) {
    res.status(500).json({ message: 'Error creating role' });
  }
};

// Update role
exports.updateRole = async (req, res) => {
  try {
    const { roleId } = req.params;
    const { name, permissions } = req.body;

    const updatedRole = await Role.findByIdAndUpdate(
      roleId,
      { name, permissions },
      { new: true }
    );
    if (!updatedRole) return res.status(404).json({ message: 'Role not found' });
    res.status(200).json({ message: 'Role updated successfully', role: updatedRole });
  } catch (error) {
    res.status(500).json({ message: 'Error updating role' });
  }
};

// Delete a role
exports.deleteRole = async (req, res) => {
  try {
    const { roleId } = req.params;
    const deletedRole = await Role.findByIdAndDelete(roleId);
    if (!deletedRole) return res.status(404).json({ message: 'Role not found' });
    res.status(200).json({ message: 'Role deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting role' });
  }
};
