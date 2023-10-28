const roomController = require("../controllers/RoomController.js")

module.exports = (app) => {
    app.route("/rooms")
        .get(roomController.getAll)           // Read All
        .post(roomController.createNew)       // Create
    app.route("/rooms/:RoomNumber")
        .get(roomController.getByRoomNumber)  // Read
        .put(roomController.editByRoomNumber) // Update
        .delete(roomController.deleteByRoomNumber); // Delete
};