module.exports = (dbConnection, Sequelize) => {
    const Meal = dbConnection.define("Meal", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        MealName: {
            type: Sequelize.STRING,
            allowNull: false
        },
        Price: {
            type: Sequelize.FLOAT,
            allowNull: false
        }
    });

    return Meal;
};