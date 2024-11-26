const express = require('express');
const { getAllRoles, addRole, updateRole, deleteRole } = require('../controllers/roleController');
const router = express.Router();

router.get('/', getAllRoles);
router.post('/', addRole);
router.put('/:roleId', updateRole);
router.delete('/:roleId', deleteRole);

module.exports = router;
