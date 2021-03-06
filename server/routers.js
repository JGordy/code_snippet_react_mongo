const AuthenticationController = require('./controllers/authentication'),
      express = require('express'),
      passportService = require('./config/passport'),
      passport = require('passport');

  // Middleware to require login/auth
  const requireAuth = passport.authenticate('jwt', { session: false });
  const requireLogin = passport.authenticate('local', { session: false });


  module.exports = function(app) {
  // Initializing route groups
  const apiRoutes = express.Router(),
        authRoutes = express.Router();

  //=========================
  // Auth Routes
  //=========================

  // Set auth routes as subgroup/middleware to apiRoutes
  apiRoutes.use('/auth', authRoutes);

  // Registration route
  authRoutes.post('/register', AuthenticationController.register);

  // Login route
  authRoutes.post('/login', requireLogin, AuthenticationController.login);

  // Delete route
  authRoutes.delete('/user/:id', AuthenticationController.delete);

  authRoutes.post('/snippet',
  AuthenticationController.createSnippet)

  authRoutes.get('/snippet',
  AuthenticationController.findSnippets)

  authRoutes.put('/snippet/:id', AuthenticationController.updateSnippet)

  authRoutes.delete('/snippet/:id/delete',
  AuthenticationController.deleteSnippet)

  authRoutes.get('/', function(req, res) {
  res.send('Relax. We will put the home page here later.');
});

// Set url for API group routes
  app.use('/api', apiRoutes);
};
