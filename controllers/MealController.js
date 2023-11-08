const { db } = require("../db");
const meals = db.meals;

exports.createMeal = async (req, res) => {
    const { MealName, Price } = req.body;

    if (!MealName || typeof Price !== 'number') {
        return res.status(400).send({ error: "MealName and Price are required and Price must be a number" });
    }

    const mealExists = await meals.findOne({ where: { MealName } });
    if (mealExists) {
        return res.status(409).send({ error: "A meal with this name already exists" });
    }

    try {
        const newMeal = await meals.create({ MealName, Price });
        res.status(201)
           .location(`${req.protocol}://${req.get('host')}${req.originalUrl}/${newMeal.id}`)
           .json(newMeal);
    } catch (error) {
        res.status(500).send(error);
    }
};

exports.updateMealById = async (req, res) => {
    const { id } = req.params;
    const { MealName, Price } = req.body;

    const meal = await meals.findByPk(id);
    if (!meal) {
        return res.status(404).send({ error: "Meal not found" });
    }

    const updateFields = {};
    if (MealName != null) updateFields.MealName = MealName;
    if (Price !== undefined) updateFields.Price = Price;

    if (Object.keys(updateFields).length === 0) {
        return res.status(400).send({ error: "No valid fields provided for update" });
    }

    try {
        await meals.update(updateFields, {
            where: { id }
        });

        const updatedMeal = await meals.findByPk(id);
        res.status(200).json(updatedMeal);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};


exports.getAllMeals = async (req, res) => {
    const allMeals = await meals.findAll({
        attributes: ["id", "MealName", "Price"]
    });
    res.json(allMeals);
};
