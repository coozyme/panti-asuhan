module.exports = (sequelize, DataTypes) => {
   const Wali = sequelize.define(
      "Wali",
      {
         id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
         },
         fullname: {
            type: DataTypes.STRING(255),
            allowNull: false
         },
         address: {
            type: DataTypes.TEXT,
            allowNull: true
         },
         number_phone: {
            type: DataTypes.STRING(128),
            allowNull: true
         },
         umur: {
            type: DataTypes.STRING(128),
            allowNull: true
         },
         photo: {
            type: DataTypes.STRING(255),
            allowNull: true
         }
      },
      {
         tableName: "wali",
         timestamps: true
      }
   );
   return Wali;
};