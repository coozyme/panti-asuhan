module.exports = (sequelize, DataTypes) => {
   const Pengeluaran = sequelize.define(
      "Pengeluaran",
      {
         id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
         },
         keterangan: {
            type: DataTypes.STRING(255),
            allowNull: false
         },
         jumlah: {
            type: DataTypes.DOUBLE,
            allowNull: false,
            defaultValue: 0
         },
         tanggal: {
            type: DataTypes.DATEONLY,
            allowNull: false,
            defaultValue: DataTypes.NOW
         },
         foto: {
            type: DataTypes.STRING(255),
            allowNull: true
         },
         id_campaign_donasi: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
               model: 'CampaignDonasi',
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
         tableName: "pengeluaran",
         createdAt: 'created_at',
         updatedAt: 'updated_at',
         deletedAt: 'deleted_at'
      }
   );

   Pengeluaran.associate = (models) => {
      Pengeluaran.belongsTo(models.Admin, { foreignKey: 'id_admin' });
      Pengeluaran.belongsTo(models.CampaignDonasi, { foreignKey: 'id_campaign_donasi', allowNull: true, as: 'campaignDonasi' });
   };

   return Pengeluaran;
};