const { db } = require("../db");
const guests = db.guests;
const { getBaseurl } = require("./helpers");

// CREATE
exports.createNew = async (req, res) => {
    if (!req.body.FirstName || !req.body.LastName || !req.body.PhoneNumber || !req.body.EmailAddress) {
        return res.status(400).send({ error: "One or all required parameters are missing" });
    }
    const createdGuest = await guests.create(req.body, {
        fields: ["FirstName", "LastName", "PhoneNumber", "EmailAddress"]
    });
    res.status(201)
        .location(`${getBaseurl(req)}/guests/${createdGuest.id}`)
        .json(createdGuest);
}

// READ
exports.getAll = async (req, res) => {
    const result = await guests.findAll({ attributes: ["id", "FirstName", "LastName", "PhoneNumber", "EmailAddress"] });
    res.json(result);
}

exports.getById = async (req, res) => {
    const foundGuest = await guests.findByPk(req.params.id);
    if (foundGuest === null) {
        return res.status(404).send({ error: `Guest not found` });
    }
    res.json(foundGuest);
}

// UPDATE
exports.editById = async (req, res) => {
    const { id } = req.params;
    const updateData = req.body;

    if (!updateData.FirstName || !updateData.LastName || !updateData.PhoneNumber || !updateData.EmailAddress) {
        return res.status(400).send({ error: "Failed to update the booking" });
    }

    const [updateCount, updatedGuests] = await guests.update(updateData, {
        where: { id },
        fields: ["FirstName", "LastName", "PhoneNumber", "EmailAddress"],
        returning: true,
    });

    if (updateCount === 0) {
        return res.status(404).send({ error: "Guest not found" });
    }

    res.status(200).send(updatedGuests[0]);
};

// DELETE
exports.deleteById = async (req, res) => {
    const deletedAmount = await guests.destroy({
        where: { id: req.params.id }
    });
    if (deletedAmount === 0) {
        return res.status(404).send({ error: "Guest not found" });
    }
    res.status(204).send();
}
