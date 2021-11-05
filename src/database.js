const mongoose = require('mongoose')
const { MONGODB_URI, NOTES_APP_MONGODB_HOST, NOTES_APP_MONGODB_DB } = process.env

const DB_URI = MONGODB_URI || `mongodb://${NOTES_APP_MONGODB_HOST}/${NOTES_APP_MONGODB_DB}`

mongoose.connect(DB_URI, { 
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useFindAndModify: false
})
  .then(db => console.log('Database is connected'))
  .catch(err => console.log(err))

mongoose.set('useCreateIndex', true);
