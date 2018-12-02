const express = require('express');
const request = require('request');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;
require('dotenv').config();
const { KEY, SECRET, USER_ID } = process.env;

app.use(express.static(path.join(__dirname, '../public')));

app.get('/photos', function(req, res) {
  request.get(`https://api.flickr.com/services/rest/?method=flickr.people.getPublicPhotos&api_key=${KEY}&user_id=${USER_ID}&format=json&nojsoncallback=1`,

  function (e, r, data) {
    res.send(data);
  })
})

app.listen(port, () => console.log(`Listening on port ${port}`));
