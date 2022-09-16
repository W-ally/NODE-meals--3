const express = require('express');

// Controllers
const {
	getAllUsers,
	createUser,
	updateUser,
	deleteUser,
	login,
	getAllOrdersUsers,
	getAllOrdersUsersId,

} = require('../controllers/users.controller');

// Middlewares
const { userExists } = require('../middlewares/users.middlewares');
const {
	protectSession,
	protectUsersAccount,
	protectAdmin,
} = require('../middlewares/auth.middlewares');
const {
	createUserValidators,
} = require('../middlewares/validators.middlewares');

const usersRouter = express.Router();

usersRouter.post('/signup', createUserValidators, createUser);

usersRouter.post('/login', login);

// Protecting below endpoints
usersRouter.use(protectSession);

usersRouter.patch(
	'/:id', 
	userExists,
	protectUsersAccount,
	updateUser);

usersRouter.delete(
	'/:id',
	 userExists,
	 protectUsersAccount,
	 deleteUser);

usersRouter.get(
	'/orders',
	 protectAdmin, 
	 getAllOrdersUsers);

usersRouter.get(
	'/orders/:id', 
	protectAdmin,  
	getAllOrdersUsersId);

module.exports = { usersRouter };
