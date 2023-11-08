const { db } = require("../db");
const mealOrders = db.mealOrders;

exports.getAllMealOrders = async (req, res) => {
    try {
        const allMealOrders = await mealOrders.findAll({
            attributes: ["id", "BookingID", "MealID", "OrderDate", "Status"]
        });
        res.json(allMealOrders);
    } catch (error) {
        res.status(500).send(error);
    }
};