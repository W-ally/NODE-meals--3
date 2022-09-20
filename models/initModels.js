// Models
const { User } = require('./user.model');
const { Order } = require('./orders.model');
const { Restaurant } = require('./restaurant.model');
const { Meal } = require('./meals.model');
const { Review } = require('./reviews.model');

const initModels = () => {
	// 1 Restaurant <----> M Review
Restaurant.hasMany(Review, { foreignKey: 'restaurantId' });
Review.belongsTo(Restaurant);

// 1 Restaurant <----> M Meal
Restaurant.hasMany(Meal, { foreignKey: 'restaurantId' });
Meal.belongsTo(Restaurant);

// 1 User <----> M Review
User.hasMany(Review, { foreignKey: 'userId' });
Review.belongsTo(User);

// 1 User <----> M Order
User.hasMany(Order, { foreignKey: 'userId' });
Order.belongsTo(User);

// 1 Order <----> 1 Meal
Meal.hasOne(Order, { foreignKey: { name: 'mealId' } });
Order.belongsTo(Meal);
};

module.exports = { initModels };
