'use strict';

const express = require('express');
const router = express.Router();

router.get('/:locale', (req, res, next) => {
  // we take the language from the url
  const locale = req.params.locale;

  // we put a cookie in the response with the language
  res.cookie('nodeapi-locale', locale, {
    maxAge: 100 * 60 * 60 * 24 * 15, // 15 days
  });

  // we send the user at the same page where he was
  res.redirect(req.get('referer'));
});

module.exports = router;
