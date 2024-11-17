module.exports = (sequelize, DataTypes) => {
   const Users = sequelize.define(
      "Users",
      {
         id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
         },
         fullname: {
            type: DataTypes.STRING
         },
         username: {
            type: DataTypes.STRING,
         },
         password: {
            type: DataTypes.STRING,
         },
         devisi_id: {
            type: DataTypes.INTEGER,
            allowNull: true
         },
         shift_id: {
            type: DataTypes.INTEGER,
            defaultValue: 1,
            allowNull: true
         },
         role_id: {
            type: DataTypes.INTEGER,
            allowNull: true
         },
         is_active: {
            type: DataTypes.BOOLEAN,
            allowNull: true
         },
         created_at: {
            type: DataTypes.DATE,
            allowNull: false,
         },
         updated_at: {
            type: DataTypes.DATE,
            allowNull: true,
         },
         deleted_at: {
            type: DataTypes.DATE,
            allowNull: true,
         },
      },
      {
         tableName: "users",
         // If don't want createdAt
         createdAt: false,

         // If don't want updatedAt
         updatedAt: false,
      }
   );

   Users.associate = function (models) {
      Users.belongsTo(models.Roles, {
         foreignKey: 'role_id',
         as: 'role'
      })

      Users.belongsTo(models.Devisi, {
         foreignKey: 'devisi_id',
         as: 'devisi'
      })

      Users.belongsTo(models.Shift, {
         foreignKey: 'shift_id',
         as: 'shift'
      })
   }

   return Users;
};