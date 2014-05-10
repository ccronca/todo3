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

  // Setting the facebook oauth routes
  // app.route('/auth/facebook')
  //   .get(passport.authenticate('facebook', {
  //     scope: ['email', 'user_about_me'],
  //     failureRedirect: '/login'
  //   }), users.signin);

  // app.route('/auth/facebook/callback')
  //   .get(passport.authenticate('facebook', {
  //     failureRedirect: '/login'
  //   }), users.authCallback);

  // // Setting the github oauth routes
  // app.route('/auth/github')
  //   .get(passport.authenticate('github', {
  //     failureRedirect: '/login'
  //   }), users.signin);

  // app.route('/auth/github/callback')
  //   .get(passport.authenticate('github', {
  //     failureRedirect: '/login'
  //   }), users.authCallback);

  // // Setting the twitter oauth routes
  // app.route('/auth/twitter')
  //   .get(passport.authenticate('twitter', {
  //     failureRedirect: '/login'
  //   }), users.signin);

  // app.route('/auth/twitter/callback')
  //   .get(passport.authenticate('twitter', {
  //     failureRedirect: '/login'
  //   }), users.authCallback);

  // // Setting the google oauth routes
  // app.route('/auth/google')
  //   .get(passport.authenticate('google', {
  //     failureRedirect: '/login',
  //     scope: [
  //       'https://www.googleapis.com/auth/userinfo.profile',
  //       'https://www.googleapis.com/auth/userinfo.email'
  //     ]
  //   }), users.signin);

  // app.route('/auth/google/callback')
  //   .get(passport.authenticate('google', {
  //     failureRedirect: '/login'
  //   }), users.authCallback);

  // // Setting the linkedin oauth routes
  // app.route('/auth/linkedin')
  //   .get(passport.authenticate('linkedin', {
  //     failureRedirect: '/login',
  //     scope: ['r_emailaddress']
  //   }), users.signin);

  // app.route('/auth/linkedin/callback')
  //   .get(passport.authenticate('linkedin', {
  //     failureRedirect: '/login'
  //   }), users.authCallback);

  // Server API Routes
  // Todo authorization helpers
  var hasAuthorization = function(req, res, next) {
    if (req.todo.user.id !== req.user.id) {
      return res.json(401, 'User is not authorized');
    }
    next();
  };

  app.param('todoId', todos.todo);

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
