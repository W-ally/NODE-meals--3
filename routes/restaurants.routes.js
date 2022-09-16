const express = require('express');

// Controllers
const {

	getAllRestaurants,
    getAllIdRestaurants,
	createRestaurant,
	updateRestaurant,
	deleteRestaurant,
	reviewRestaurant,
	deleteRestaurant,
	reviewRestaurant,
	deleteReviewRestaurant,
	
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

restaurantsRouter.get('/', getAllRestaurants);

restaurantsRouter.get('/:id', getAllIdRestaurants);

restaurantsRouter.use(protectSession);//session JWT


restaurantsRouter.post('/', createPostValidators, createRestaurant);

restaurantsRouter.patch(
	'/:id',
	postExists, 
	protectPostsOwners, 
	updateRestaurant);

restaurantsRouter.delete(
	'/:id', 
	postExists, 
	protectPostsOwners, 
	deleteRestaurant);

restaurantsRouter.post(
	'/reviews/:restaurantId',
	 createPostValidators,
	  reviewRestaurant);

restaurantsRouter.delete(
	'/reviews/:id',
	 postExists,
	 protectPostsOwners, 
	 deleteReviewRestaurant);


module.exports = { restaurantsRouter };
