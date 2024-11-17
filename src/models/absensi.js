module.exports = (sequelize, DataTypes) => {
   const Absensi = sequelize.define(
      "Absensi",
      {
         id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
         },
         user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
         },
         clock_in: {
            type: DataTypes.TIME,
            allowNull: true,
         },
         clock_out: {
            type: DataTypes.TIME,
            allowNull: true,
         },
         longitude_clockin: {
            type: DataTypes.DECIMAL(10, 8),
            allowNull: true,
         },
         latitude_clockin: {
            type: DataTypes.DECIMAL(11, 8),
            allowNull: true,
         },
         longitude_clockout: {
            type: DataTypes.DECIMAL(10, 8),
            allowNull: true,
         },
         latitude_clockout: {
            type: DataTypes.DECIMAL(11, 8),
            allowNull: true,
         },
         photo_clockin: {
            type: DataTypes.TEXT,
            allowNull: true,
         },
         photo_clockout: {
            type: DataTypes.TEXT,
            allowNull: true,
         },
         created_at: {
            type: DataTypes.DATEONLY,
            allowNull: false,
         },
         deleted_at: {
            type: DataTypes.DATE,
            allowNull: true,
         },
      },
      {
         tableName: "absensi",
         createdAt: false,
         updatedAt: false,
      }

   );

   Absensi.associate = function (models) {
      Absensi.belongsTo(models.Users, {
         foreignKey: 'user_id',
         as: 'users'
      })
   }
   return Absensi;
};