module.exports = (dbConnection, Sequelize) => {
    const MealOrder = dbConnection.define("MealOrder", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        BookingID: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: 'Bookings',
                key: 'id'
            }
        },
        MealID: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: 'Meals',
                key: 'id'
            }
        },
        OrderDate: {
            type: Sequelize.DATE,
            allowNull: false
        },
        Status: {
            type: Sequelize.STRING,
            allowNull: false
        }
    });
    return MealOrder;
};