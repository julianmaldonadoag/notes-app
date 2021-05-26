const helpers = {}

helpers.isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) { // Passport function.
    return next()
  }

  req.flash('error_msg', 'Unauthorized')
  res.redirect('/users/login')
}

module.exports = helpers