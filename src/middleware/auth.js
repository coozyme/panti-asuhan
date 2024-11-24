const jwt = require('jsonwebtoken');
const passport = require('passport');
// const passport = require('./passport');

const { Response } = require('../utils/response/response');

const secretKey = process.env.SECRET_KEY;

function AuthPayload(uid) {
   return {
      uid: uid,
   }
}

const AuthenticateToken = (req, res, next) => {
   // Mendapatkan token dari header Authorization
   const tokenBearer = req.header('Authorization');

   // Memeriksa apakah token ada
   if (!tokenBearer) {
      return res.status(401).json({ message: 'Token is required' });
   }
   // Split the header value to get the token part
   const [bearer, token] = tokenBearer.split(' ');

   // Check if the header has the correct format
   if (bearer !== 'Bearer' || !token) {
      res.set('Content-Type', 'application/json')
      res.status(401).send(Response(false, "401", "Invalid Authorization", null));
      return
   }
   // Memeriksa dan mendecode token
   jwt.verify(token, secretKey, (err, decoded) => {
      if (err) {
         if (err.name === 'TokenExpiredError') {
            res.set('Content-Type', 'application/json')
            res.status(401).send(Response(false, "401", "Token Expired", null));
            return
         } else {
            res.set('Content-Type', 'application/json')
            res.status(401).send(Response(false, "401", "Invalid Token", null));
            return
         }
      } else {
         // Menyimpan informasi pengguna yang terdekripsi pada objek req untuk digunakan oleh rute selanjutnya
         req.contextAuth = decoded;
         console.log('req.user', req.user)
         next(); // Lanjut ke middleware atau rute berikutnya
      }
   });
}
const AuthMiddleware = {
   // Basic authentication middleware
   authenticate: (req, res, next) => {
      passport.authenticate('local', {
         successRedirect: '/dashboard',
         failureRedirect: '/auth/login',
         badRequestMessage: 'Your message you want to change.',
         // failureFlash: true
      })(req, res, next);
   },

   // Enhanced authentication middleware with custom callbacks
   authenticateWithCustomCallback: (req, res, next) => {
      console.log('LOG-EES', req.isAuthenticated())
      passport.authenticate('local', (err, user, info) => {
         console.log("LOG-RESQ", err, user, info)
         if (err) {
            console.log('err@authenticateWithCustomCallback', err)
            // req.flash('error', 'An error occurred during authentication');
            return res.redirect('/auth/login');
         }
         console.log('user@authenticateWithCustomCallback', user)
         if (!user) {
            console.log('err@authenticateWithCustomCallback', 'Invalid credentials')
            // req.flash('error', info.message || 'Invalid credentials');
            return res.redirect('/auth/login');
         }

         req.logIn(user, (err) => {
            if (err) {
               // req.flash('error', 'Failed to establish session');
               console.log('err@authenticateWithCustomCallback', 'Invalid credentials', err


               )
               return res.redirect('/auth/login');
            }

            // Add user data to session if needed
            req.session.user = {
               id: user.id,
               username: user.username,
               lastLogin: new Date()
            };

            return res.redirect('/dashboard');
         });
      })(req, res, next);
   },

   // Check if user is authenticated
   isAuthenticated: (req, res, next) => {
      if (req.isAuthenticated()) {
         return next();
      }
      res.redirect('/auth/login')
   },
}

module.exports = { AuthPayload, AuthenticateToken, AuthMiddleware };