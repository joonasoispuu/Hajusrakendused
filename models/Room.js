module.exports = (dbConnection, Sequelize) => {
    const Room = dbConnection.define("Room", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        GuestId: {
            type: Sequelize.INTEGER,
            allowNull: true
        },
        RoomNumber: {
            type: Sequelize.STRING,
            allowNull: false
        },
        CheckInDate: {
            type: Sequelize.STRING,
            allowNull: true
        },
        CheckOutDate: {
            type: Sequelize.STRING,
            allowNull: true
        },
        Status: {
            type: Sequelize.STRING,
            allowNull: false
        }
    });

    return Room;
}
