const { Router } = require('express')
const router = Router()

const { 
  renderSignUpForm,
  renderLoginForm,
  signUp,
  login,
  logout } = require('../controllers/users.controller')

router.get('/signup', renderSignUpForm)

router.post('/signup', signUp)

router.get('/login', renderLoginForm)

router.post('/login', login)

router.get('/logout', logout)

module.exports = router
