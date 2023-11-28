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

const seedGuests = async () => {
    const guestsToSeed = [
        { FirstName: "Pablo", LastName: "Gonzales", PhoneNumber: 1234567890, EmailAddress: "Pablo.Gonzales@gmail.com" },
        { FirstName: "Bob", LastName: "Boberson", PhoneNumber: 1234567891, EmailAddress: "Bob.Boberson@gmail.com" }
    ];

    for (const guestData of guestsToSeed) {
        await db.guests.findOrCreate({
            where: { EmailAddress: guestData.EmailAddress },
            defaults: guestData
        });
    }
};

const sync = async () => {
    try {
        console.log('DROP_DB value:', process.env.DROP_DB);
        if (process.env.DROP_DB === 'true') {
            console.log("Begin DROP")
            await db.connection.query('SET FOREIGN_KEY_CHECKS = 0')
            console.log("Checks disabled")
            await db.connection.sync({ force: true })
            console.log('Database synchronised.');
            await db.connection.query('SET FOREIGN_KEY_CHECKS = 1')
            console.log("Checks enabled")
        } else {
            await db.connection.sync({ alter: true })
            seedGuests();
            console.log('Database structure updated.');
        }
    } catch (error) {
        console.error('Error during database sync or seeding:', error);
    }    
}

module.exports = { db, sync };