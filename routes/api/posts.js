'use strict';

const express = require('express');
const router = express.Router();
const path = require('path');
const Post = require('../../models/Post.js');
const fs = require('fs');

const utils = require('../../helpers/utils.js');
const getters = require('../../helpers/getters.js');

const uploadMiddleware = require('../../lib/upload.js');

// Get posts
router.get('/', async (req, res, next) => {
  try {
    const [filtro, select, skip, sort, limit] = getters.getPosts(req);

    const posts = await Post.list(filtro, select, skip, sort, limit); // getPosts[0] > Filter, getPosts[1] > Select

    res.json({ results: posts });
  } catch (error) {
    next(error);
  }
});

router.get('/tags', async (req, res, next) => {
  try {
    const [filtro, select, skip, sort, limit] = getters.getPosts(req);

    const posts = await Post.list(filtro, select, skip, sort, limit); // getPosts[0] > Filter, getPosts[1] > Select

    let tags = [];

    posts.forEach((e) => {
      e.tags.forEach((e) => {
        if (!tags.includes(e)) {
          tags.push(e);
        }
      });
    });

    res.json({ results: tags });
  } catch (error) {
    next(error);
  }
});

router.post('/', uploadMiddleware.single('photo'), async (req, res, next) => {
  try {
    let postData = {
      name: req.body.name,
      sale: req.body.sale,
      price: req.body.price,
      photo: {
        location: `./uploads/${req.file.filename}`,
        contentType: 'image/png',
      },
      tags: req.body.tags,
    };

    console.log(postData);

    // const postData = req.body;

    const post = new Post(postData);

    // the error function in app.js has been modified for this to work correctly

    // post.tags.forEach((e) => {
    //   utils.verifyTags(e, res);
    // });

    const createdPost = await post.save();

    res.status(201).json({ result: createdPost });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
