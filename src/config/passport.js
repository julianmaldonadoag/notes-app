const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy

const User = require('../models/User')

passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
}, async (email, password, done) => {
  
  // Verify email user
  const user = await User.findOne({email})
  if (!user) {
    return done(null, false, {message: 'User not found'})
  }

  // Validate password user.
  const matchPasswords = await user.matchPasswords(password)
  if (matchPasswords) {
    return done(null, user)
  } else {
    return done(null, false, {message: 'Wrong password'})
  }
}))

passport.serializeUser((user, done) => {
  done(null, user.id);
});
 
passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});