'use strict';
const {
  Model
} = require('sequelize');
const cuti = require('./cuti');
module.exports = (sequelize, DataTypes) => {
  var RequestCuti = sequelize.define('RequestCuti', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    cuti_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    type_cuti: {
      type: DataTypes.ENUM,
      values: ['TAHUNAN', 'HAMIL'],
      allowNull: false,
    },
    status_cuti: {
      type: DataTypes.ENUM,
      values: ['PENDING', 'APPROVED', 'REJECTED', 'CANCELLED'],
      allowNull: false,
    },
    reason: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    start_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    end_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    created_at: {
      allowNull: false,
      type: DataTypes.DATE
    },
  }, {
    tableName: "request_cuti",
    createdAt: false,
    updatedAt: false,
  });

  RequestCuti.associate = function (models) {
    RequestCuti.belongsTo(models.Cuti, {
      foreignKey: 'cuti_id',
      as: 'cuti'
    })
  }

  return RequestCuti
};