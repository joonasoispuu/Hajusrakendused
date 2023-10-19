const { db } = require("../db");
const rooms = db.rooms;
const { getBaseurl } = require("./helpers");

// READ
exports.getAllRooms = async (req, res) => {
    const result = await rooms.findAll({ attributes: ["id", "GuestId", "RoomNumber", "CheckInDate", "CheckOutDate", "Status"] });
    res.json(result);
}

exports.getById = async (req, res) => {
    const foundRoom = await rooms.findByPk(req.params.id);
    if (foundRoom === null) {
        return res.status(404).send({ error: `Room not found` });
    }
    res.json(foundRoom);
}

// CREATE
exports.createNewRoom = async (req, res) => {
    if (!req.body.GuestId || !req.body.RoomNumber || !req.body.CheckInDate || !req.body.CheckOutDate || !req.body.Status) {
        return res.status(400).send({ error: "One or all required parameters are missing" });
    }
    const createdRoom = await rooms.create(req.body, {
        fields: ["GuestId", "RoomNumber", "CheckInDate", "CheckOutDate", "Status"]
    });
    res.status(201)
        .location(`${getBaseurl(req)}/rooms/${createdRoom.id}`)
        .json(createdRoom);
}

// UPDATE
exports.editById = async (req, res) => {
    const { id } = req.params;
    const updateData = req.body;

    if (!updateData.GuestId || !updateData.RoomNumber || !updateData.CheckInDate || !updateData.CheckOutDate || !updateData.Status) {
        return res.status(400).send({ error: "Failed to update the room" });
    }

    const [updateCount, updatedRooms] = await rooms.update(updateData, {
        where: { id },
        fields: ["GuestId", "RoomNumber", "CheckInDate", "CheckOutDate", "Status"],
        returning: true,
    });

    if (updateCount === 0) {
        return res.status(404).send({ error: "Room not found" });
    }

    res.status(200).send(updatedRooms[0]);
};

// DELETE
exports.deleteById = async (req, res) => {
    const deletedAmount = await rooms.destroy({
        where: { id: req.params.id }
    });
    if (deletedAmount === 0) {
        return res.status(404).send({ error: "No rooms by that Id were found" });
    }
    res.status(204).send();
}