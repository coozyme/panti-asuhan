
const express = require('express');
// const createError = require('http-errors');
var path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const http = require('http');
var cors = require('cors')
const Socket = require('./utils/socket/socket.js');
const config = require('./config/config.js');
const port = config.port || 3001;


var app = express();
// app.use(cors());
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('ejs', require('ejs').renderFile);

// const authapi = require('./routes/auth.route.js');
const auth = require('./routes/auth.js');
// const employee = require('./routes/employee.js');
// const product = require('./routes/productions.js');
// const managementRole = require('./routes/management-user.js');
const absensi = require('./routes/absensi.js');
const cuti = require('./routes/cuti.js');
const user = require('./routes/user.js');
const landingPage = require('./routes/landing-page.js');
const dashboard = require('./routes/dashboard.js');
const anakAsuh = require('./routes/anak-asuh.js');
const donasi = require('./routes/donasi.js');
const campaign = require('./routes/campaign.js');
const report = require('./routes/report.js');
const managementUser = require('./routes/management-user.js');
const passport = require('passport');
var flash = require('connect-flash');
const { Admin } = require("../src/models");
const LocalStrategy = require('passport-local').Strategy;

const passportConfig = require('../src/middleware/passport.js');
// require('./middleware/passport')(passport);
const session = require('express-session');

const { sessionStore } = require('./middleware/session.js');
const { checkAuthenticated, AuthMiddleware } = require('./middleware/auth.js');
// const dashboardAnalytic = require('./routes/dashboard-analytic.js');

// app.use(logger('dev'));
// app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../public/')));
app.use(express.static(__dirname + '/public'));
app.use(express.static(path.join(__dirname, '/')));
app.use('/uploads', express.static('uploads'));
app.use(flash());
// app.use(cookieParser());

// app.use('/static', express.static('public'))
// console.log("LOG-__dirname", __dirname)
// app.use(express.static(__dirname + '../public/'));

var corsOptions = {
  origin: 'http:/127.0.0.1',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) chok
}

app.use(session({
  secret: config.development.secretKey,
  resave: false,
  store: sessionStore,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'development',
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
    sameSite: 'strict'
  }
}));

passportConfig(passport);

app.use(passport.initialize());
app.use(passport.session());

// passport.use('local', new LocalStrategy(
//   function (username, password, done) {
//     Admin.findOne({
//       username
//     }, function (err, user) {
//       if (err) {
//         return done(err);
//       }
//       if (!user) {
//         return done(null, false, {
//           message: 'Incorrect username.'
//         });
//       }
//       if (!user.validPassword(password)) {
//         return done(null, false, {
//           message: 'Incorrect password.'
//         });

//       }
//       return done(null, user);
//     });
//   }
// ));
// passport.serializeUser((user, done) => {
//   console.log('LOG-serializeUser', user.id)
//   done(null, user.id);
// });

// passport.deserializeUser(async (id, done) => {
//   try {
//     console.log('LOG-deserializeUser', id)
//     const user = await Admin.findById(id);
//     done(null, user);
//   } catch (err) {
//     console.log('LOG-ERR-deserializeUser', err)
//     done(err);
//   }
// });


app.get('/', landingPage);

app.use('/dashboard', dashboard);
app.use('/anak-asuh', anakAsuh);
app.use('/donasi', donasi);
app.use('/campaign', campaign);
app.use('/laporan', report);
app.use('/management-user', managementUser);
app.use('/auth', auth);
// app.use('/', dashboard);
// app.use('/dashboard', dashboardAnalytic);
app.use('/user', user);
// app.use('/employee', employee);
// app.use('/product', product);
// app.use('/management-user', managementRole);
app.use('/attendance', absensi);
app.use('/leave', cuti);
// app.use('/dashboard/category', categoryRouter);


// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

app.get('*', function (req, res) {
  res.render(path.join(__dirname, '../src/views/pages/not-found.ejs'));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  console.log('Log-Error', err)
  res.status(err.status || 500);
  res.render('error');
});



// app.listen(port, () => {
//   console.log('Running Server: ', port);
//   // db.Ping()
// });

// const io = socketio(server)

// io.on('connection', (socket) => {
//   console.log('New connection')
//   socket.on('message', (data) => {
//     console.log(`New message from ${socket.id}: ${data}`);
//   })
// })


const server = http.createServer(app);
// const { SocketInstance } = Socket.createSocket(server);
// SocketInstance(server);


server.listen(port, () => {
  console.log('Running Server: ', port);
  // db.Ping()
})
// module.exports = app;