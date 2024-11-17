module.exports = (sequelize, DataTypes) => {
  const Cuti = sequelize.define(
    "Cuti",
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      limit: {
        type: DataTypes.INTEGER,
        defaultValue: 12,
        allowNull: false,
      },
      created_at: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      updated_at: {
        type: DataTypes.DATEONLY,
        allowNull: true,
      },
    },
    {
      tableName: "cuti",
      // If don't want createdAt
      createdAt: false,
      // If don't want updatedAt
      updatedAt: false,
    }
  );
  return Cuti;
};
