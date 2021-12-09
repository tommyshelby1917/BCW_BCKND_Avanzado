'use strict';

const { Requester } = require('cote');

const requester = new Requester({ name: 'create-thumbnail-controller' });

class thumbnailController {
  exec(fileLocation) {
    // Ask to the microservices resize the image
    requester.send({
      type: 'create-thumbnail',
      fileLocation,
    });
  }
}

module.exports = thumbnailController;
