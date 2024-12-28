const { Admin, Donatur } = require("../models");
const { AuthPayload } = require("../middleware/auth");
const { Response } = require("../utils/response/response");
const { EncryptPassword, CheckPassword, GenerateToken, GeneratePassword } = require("../utils/encrypt/encrypt");
const { TimeZoneIndonesia, GetDate } = require("../utils/times/timezone");
const user = require('./user');
const path = require('path');
const { IGNORE } = require('sequelize/lib/index-hints');
const passport = require('passport');
// require('../middleware/passport')(passport);
// app.use(passport.initialize());
// app.use(passport.session());
// require('../middleware/passport')(passport);

module.exports = {
   Login: async (req, res, next) => {

      const { type, username, password } = req.body
      console.log('req.body', req.body)
      console.log('type, username, password', type, username, password)
      if (type === '' || username === '' || password === '') {
         throw new Error('Please fill the form');
      }

      let user = null
      if (type.toUpperCase() === 'DONATUR') {
         user = await Donatur.findOne({
            where: {
               email: username,
               status: "VERIFIED"
            }
         })

      } else if (type.toUpperCase() === 'ADMINISTRATOR') {
         // find 
         user = await Admin.findOne({
            where: {
               username: username,
            }
         })

      }
      console.log('LOG-user', user)
      if (!user) {
         return res.status(401).json({
            success: false,
            message: 'user tidak ditemukan atau tidak terverifikasi'
         });
      }

      console.log('LOG-user', user)

      passport.authenticate('local', (err, user, info) => {
         try {
            if (err) {
               return next(err);
            }

            if (req.body.username === '' || req.body.email === '' || req.body.password === '')
               info.message = 'Please fill the form';

            if (!user) {
               return res.status(401).json({
                  success: false,
                  message: info.message
               });
            }

            req.logIn(user, async (err) => {
               if (err) {
                  return next(err);
               }

               // Update user's last login
               user.lastLogin = new Date();
               await user.save();

               // Set custom session data
               req.session.loginAttempts = 0;
               req.session.userAgent = req.headers['user-agent'];
               req.session.lastActive = new Date();
               req.session.userId = user.id;

               // Save the session before redirection to ensure cookies are set
               req.session.save(function (err) {
                  if (err) {
                     return next(err);
                  }

                  res.redirect('/dashboard');
               });
            });
         } catch (error) {
            next(error);
         }
      })(req, res, next);
   },
   Register: async (req, res) => {
      try {
         // const { fullname, username, password, role, devisiID, shiftID, limitCuti } = req.body
         // passwordHash = await EncryptPassword(password)
         // uuid = UUID.v4()
         console.log('req.body', req.body)

         const { nama, email, alamat, password, noTelp } = req.body
         const passwordEncrypted = await EncryptPassword(password)
         const payload = {
            fullname: nama,
            email: email,
            address: alamat,
            password: passwordEncrypted,
            number_phone: noTelp,
            status: 'PENDING',
         }

         await Donatur.create(payload)
         res.redirect('/auth/login')
      } catch (err) {
         console.log('LOG-ERR', err)
         res.render(path.join(__dirname, '../../src/views/pages/auth/register.ejs'));
      }
   },
   GeneratePassword: async (req, res) => {
      try {
         password = await GeneratePassword()

         dataObject = {
            newPassword: password,
         }

         res.set('Content-Type', 'application/json')
         res.status(200).send(Response(true, "200", "Success generated", dataObject))
      } catch (err) {
         console.log('er', err)
         res.set('Content-Type', 'application/json')
         res.status(500).send(Response(false, "500", "Internal Server Error", null))
      }
   },
   ChangePassword: async (req, res) => {
      try {
         passwordHash = await EncryptPassword(req.body.password)
         dataObject = {
            password: passwordHash,
            updated_at: TimeZoneIndonesia(),
         }

         const user = await Users.update(dataObject, {
            where: {
               username: req.body.username,
               deleted_at: null,
            }
         })
         console.log('LOG-UPDATE', user)

         if (user[0] == 0) {
            res.set('Content-Type', 'application/json')
            res.status(404).send(Response(false, "404", "username not found", null))
            return
         }

         res.set('Content-Type', 'application/json')
         res.status(200).send(Response(true, "200", "Success updated password", null))
      } catch (err) {
         console.log('LOG-ERR', err)

         res.set('Content-Type', 'application/json')
         res.status(500).send(Response(false, "500", "Internal Server Error", null))
      }
   },
   Logout: async (req, res) => {
      req.session.destroy();

      res.redirect('/auth/login');
   }
}