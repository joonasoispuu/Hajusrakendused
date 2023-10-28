const  {Sequelize} = require("sequelize")
const sequelize = new Sequelize(process.env.DATABASE, process.env.DB_USER, process.env.DB_PASS,{
    host: process.env.DB_HOST,
    dialect: "mariadb",
    define: {
        timestamps: true
    },
    logging: console.log
})

try {
    sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.');
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
}
const db = {}
db.sequelize = Sequelize
db.connection = sequelize;
db.guests = require("./models/Guest")(sequelize, Sequelize);
db.rooms = require("./models/Room")(sequelize, Sequelize);
db.bookings = require("./models/RoomBookings")(sequelize, Sequelize);

db.guests.hasMany(db.bookings, { foreignKey: 'GuestId' });
db.rooms.hasMany(db.bookings, { foreignKey: 'RoomNumber' });
db.bookings.belongsTo(db.guests, { foreignKey: 'GuestId' });
db.bookings.belongsTo(db.rooms, { foreignKey: 'RoomNumber' });

sync=async()=>{
    await sequelize.sync({force:true}) // Erase all and recreate
    // await sequelize.sync({alter:true}) // Alter existing to match the model
}

module.exports = {db,sync}