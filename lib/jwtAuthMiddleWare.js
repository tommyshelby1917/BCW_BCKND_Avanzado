'use strict';

const jwt = require('jsonwebtoken');

// module it exports the middleware

module.exports = (req, res, next) => {
  // take the jwtToken from the header or other sites
  const jwtToken =
    req.get('Authorization') || req.query.token || req.body.token;

  // Do we have a token?
  if (!jwtToken) {
    const error = new Error('no token founded');
    error.status = 401;
    next(error);
    return;
  }

  // Ok. We have a token but it is valid?
  jwt.verify(jwtToken, process.env.JWT_SECRET, (error, payload) => {
    if (error) {
      error.message = 'invalid token';
      error.status = 401;
      next(error);
      return;
    }

    req.apiAuthUserId = payload._id;

    // if the token is valid, we continue
    next();
  });
};
