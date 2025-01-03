module.exports = (sequelize, DataTypes) => {
   const Kegiatan = sequelize.define(
      "Kegiatan",
      {
         id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
         },
         thumbnail: {
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
         },
         tanggal_upload: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
         },
         id_admin: {
            type: DataTypes.INTEGER,
            allowNull: false
         }
      },
      {
         tableName: "kegiatan",
         timestamps: false
      }
   );
   return Kegiatan
};