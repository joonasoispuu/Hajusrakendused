const { db } = require("../db");
const rooms = db.rooms;
const { getBaseurl } = require("./helpers");

// READ
exports.getAllRooms = async (req, res) => {
    const result = await rooms.findAll({ attributes: ["id", "GuestId", "RoomNumber", "CheckInDate", "CheckOutDate", "Status"] });
    res.json(result);
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
