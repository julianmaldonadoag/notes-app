const usersCtrl = {}
const User = require('../models/User')

usersCtrl.renderSignUpForm = (req, res) => {
  res.render('users/signup')
}

usersCtrl.signUp = async (req, res) => {
  const errors = []

  const { name, email, password, confirmPassword } = req.body

  if (password !== confirmPassword) errors.push({text: 'Passwords do not match'})
  if (password.length < 6) errors.push({text: 'Password must have at least 6 characters'})

  if (errors.length > 0) {
    res.render('users/signup', {
      errors,
      name,
      email,
      password,
      confirmPassword
    })
  } else {

    const emailUser = await User.findOne({email: email})
    if (emailUser){
      errors.push({text: 'The email is already in use'})
      res.render('users/signup', {
        errors,
        name,
        email,
        password,
        confirmPassword
      })
    } else {
      const newUser = new User({name, email, password})
      newUser.password = await newUser.encryptPassword(password)
      req.flash('success_msg', 'Your account was created successfully')
      await newUser.save()
      res.redirect('/users/login')
    }
  }
}

usersCtrl.renderLoginForm = (req, res) => {
  res.render('users/login')
}

usersCtrl.login = (req, res) => {
  res.send('Login')
}

usersCtrl.logout = (req, res) => {
  res.send('Logout')
}

module.exports = usersCtrl
