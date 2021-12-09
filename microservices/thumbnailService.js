'use strict';

const sharp = require('sharp');
const { Responder } = require('cote');

const responder = new Responder({ name: 'create-thumbnail-controller' });

const root = __dirname
  .split('/')
  .filter((el) => el !== 'microservices')
  .join('/');

const destinationFolder = root + '/public/thumbnails/';

responder.on('create-thumbnail', async (fileLocation, done) => {
  console.log('service: resizing file', fileLocation.fileLocation);

  const max = fileLocation.fileLocation.split('/').length;
  const name = fileLocation.fileLocation.split('/')[max - 1];

  console.log('este es el uno', destinationFolder);

  // Resize image with sharp
  try {
    await sharp(root + fileLocation.fileLocation)
      .resize({ width: 100, height: 100 })
      .toFile(destinationFolder + Date.now() + name);
  } catch (error) {
    console.log(error);
  }
});
