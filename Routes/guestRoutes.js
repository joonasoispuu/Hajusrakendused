const guestController = require("../controllers/GuestsController.js")
module.exports = (app) => {
    app.route("/guests")
        .get(guestController.getAll)
        .post(guestController.createNew)      // Create
    app.route("/guests/:id")
        .get(guestController.getById)         // Read
        .put(guestController.editById)        // Update
        .delete(guestController.deleteById)   // Delete
}