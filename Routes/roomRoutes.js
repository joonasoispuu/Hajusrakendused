const roomController = require("../controllers/RoomsController.js");

module.exports = (app) => {
    app.route("/rooms")
        .get(roomController.getAllRooms)     // Read
        .post(roomController.createNewRoom);  // Create
}