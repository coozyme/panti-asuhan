module.exports = (sequelize, DataTypes) => {
   const AnakAsuh = sequelize.define(
      "AnakAsuh",
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
         kelamin: {
            type: DataTypes.STRING(128),
            allowNull: false
         },
         tempat_lahir: {
            type: DataTypes.STRING(128),
            allowNull: false
         },
         tanggal_lahir: {
            type: DataTypes.DATEONLY,
            allowNull: false
         },
         address: {
            type: DataTypes.TEXT,
            allowNull: true
         },
         status: {
            type: DataTypes.STRING(50),
            allowNull: true
         },
         number_phone: {
            type: DataTypes.STRING(128),
            allowNull: true
         },
         photo: {
            type: DataTypes.STRING(255),
            allowNull: true
         },
         tanggal_masuk: {
            type: DataTypes.DATEONLY,
            allowNull: true
         },
         tanggal_keluar: {
            type: DataTypes.DATEONLY,
            allowNull: true
         },
         ayah: {
            type: DataTypes.STRING(50),
            allowNull: true
         },
         ibu: {
            type: DataTypes.STRING(50),
            allowNull: true
         },
         tanggal_wafat: {
            type: DataTypes.DATEONLY,
            allowNull: true
         },
         keterangan: {
            type: DataTypes.DATEONLY,
            allowNull: true
         },
         id_wali: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
               model: 'Wali',
               key: 'id'
            }
         },
         id_admin: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
               model: 'Admin',
               key: 'id'
            }
         }
      },
      {
         tableName: "anak_asuh",
         timestamps: true
      }
   );

   AnakAsuh.associate = (models) => {
      AnakAsuh.belongsTo(models.Wali, { foreignKey: 'id_wali' });
      AnakAsuh.belongsTo(models.Admin, { foreignKey: 'id_admin' });
   };

   return AnakAsuh;
};