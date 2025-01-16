const LocalStrategy = require('passport-local').Strategy;
const { Admin, Donatur } = require("../models");
const bcrypt = require("bcryptjs");
const { CheckPassword } = require('../utils/encrypt/encrypt');

const initialize = (passport) => {
   const authenticateUser = async (username, password, done) => {
      let user = await Admin.findOne({
         where: {
            username: username,
            is_active: true
         }
      }).then((res) => {
         if (!res) {
            return res
         }

         res.userType = 'ADMINISTRATOR'
         return res
      })

      console.log('LOG-USER-00', user)


      // i want to get value userType from session

      if (!user) {
         user = await Donatur.findOne({
            where: {
               email: username,
               status: "VERIFIED"
            }
         }).then((res) => {
            if (!res) {
               return res
            }
            console.log('LOG-RES-DONATUR', res)

            res.userType = 'DONATUR'
            return res
         })
      }

      if (!user) {
         return done(null, false, { message: 'No user found' });
      }

      console.log('LOG-USER-1221', user)
      try {
         if (await bcrypt.compare(password, user.password)) {
            return done(null, user)
         } else {
            return done(null, false, { message: 'Password incorrect' })
         }
      } catch (e) {
         return done(e)
      }

   }
   passport.use(new LocalStrategy({ usernameField: 'username', session: true }, authenticateUser))
   passport.serializeUser((user, done) => {
      console.log('LOG-serializeUser00', user)
      done(null, user)
   })
   passport.deserializeUser(async (serializedUser, done) => {

      let user = await Admin.findByPk(serializedUser.id).then((res) => {
         if (!res) {
            return res
         }

         res.userType = 'ADMINISTRATOR'
         return res
      })

      if (!user) {
         user = await Donatur.findByPk(serializedUser.id).then((res) => {
            if (!res) {
               return res
            }

            res.userType = 'DONATUR'
            return res
         })
      }

      if (!user) {
         return done(null, false, { message: 'No user found' });
      }

      // user.userType = serializedUser.userType
      return done(null, user)
   })
}
module.exports = initialize;