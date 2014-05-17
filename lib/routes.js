'use strict';

var index = require('./controllers'),
  users = require('./controllers/users'),
  session = require('./controllers/session'),
  todos = require('./controllers/todos'),
  middleware = require('./middleware'),
  passport = require('passport');

/**
 * Application routes
 */
module.exports = function(app) {

  // =====================================
  // FACEBOOK ROUTES =====================
  // =====================================
  // route for facebook authentication and login
  app.get('/auth/facebook', passport.authenticate('facebook', {
    scope: 'email'
  }));

  // handle the callback after facebook has authenticated the user
  app.get('/auth/facebook/callback',
    passport.authenticate('facebook', {
      // successRedirect : '/profile',
      failureRedirect: '/login'
    }), function(req, res) {
      // Successful authentication, redirect home.
      res.redirect('/profile');
    });

  // Server API Routes
  // Todo authorization helpers
  var hasAuthorization = function(req, res, next) {
    if (process.env.NODE_ENV !== 'test' && req.todo.user.id !== req.user.id) {
      return res.json(401, 'User is not authorized');
    }
    next();
  };

  app.param('todoId', todos.todo);

  if (process.env.NODE_ENV === 'test') {
    app.route('/api/todos/_loadFixtures')
      .get(todos.loadFixtures);
  }


  app.route('/api/todos')
    .post(todos.create)
    .get(todos.query);
  app.route('/api/todos/:todoId')
    .get(todos.show)
    .put(hasAuthorization, todos.update)
    .delete(hasAuthorization, todos.remove);

  // User API Routes
  app.route('/api/users')
    .post(users.create)
    .put(users.changePassword);
  app.route('/api/users/me')
    .get(users.me);
  app.route('/api/users/:id')
    .get(users.show);

  app.route('/api/session')
    .post(session.login)
    .delete(session.logout);

  // All undefined api routes should return a 404
  app.route('/api/*')
    .get(function(req, res) {
      res.send(404);
    });

  // All other routes to use Angular routing in app/scripts/app.js
  app.route('/partials/*')
    .get(index.partials);
  app.route('/*')
    .get(middleware.setUserCookie, index.index);
};
