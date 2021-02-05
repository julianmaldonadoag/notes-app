const express = require('express')
const path = require('path')
const exphbs = require('express-handlebars')
const morgan = require('morgan')
const methodOverride = require('method-override')

const app = express();

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
app.use(morgan('dev'))
app.use(express.json());
app.use(express.urlencoded({extended: false}))
app.use(methodOverride('_method'))

// Routes.
app.use(require('./routes/index.routes'))
app.use('/notes', require('./routes/notes.routes'))

// Static files.
app.use(express.static(path.join(__dirname, 'public')))

module.exports = app;