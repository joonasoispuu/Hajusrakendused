module.exports = (sequelize, DataTypes) => {
  const Room = sequelize.define("Room", {
    RoomNumber: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false
    },
    DailyCost: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    Status: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  return Room;
};
