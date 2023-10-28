module.exports = (dbConnection, Sequelize) => {
    const Booking = dbConnection.define("Booking", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        GuestId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: 'Guests',
                key: 'id'
            }
        },
        RoomNumber: {
            type: Sequelize.STRING,
            allowNull: false,
            references: {
                model: 'Rooms',
                key: 'RoomNumber'
            }
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

    return Booking;
};
