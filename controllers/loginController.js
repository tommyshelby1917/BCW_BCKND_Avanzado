'use strict';

const jwt = require('jsonwebtoken');
const User = require('../models/User');

class LoginController {
  async postJWT(req, res, next) {
    try {
      const { email, password } = req.body;

      // Search user in BD
      const user = await User.findOne({ email });

      // If we dont have the user or the password is wrong, throw an error
      if (!user || !(await user.comparePassword(password))) {
        res.json({ error: 'Invalid credentials' });
        return;
      }

      // If the user exist and the password is correct
      // We create a JWT with the _id of the user
      jwt.sign(
        { _id: user._id },
        process.env.JWT_SECRET,
        {
          expiresIn: '1d',
        },
        (err, jwtToken) => {
          if (err) {
            next(err);
            return;
          }

          res.json({ token: jwtToken });
        }
      );
    } catch (error) {
      next(error);
    }
  }
}

module.exports = LoginController;
