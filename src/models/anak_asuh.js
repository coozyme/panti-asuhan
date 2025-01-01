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
         kelas: {
            type: DataTypes.TEXT,
            allowNull: true
         },
         status: {
            type: DataTypes.ENUM('YATIM', 'PIATU', 'YATIM PIATU', 'DHUAFA'),
            defaultValue: 'YATIM',
            allowNull: false
         },
         number_phone: {
            type: DataTypes.STRING(128),
            allowNull: true
         },
         photo: {
            type: DataTypes.STRING(255),
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
         keterangan: {
            type: DataTypes.TEXT,
            allowNull: true
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
         timestamps: true,
         createdAt: 'created_at',
         updatedAt: 'updated_at'
      }
   );

   AnakAsuh.associate = (models) => {
      AnakAsuh.belongsTo(models.Admin, { foreignKey: 'id_admin', as: 'admin' });
   };

   return AnakAsuh;
};