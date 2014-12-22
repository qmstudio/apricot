var query = require('./controllers/query.js')
, command = require('./controllers/command.js')
, userController = require('./controllers/user.js')
, authController = require('./controllers/auth.js')
, passport = require('passport')
, mongoskin = require('mongoskin')
, rate = require('express-rate')

module.exports = function() {
  var requireAuth = passport.authenticate(nconf.get('server:auth'), { session : false })
  var router = express.Router()