const mealOrderController = require("../controllers/MealOrderController.js");

module.exports = (app) => {
    app.route("/mealOrders")
        .get(mealOrderController.getAllMealOrders)  // Read All
        .post(mealOrderController.createMealOrder)  // Create
    app.route("/mealOrders/:id")
        .get(mealOrderController.getMealOrderById)  // Read
};
