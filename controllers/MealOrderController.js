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

// UPDATE
exports.updateMealOrderStatusById = async (req, res) => {
  const { id } = req.params;
  const { Status } = req.body;

  if (!Status) {
      return res.status(400).send({ error: "Status update is required" });
  }

  const [updateCount] = await mealOrders.update({ Status }, {
      where: { id },
      fields: ["Status"],
      returning: true,
  });

  if (updateCount === 0) {
      return res.status(404).send({ error: "Meal order not found" });
  }

  res.status(200).send({ message: "Meal order status updated successfully" });
};

// DELETE
exports.deleteMealOrderById = async (req, res) => {
  const { id } = req.params;

  const mealOrder = await mealOrders.findByPk(id);
  if (!mealOrder) {
    return res.status(404).send({ error: "No meal order found with that ID" });
  }

  if (mealOrder.Status === "Delivered") {
    return res.status(400).send({ error: "Cannot cancel a delivered order" });
  }

  const deletedAmount = await mealOrders.destroy({
    where: { id }
  });

  if (deletedAmount === 0) {
    return res.status(404).send({ error: "No meal order found with that ID" });
  }

  res.status(204).send();
};