const { Sequelize } = require("sequelize");
const sequelize = new Sequelize(process.env.DATABASE, process.env.DB_USER, process.env.DB_PASS, {
    host: process.env.DB_HOST,
    dialect: "mariadb",
    define: {
        timestamps: true
    },
    logging: console.log
});

try {
    sequelize.authenticate().then(() => {
        console.log('Connection has been established successfully.');
    });
} catch (error) {
    console.error('Unable to connect to the database:', error);
}

const db = {};
db.sequelize = Sequelize;
db.connection = sequelize;

db.guests = require("./models/Guest")(sequelize, Sequelize);
db.rooms = require("./models/Room")(sequelize, Sequelize);
db.bookings = require("./models/RoomBookings")(sequelize, Sequelize);
db.meals = require("./models/Meal")(sequelize, Sequelize);
db.mealOrders = require("./models/MealOrder")(sequelize, Sequelize);

db.guests.hasMany(db.bookings, { foreignKey: 'GuestId' });
db.rooms.hasMany(db.bookings, { foreignKey: 'RoomNumber' });
db.bookings.belongsTo(db.guests, { foreignKey: 'GuestId' });
db.bookings.belongsTo(db.rooms, { foreignKey: 'RoomNumber' });
db.bookings.hasMany(db.mealOrders, { foreignKey: 'BookingID' });
db.mealOrders.belongsTo(db.bookings, { foreignKey: 'BookingID' });

const sync = async () => {
    if (process.env.DROP_DB) {
        console.log("Begin DROP")
        await db.connection.query('SET FOREIGN_KEY_CHECKS = 0')
        console.log("Checks disabled")
        await db.connection.sync({ force: true })
        console.log('Database synchronised.');
        await db.connection.query('SET FOREIGN_KEY_CHECKS = 1')
        console.log("Checks enabled")
    
        const [guest, created] = await db.guests.findOrCreate({
            where: {
                EmailAddress: "Bob.Boberson@gmail.com"
            },
            defaults: {
                FirstName: "Bob",
                LastName: "Boberson",
                PhoneNumber: 1234567890,
                EmailAddress: "Bob.Boberson@gmail.com"
            }
        })
        console.log("guest created: ", created)
    }
    else {
        await db.connection.sync({ alter: true }) // Alter existing to match the model
    }    
}

module.exports = { db, sync };