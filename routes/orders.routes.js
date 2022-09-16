const express = require('express');

// Controllers
const {

	createOrders,
    getAllOrders,
    updateOrders,
    deleteOrders,
	
} = require('../controllers/posts.controller');

// Middlewares
const { postExists } = require('../middlewares/posts.middlewares');
const {
	protectSession,
	protectPostsOwners,
} = require('../middlewares/auth.middlewares');
const {
	createPostValidators,
} = require('../middlewares/validators.middlewares');

const restaurantsRouter = express.Router();

restaurantsRouter.use(protectSession);//session JWT

restaurantsRouter.post(
	'/', 
	createPostValidators, 
	createOrders);

restaurantsRouter.get('/me', getAllOrders);

restaurantsRouter.patch(
	'/:id',
	postExists, 
	protectPostsOwners, 
	updateOrders);

restaurantsRouter.delete(
	'/:id', 
	postExists, 
	protectPostsOwners, 
	deleteOrders);
;
module.exports = { restaurantsRouter };
