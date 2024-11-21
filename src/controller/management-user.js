const UUID = require('uuid');

const { Users, Cuti } = require("../models");
const { AuthPayload } = require("../middleware/auth");
const { Response } = require("../utils/response/response");
const { EncryptPassword, CheckPassword, GenerateToken, GeneratePassword } = require("../utils/encrypt/encrypt");
const { TimeZoneIndonesia, GetDate } = require("../utils/times/timezone");
const user = require('./user');
const path = require('path');

module.exports = {
   AdminPage: async (req, res) => {
      const generatePassword = GeneratePassword()
      res.render(path.join(__dirname, '../../src/views/pages/management-user/administrator.ejs'));
   }
}