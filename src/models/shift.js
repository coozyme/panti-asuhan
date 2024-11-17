module.exports = (sequelize, DataTypes) => {
   const Shift = sequelize.define(
      "Shift",
      {
         id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
         },
         title: {
            type: DataTypes.STRING,
            defaultValue: "",
            allowNull: false,
         },
         clock_in: {
            type: DataTypes.DATE,
            allowNull: true,
         },
         clock_out: {
            type: DataTypes.DATE,
            allowNull: true,
         },
      },
      {
         tableName: "shift",
         // If don't want createdAt
         createdAt: false,
         // If don't want updatedAt
         updatedAt: false,
      }
   );
   return Shift;
};
