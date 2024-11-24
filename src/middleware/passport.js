const LocalStrategy = require('passport-local').Strategy;
const { Admin } = require("../models");
const bcrypt = require("bcryptjs");
const { CheckPassword } = require('../utils/encrypt/encrypt');

const initialize = (passport) => {
   const authenticateUser = async (username, password, done) => {
      const user = await Admin.findOne({
         where: { username: username }
      });

      if (!user) {
         return done(null, false, { message: 'No user found' });
      }
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
   passport.use(new LocalStrategy({ usernameField: 'username' }, authenticateUser))
   passport.serializeUser((user, done) => done(null, user.id))
   passport.deserializeUser(async (id, done) => {
      const user = await Admin.findByPk(id);
      return done(null, user)
   })
}
module.exports = initialize;