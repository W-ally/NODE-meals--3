// Models
const { Restaurant } = require('../models/restaurant.model');

// Utils
const { AppError } = require('../utils/appError.util');
const { catchAsync } = require('../utils/catchAsync.util');

const restaurantExists = catchAsync(async (req, res, next) => {
  const { restaurantId, id } = req.params;

  const restaurant = await Restaurant.findOne({
    where: { id: restaurantId || id, status: 'active' },
  });

  if (!restaurant) {
    return next(new AppError('Restaurant not found', 404));
  }

  req.restaurant = restaurant;
  next();
});

module.exports = { restaurantExists };