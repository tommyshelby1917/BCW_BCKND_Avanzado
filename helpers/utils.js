'use strict';

// Allowed tags in our API
function verifyTags(tag, res) {
  const allowedTags = ['work', 'lifestyle', 'motor', 'mobile'];

  if (!allowedTags.includes(tag)) {
    const err = `Solo estàn permitidos los tags ${allowedTags}`;
    if (res) {
      res.status(500);
    }
    throw new Error(err);
  }
}

// Only if the url starts with /api/ we make a API request
function isAPIRequest(req) {
  return req.originalUrl.startsWith('/api/');
}

// Select query combination price

function combinationQueryPrice(query) {
  // If in the url we receive the price parameter and it has a hyphen,
  // we obtain the position of the hyphen to determine
  // what type of filter we pass to the query.

  let price = query;
  let position = price.indexOf('-');
  let splitedPrice = price.split('-');

  if (position === 0) {
    price = { $lte: Number(splitedPrice[1]) };
  } else if (position === price.length - 1) {
    price = { $gte: Number(splitedPrice[0]) };
  } else if (position > 0 && position < price.length - 1) {
    price = { $gte: Number(splitedPrice[0]), $lte: Number(splitedPrice[1]) };
  }

  return price;
}

module.exports = {
  isAPIRequest,
  verifyTags,
  combinationQueryPrice,
};
