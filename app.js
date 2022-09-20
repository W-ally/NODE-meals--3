const express = require('express');

// Routers
const { usersRouter } = require('./routes/users.routes');
const { mealsRouter } = require('./routes/meals.routes');
const { ordersRouter } = require('./routes/orders.routes');
const { restaurantsRouter } = require('./routes/restaurants.routes');

// Controllers
const { globalErrorHandler } = require('./controllers/error.controller');
// Init our Express app
const app = express();

// Enable Express app to receive JSON data
app.use(express.json());

// Define endpoints
// /posts
// Define endpoints
app.use('/api/v1/users', usersRouter);
app.use('/api/v1/orders', ordersRouter);
app.use('/api/v1/meals', mealsRouter);
app.use('/api/v1/restaurants', restaurantsRouter);

// Global error handler
app.use(globalErrorHandler);

// Catch non-existing endpoints
app.all('*', (req, res) => {
	res.status(404).json({
		status: 'error',
		message: `${req.method} ${req.url} does not exists in our server`,
	});
});

module.exports = { app };
