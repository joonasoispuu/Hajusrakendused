app.get("/rooms", (req, res) => {
    res.send(rooms.getAll());
})

app.delete("/rooms/:id", (req, res) => {
    const isDeleted = guests.delete(req.params.id);
    if (!isDeleted) {
        return res.status(404).send({error: "Room not found"});
    }
    res.status(200).send({message: "Successfully deleted the room"});
});