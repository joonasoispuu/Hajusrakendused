const { db } = require("../db");
const bookings = db.bookings;
const rooms = db.rooms;
const guests = db.guests;
const { getBaseurl } = require("./helpers");

// READ
exports.getAllRooms = async (req, res) => {
    const result = await bookings.findAll({ attributes: ["id", "GuestId", "RoomNumber", "CheckInDate", "CheckOutDate", "Status"] });
    res.json(result);
}

exports.getById = async (req, res) => {
    const foundRoom = await bookings.findByPk(req.params.id);
    if (foundRoom === null) {
        return res.status(404).send({ error: `Booking not found` });
    }
    res.json(foundRoom);
}

// CREATE
exports.createNewRoom = async (req, res) => {
    const { GuestId, RoomNumber, CheckInDate, CheckOutDate, Status } = req.body;
    if (!GuestId || !RoomNumber || !CheckInDate || !CheckOutDate || !Status) {
        return res.status(400).send({ error: "One or all required parameters are missing" });
    }

    const roomExists = await rooms.findOne({ where: { RoomNumber } });
    if (!roomExists) {
        return res.status(409).send({ error: "RoomNumber does not exist" });
    }

    const guestExists = await guests.findByPk(GuestId);
    if (!guestExists) {
        return res.status(409).send({ error: "GuestId does not exist" });
    }

    try {
        const createdRoom = await bookings.create({ GuestId, RoomNumber, CheckInDate, CheckOutDate, Status }, {
            fields: ["GuestId", "RoomNumber", "CheckInDate", "CheckOutDate", "Status"]
        });
        res.status(201)
            .location(`${getBaseurl(req)}/bookings/${createdRoom.id}`)
            .json(createdRoom);
    } catch (error) {
        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(409).send({ error: 'There is already a booking with that RoomNumber' });
        }
        return res.status(500).send(error);
    }
};

// UPDATE
exports.editById = async (req, res) => {
    const { id } = req.params;
    const updateData = req.body;

    if (!updateData.GuestId || !updateData.RoomNumber || !updateData.CheckInDate || !updateData.CheckOutDate || !updateData.Status) {
        return res.status(400).send({ error: "Failed to update the booking" });
    }

    const [updateCount, updatedRooms] = await bookings.update(updateData, {
        where: { id },
        fields: ["GuestId", "RoomNumber", "CheckInDate", "CheckOutDate", "Status"],
        returning: true,
    });

    if (updateCount === 0) {
        return res.status(404).send({ error: "booking not found" });
    }

    res.status(200).send(updatedRooms[0]);
};

// DELETE
exports.deleteById = async (req, res) => {
    const deletedAmount = await bookings.destroy({
        where: { id: req.params.id }
    });
    if (deletedAmount === 0) {
        return res.status(404).send({ error: "No bookings by that Id were found" });
    }
    res.status(204).send();
}