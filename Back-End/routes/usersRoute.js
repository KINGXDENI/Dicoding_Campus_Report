const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');

router.post('/login', UserController.login);
router.post('/register', UserController.register);
router.get('/users/:userId', UserController.getUser);
router.post('/users', UserController.createUser);
router.get('/users', UserController.getUsers);
router.put('/users/:id', UserController.updateUser);
router.delete('/users/:id', UserController.deleteUser);

module.exports = router;
