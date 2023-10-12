let data = [
    {id: 1, GuestId: "1", RoomNumber: "40", CheckInDate: "December 17, 2023 08:24:00", CheckOutDate: "December 20, 2023 08:24:00", Status:"Occupied"},
    {id: 2, GuestId: "3", RoomNumber: "41", CheckInDate: "December 19, 2023 06:24:00", CheckOutDate: "December 20, 2023 08:24:00", Status:"Occupied"},
    {id: 3, GuestId: "4", RoomNumber: "42", CheckInDate: "December 16, 2023 01:25:00", CheckOutDate: "December 21, 2023 08:24:00", Status:"Occupied"},
    {id: 4, GuestId: "5", RoomNumber: "43", CheckInDate: "December 15, 2023 12:24:00", CheckOutDate: "December 22, 2023 08:24:00", Status:"Occupied"},
];

exports.getAll = () => {
    return data.map(g => { return { "id": g.id, "GuestId": g.GuestId, "RoomNumber": g.RoomNumber, "CheckInDate": g.CheckInDate, "CheckOutDate": g.CheckOutDate, "Status": g.Status } });
}

exports.getById = (id) => {
    return data.find(room => room.id == parseInt(id));
}

exports.delete = (id) => {
    const index = data.findIndex(room => room.id == parseInt(id));
    if (index !== -1) {
        data.splice(index, 1);
        return true;
    }
    return false;
}