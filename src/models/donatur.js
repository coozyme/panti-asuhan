module.exports = (sequelize, DataTypes) => {
   const Donatur = sequelize.define(
      "Donatur",
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
         email: {
            type: DataTypes.STRING(128),
            allowNull: false,
            unique: true
         },
         password: {
            type: DataTypes.STRING(255),
            allowNull: false
         },
         status: {
            type: DataTypes.ENUM('PENDING', 'VERIFIED', 'REJECT'),
            defaultValue: 'PENDING'
         },
         tanggal_login: {
            type: DataTypes.DATE,
            allowNull: true
         },
         tanggal_logout: {
            type: DataTypes.DATE,
            allowNull: true
         }
      },
      {
         tableName: "donatur",
         timestamps: true,
         // If don't want createdAt
         createdAt: false,

         // If don't want updatedAt
         updatedAt: false,
      }
   );
   return Donatur;
};