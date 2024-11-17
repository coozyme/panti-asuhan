module.exports = (sequelize, DataTypes) => {
   const Devisi = sequelize.define(
      "Devisi",
      {
         id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
         },
         title: {
            type: DataTypes.STRING,
            allowNull: false,
         },
      },
      {
         tableName: "devisi",
         // If don't want createdAt
         createdAt: false,
         // If don't want updatedAt
         updatedAt: false,
      }
   );
   return Devisi;
};
