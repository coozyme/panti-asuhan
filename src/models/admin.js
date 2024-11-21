module.exports = (sequelize, DataTypes) => {
   const Admin = sequelize.define(
      "Admin",
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
         username: {
            type: DataTypes.STRING(128),
            allowNull: false,
            unique: true
         },
         number_phone: {
            type: DataTypes.STRING(128),
            allowNull: false
         },
         email: {
            type: DataTypes.STRING(128),
            allowNull: false
         },
         password: {
            type: DataTypes.STRING(255),
            allowNull: false
         },
         is_active: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
         }
      },
      {
         tableName: "admin",
         timestamps: true
      }
   );
   return Admin;
};