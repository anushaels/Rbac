const Role = require('../models/Role');

const rbacMiddleware = (requiredPermissions) => async (req, res, next) => {
  try {
    // Assuming req.session.user.role contains the role ID of the user
    const role = await Role.findById(req.session.user.role);
    if (!role) return res.status(404).json({ message: 'Role not found' });

    // Check if the user has all required permissions
    const hasPermission = requiredPermissions.every((permission) =>
      role.permissions.includes(permission)
    );

    if (!hasPermission) {
      return res.status(403).json({ message: 'Permission Denied' });
    }

    // If permissions check passes, continue to the next middleware or route handler
    next();
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = rbacMiddleware;
