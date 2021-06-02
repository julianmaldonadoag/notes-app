const passport = require('passport')
const usersCtrl = {}
const User = require('../models/User')

usersCtrl.renderSignUpForm = (req, res) => {
  res.render('users/signup')
}

usersCtrl.signUp = async (req, res) => {
  const errors = []

  const { name, email, password, confirmPassword } = req.body
  let newUser = { name, email, password, confirmPassword }

  if (!name) errors.push({text: 'Empty name field'})
  if (!email) errors.push({text: 'Empty email field'})
  if (!password) {
    errors.push({text: 'Empty password field'})
  } else {
    if (password.length < 6)
      errors.push({text: 'Password must have at least 6 characters'})
    if (password !== confirmPassword)
      errors.push({text: 'Passwords do not match'})
  }
  
  if (errors.length > 0) {
    return res.render('users/signup', {
      errors,
      newUser
    })
  }

  const emailUser = await User.findOne({email: email})
  if (emailUser){
    errors.push({text: 'The email is already linked to an account.'})
    return res.render('users/signup', {
      errors,
      newUser
    })
  }

  newUser = new User({name, email, password})
  newUser.password = await newUser.encryptPassword(password)
  req.flash('success_msg', 'Your account was created successfully')
  await newUser.save()
  res.redirect('/users/login')
}

usersCtrl.renderLoginForm = (req, res) => {
  res.render('users/login')
}

usersCtrl.login = passport.authenticate('local', {
  failureRedirect: '/users/login',
  successRedirect: '/notes',
  failureFlash: true
})

usersCtrl.logout = (req, res) => {
  req.logout() // Passport function to logout.
  req.flash('success_msg', 'You are logged out')
  res.redirect('/users/login')
}

module.exports = usersCtrl
