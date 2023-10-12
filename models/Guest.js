module.exports = (dbConnection, Sequelize)=>{
    const Guest = dbConnection.define("Guest",{
        id:{
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        FirstName:{
            type: Sequelize.STRING,
            allowNull: false
        },
        LastName:{
            type: Sequelize.STRING,
            allowNull: false
        },
        PhoneNumber:{
            type: Sequelize.INTEGER,
            allowNull: false
        },
        EmailAddress:{
            type: Sequelize.STRING,
            allowNull: false
        }
    })
    return Guest
}