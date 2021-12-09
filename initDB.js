'use strict';

require('dotenv').config();

const dbConnection = require('./lib/connectMongoose.js');

// Models
const Post = require('./models/Post.js');
const User = require('./models/User.js');

// Precreated data
const postData = require('./posts.json');

main().catch((error) => console.log('An error has occured', error));

async function main() {
  await initData();
  await initUsers();

  dbConnection.close();
}

async function initData() {
  // If we don't pass any arguments to deleteMany, everything is deleted.
  const deleted = await Post.deleteMany();
  console.log(`${deleted.deletedCount} posts were deleted`);

  // Create new data to the DB
  const posts = await Post.insertMany(postData.posts);
  console.log(`${posts.length} posts have been created`);
}

async function initUsers() {
  const deleted = await User.deleteMany();
  console.log(`${deleted.deletedCount} users were deleted`);

  const result = await User.insertMany([
    {
      email: 'user@example.com',
      password: await User.hashPassword('1234'),
    },
    {
      email: 'josep@josep.com',
      password: await User.hashPassword('1234'),
    },
  ]);

  console.log(`A total amount of ${result.length} users has ben created`);
}

// TODO: Creamos un yes, no? de confirmacion para la consola
