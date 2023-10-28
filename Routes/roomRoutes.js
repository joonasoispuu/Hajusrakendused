const roomController = require("../controllers/RoomController.js")

module.exports = (app) => {
    app.route("/rooms")
        .get(roomController.getAll)           // Read All
        .post(roomController.createNew)       // Create
}