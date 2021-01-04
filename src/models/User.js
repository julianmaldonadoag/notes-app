const { Schema, model } = require('mongoose')
const bcrypt = require('bcrypt')

const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
}, {
  timestamps: true
})

UserSchema.methods.encryptPassword = async password => {
  const salt = await bcrypt.genSalt()
  return await bcrypt.hash(password, salt)
}

UserSchema.methods.matchPasswords = async function(password) {
  return await bcrypt.compare(password, this.password)
}