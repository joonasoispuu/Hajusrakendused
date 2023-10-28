const { db } = require("../db");
const rooms = db.rooms;
const { getBaseurl } = require("./helpers");

exports.createNew = async (req, res) => {
    if (!req.body.RoomNumber || !req.body.DailyCost || !req.body.Status) {
        return res.status(400).send({ error: "One or all required parameters are missing" });
    }

    const existingRoom = await rooms.findOne({ where: { RoomNumber: req.body.RoomNumber } });
    if (existingRoom) {
        return res.status(409).send({ error: "There is already a Room with that number" });
    }

    try {
        const createdRoom = await rooms.create(req.body, {
            fields: ["RoomNumber", "DailyCost", "Status"]
        });
        res.status(201)
            .location(`${getBaseurl(req)}/rooms/${createdRoom.id}`)
            .json(createdRoom);
    } catch (error) {
        res.status(500).send({ error: error.message || "Some error occurred while creating the Room." });
    }
};

exports.getAll = async (req, res) => {
    try {
        const result = await rooms.findAll({ attributes: ["id", "RoomNumber", "DailyCost", "Status"] });
        res.json(result);
    } catch (error) {
        res.status(500).send({ error: error.message || "Some error occurred while retrieving rooms." });
    }
};

exports.getByRoomNumber = async (req, res) => {
    const RoomNumber = req.params.RoomNumber;

    try {
        const foundRoom = await rooms.findOne({ where: { RoomNumber } });
        if (!foundRoom) {
            return res.status(404).send({ error: `Room was not found by that room number` });
        }
        res.json(foundRoom);
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'An error occurred while retrieving room data' });
    }
};
