const { db } = require("../db");
const { mealOrders, bookings, meals } = db;


//Create
exports.createMealOrder = async (req, res) => {
  const { BookingID, MealID, Status } = req.body;

  if (!BookingID || !MealID || !Status) {
    return res.status(400).send({ error: "All fields (BookingID, MealID, Status) are required." });
  }

  const bookingExists = await bookings.findByPk(BookingID);
  if (!bookingExists) {
    return res.status(404).send({ error: "Booking not found." });
  }

  const mealExists = await meals.findByPk(MealID);
  if (!mealExists) {
    return res.status(404).send({ error: "Meal not found." });
  }

  try {
    const orderDate = new Date();

    const newMealOrder = await mealOrders.create({
      BookingID,
      MealID,
      OrderDate: orderDate,
      Status
    });

    res.status(201).location(`${req.protocol}://${req.get('host')}${req.originalUrl}/${newMealOrder.OrderID}`)
       .send(newMealOrder);
  } catch (error) {
    res.status(500).send({ error: "Server error while creating meal order." });
  }
};


//Read All
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

//Read by Id
exports.getMealOrderById = async (req, res) => {
  const foundMealOrder = await mealOrders.findByPk(req.params.id);

  if (!foundMealOrder) {
      return res.status(404).send({ error: `Meal Order not found` });
  }

  res.json(foundMealOrder);
};
