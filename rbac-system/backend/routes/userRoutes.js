const express = require('express');
const { getAllUsers, addUser, updateUser, deleteUser } = require('../controllers/userController');
const router = express.Router();

router.get('/', getAllUsers);
router.post('/', addUser);
router.put('/:userId', updateUser);
router.delete('/:userId', deleteUser);

module.exports = router;
