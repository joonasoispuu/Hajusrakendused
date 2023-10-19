const RoomBookingsController = require("../controllers/RoomBookingsController.js");

module.exports = (app) => {
    app.route("/bookings")
        .get(RoomBookingsController.getAllRooms)     // Read All
        .post(RoomBookingsController.createNewRoom);  // Create
    app.route("/bookings/:id")
        .get(RoomBookingsController.getById)         // Read
        .put(RoomBookingsController.editById)        // Update
        .delete(RoomBookingsController.deleteById)   // Delete
}