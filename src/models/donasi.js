module.exports = (sequelize, DataTypes) => {
   const Donasi = sequelize.define(
      "Donasi",
      {
         id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
         },
         id_campaign_donasi: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
               model: 'CampagnDonasi',
               key: 'id'
            }
         },
         metode: {
            type: DataTypes.ENUM('TRANSFER', 'TUNAI'),
            defaultValue: 'TRANSFER'
         },
         jumlah: {
            type: DataTypes.DOUBLE,
            allowNull: false,
            defaultValue: 0
         },
         id_rekening: {
            type: DataTypes.INTEGER,
            allowNull: false
         },
         keterangan: {
            type: DataTypes.STRING(255),
            allowNull: true
         },
         catatan: {
            type: DataTypes.TEXT,
            allowNull: true
         },
         foto: {
            type: DataTypes.STRING(255),
            allowNull: true
         },
         status_verifikasi: {
            type: DataTypes.ENUM('PENDING', 'VERIFIED', 'REJECT'),
            defaultValue: 'PENDING'
         },
         tanggal_submit: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
         },
         tanggal_verifikasi: {
            type: DataTypes.DATE,
            allowNull: false
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
         tableName: "donasi",
         createdAt: 'created_at',
         updatedAt: 'updated_at'
      }
   );

   Donasi.associate = (models) => {
      Donasi.belongsTo(models.CampagnDonasi, { foreignKey: 'id_campaign_donasi' });
      Donasi.belongsTo(models.Admin, { foreignKey: 'id_admin' });
   };

   return Donasi;
};