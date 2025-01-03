module.exports = (sequelize, DataTypes) => {
   const Galeries = sequelize.define(
      "Galeries",
      {
         id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
         },
         image: {
            type: DataTypes.STRING(255),
            allowNull: false
         },
         id_kegiatan: {
            type: DataTypes.INTEGER,
            allowNull: false
         },
      },
      {
         tableName: "galeries",
         timestamps: false
      }
   );

   Galeries.associate = (models) => {
      Galeries.belongsTo(models.Kegiatan, { foreignKey: 'id_kegiatan', allowNull: true, as: 'kegiatan' });
   };

   return Galeries;
};