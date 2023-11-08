const mealController = require("../controllers/MealController.js")

module.exports = (app) => {
    app.route("/meals")
        .get(mealController.getAllMeals)     // Read All
        .post(mealController.createMeal);    // Create
}
