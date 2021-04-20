const mongoose = require('mongoose')
const { NOTES_APP_MONGODB_HOST, NOTES_APP_MONGODB_DB } = process.env

const MONGODB_URI = `mongodb://${NOTES_APP_MONGODB_HOST}/${NOTES_APP_MONGODB_DB}`

mongoose.connect(MONGODB_URI, { 
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useFindAndModify: false
})
  .then(db => console.log('Database is connected'))
  .catch(err => console.log(err))