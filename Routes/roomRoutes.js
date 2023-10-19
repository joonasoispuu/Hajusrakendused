const roomController = require("../controllers/RoomsController.js");

module.exports = (app) => {
    app.route("/rooms")
        .get(roomController.getAllRooms)     // Read All
        .post(roomController.createNewRoom);  // Create
    app.route("/rooms/:id")
        .get(roomController.getById)         // Read
        .put(roomController.editById)        // Update
        .delete(roomController.deleteById)   // Delete
}