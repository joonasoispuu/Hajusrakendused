const mealOrderController = require("../controllers/MealOrderController.js");

module.exports = (app) => {
    app.route("/mealOrders")
        .get(mealOrderController.getAllMealOrders); // Read All
};
