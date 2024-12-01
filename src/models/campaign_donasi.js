module.exports = (sequelize, DataTypes) => {
   const CampaignDonasi = sequelize.define(
      "CampaignDonasi",
      {
         id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
         },
         judul: {
            type: DataTypes.STRING(255),
            allowNull: false
         },
         deskripsi: {
            type: DataTypes.TEXT,
            allowNull: true
         },
         target_donasi: {
            type: DataTypes.DOUBLE,
            allowNull: false,
            defaultValue: 0
         },
         terkumpul: {
            type: DataTypes.DOUBLE,
            allowNull: false,
            defaultValue: 0
         },
         tanggal_mulai: {
            type: DataTypes.DATEONLY,
            allowNull: false
         },
         tanggal_selesai: {
            type: DataTypes.DATEONLY,
            allowNull: false
         },
         photo: {
            type: DataTypes.STRING(255),
            allowNull: true
         },
         status: {
            type: DataTypes.ENUM('PUBLISH', 'UNPUBLISH'),
            defaultValue: 'PUBLISH'
         },
         main_campaign: {
            type: DataTypes.BOOLEAN,
            defaultValue: 'FALSE'
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
         tableName: "campaign_donasi",
         createdAt: 'created_at',
         updatedAt: 'updated_at'
      }
   );

   CampaignDonasi.associate = (models) => {
      CampaignDonasi.belongsTo(models.Admin, { foreignKey: 'id_admin' });
   };

   return CampaignDonasi;
};