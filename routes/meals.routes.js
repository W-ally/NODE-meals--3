const express = require('express');

// Controllers
const {

	getAllMeals,
	getAllIdMeals,
	createMeals,
	updateMeals,
	deleteMeals,
	
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

restaurantsRouter.get('/', getAllMeals);

restaurantsRouter.get('/:id', getAllIdMeals);

restaurantsRouter.use(protectSession);//session JWT

restaurantsRouter.post(
	'/:id', 
	createPostValidators, 
	createMeals);

restaurantsRouter.patch(
	'/:id',
	postExists, 
	protectPostsOwners, 
	updateMeals);

restaurantsRouter.delete(
	'/:id', 
	postExists, 
	protectPostsOwners, 
	deleteMeals);
;
module.exports = { restaurantsRouter };
