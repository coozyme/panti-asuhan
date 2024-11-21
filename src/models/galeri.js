module.exports = (sequelize, DataTypes) => {
   const Galeri = sequelize.define(
      "Galeri",
      {
         id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
         },
         foto: {
            type: DataTypes.STRING(255),
            allowNull: false
         },
         kegiatan: {
            type: DataTypes.STRING(128),
            allowNull: false
         },
         keterangan: {
            type: DataTypes.STRING(128),
            allowNull: true
         },
         tanggal: {
            type: DataTypes.DATEONLY,
            allowNull: false,
            defaultValue: DataTypes.NOW
         },
         tanggal_upload: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
         }
      },
      {
         tableName: "galeri",
         timestamps: false
      }
   );
   return Galeri;
};