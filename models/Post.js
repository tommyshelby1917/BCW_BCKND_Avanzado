'use strict';

const mongoose = require('mongoose');

// Schema of the announcement
const postSchema = mongoose.Schema({
  name: String,
  sale: Boolean,
  price: {
    type: Number,
    default: 0,
  },
  photo: {
    location: String,
    contentType: String,
  },
  tags: [String], // Array of strings
});

postSchema.statics.list = function (filter, select, skip, sort, limit) {
  const query = Post.find(filter);
  query.select(select);
  query.skip(skip);
  query.sort(sort);
  query.limit(limit);

  return query.exec();
};

// We create the model
const Post = mongoose.model('Post', postSchema);

module.exports = Post;
