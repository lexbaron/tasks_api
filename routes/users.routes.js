const express = require('express');
const { getAllUsers, updateUser, deleteUser, createUser } = require('../controllers/users.controllers');
const { createUserValidators } = require('../middlewares/validators.middleware');
const { userExists } = require('../middlewares/users.middleware')

const usersRouter = express.Router();

usersRouter.get('/', getAllUsers );

usersRouter.post('/', createUserValidators, createUser );

usersRouter.patch('/:id', userExists, updateUser );

usersRouter.delete('/:id', userExists, deleteUser );

module.exports = { usersRouter };
