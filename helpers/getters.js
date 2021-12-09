'use strict';

const utils = require('./utils');

function getPosts(req) {

  const tags = req.query.tag; // http://localhost:3000/api/posts?tag=mobile
  const sale = req.query.sale; // http://localhost:3000/api/posts?sale=true
  const name = req.query.name; // http://localhost:3000/api/posts?name=iphone
  const price = req.query.price;

  const skip = parseInt(req.query.skip);
  const select = req.query.select; // http://localhost:3000/api/posts?select=tags
  const sort = req.query.sort;
  const limit = parseInt(req.query.limit);

  const filtro = {};

  if (tags) {
    utils.verifyTags(tags);
    filtro.tags = tags;
  }

  if (sale) {
    filtro.sale = sale;
  }

  if (name) {
    filtro.name = RegExp('^' + name, 'i');
  }

  if (price) {
    filtro.price = utils.combinationQueryPrice(price);
  }
  // filtro.price = Number(utils.combinationQueryPrice(price));

  return [filtro, select, skip, sort, limit];
}

module.exports = {
  getPosts
}