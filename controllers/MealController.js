const { db } = require("../db");
const meals = db.meals;

exports.createMeal = async (req, res) => {
    if (!req.body.MealName || typeof req.body.Price !== 'number') {
        return res.status(400).send({ error: "Missing or invalid required meal details" });
    }

    try {
        const newMeal = await meals.create({
            MealName: req.body.MealName,
            Price: req.body.Price
        });
        res.status(201).json(newMeal);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};


exports.getAllMeals = async (req, res) => {
    const allMeals = await meals.findAll({
        attributes: ["MealID", "MealName", "Price"]
    });
    res.json(allMeals);
}