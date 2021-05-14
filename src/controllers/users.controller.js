const usersCtrl = {}

usersCtrl.renderSignUpForm = (req, res) => {
  res.render('users/signup')
}

usersCtrl.signUp = (req, res) => {
  res.send('Sign up')
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
