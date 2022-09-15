// Models
const { User } = require('./user.model');
const { Orders } = require('./orders.model');
const { Restaurant } = require('./restaurant.model');
const { Meals } = require('./meals.model');
const { Reviews } = require('./reviews.model');

const initModels = () => {
	// 1 User <----> M Orders
	User.hasMany(Orders, { foreignKey: 'userId' });
	Orders.belongsTo(User);

	// 1 User <----> M Reviews
	User.hasMany(Reviews, { foreignKey: 'userId' });
	Reviews.belongsTo(User);

	// 1 Restaurant <----> M Reviews
	Restaurant.hasMany(Reviews, { foreignKey: 'restaurantId' });
	Reviews.belongsTo(Restaurant);

	// 1 Restaurant <----> M Meals
	Restaurant.hasMany(Meals, { foreignKey: 'restaurantId' });
	Meals.belongsTo(Restaurant);

	// 1 Meals <----> 1 Orders
	Meals.hasOne(Orders, { foreignKey: 'mealId' });
	Orders.belongsTo(Meals);
};

module.exports = { initModels };
