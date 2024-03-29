const express = require('express')
const path = require('path')
const exphbs = require('express-handlebars')
const methodOverride = require('method-override')
const flash = require('connect-flash')
const session = require('express-session')
const passport = require('passport')

// Initializations.
const app = express();
require('./config/passport')

// Settings.
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'))
app.engine('.hbs', exphbs({
  defaultLayout: 'main',
  layoutsDir: path.join(app.get('views'), 'layouts'),
  partialsDir: path.join(app.get('views'), 'partials'),
  extname: '.hbs'
}))
app.set('view engine', '.hbs')

// Middlewares.
if (process.env.NODE_ENV === 'development') {
  const morgan = require('morgan')
  app.use(morgan('dev'))
}
app.use(express.json());
app.use(express.urlencoded({extended: false}))
app.use(methodOverride('_method'))
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: true
}))
app.use(passport.initialize());
app.use(passport.session());
app.use(flash())

// 'Global' variables for the view.
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg')
  res.locals.error_msg = req.flash('error_msg')
  res.locals.passport_error = req.flash('error')
  res.locals.user = req.user || null // Passport user.
  next()
})

// Routes.
app.use(require('./routes/index.routes'))
app.use('/notes', require('./routes/notes.routes'))
app.use('/users', require('./routes/users.routes'))

// Static files.
app.use(express.static(path.join(__dirname, 'public')))

module.exports = app;
