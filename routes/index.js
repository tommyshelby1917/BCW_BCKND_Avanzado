'use strict';

const { JSONCookie } = require('cookie-parser');

var express = require('express');
var router = express.Router();

const getters = require('../helpers/getters.js');
const Post = require('../models/Post');


/* GET home page. */
router.get('/', async function (req, res, next) {

  const [filtro, select, skip, sort, limit] = getters.getPosts(req);

  res.locals.resultados = await Post.list(filtro, select, skip, sort, limit);
  res.render('index', { title: 'NODEPOP' });
});

module.exports = router;
