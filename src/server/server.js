const express = require('express');
const request = require('request');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;
require('dotenv').config();
const { KEY, SECRET, USER_ID } = process.env;

app.use(express.static(path.join(__dirname, '../public')));

app.get('/photos-ids/:userID', function(req, res) {
  request.get(`https://api.flickr.com/services/rest/?method=flickr.people.getPublicPhotos&api_key=${KEY}&user_id=${req.params.userID}&format=json&nojsoncallback=1`,

  function (e, r, data) {
    res.send(data);
  })
})

app.get('/photo-sizes/:id', function(req, res) {
  request.get(`https://api.flickr.com/services/rest/?method=flickr.photos.getSizes&api_key=${KEY}&photo_id=${req.params.id}&format=json&nojsoncallback=1`,

  function (e, r, data) {
    res.send(data);
  })
})

app.get('/photo-info/:id', function(req, res) {
  request.get(`https://api.flickr.com/services/rest/?method=flickr.photos.getInfo&api_key=${KEY}&photo_id=${req.params.id}&format=json&nojsoncallback=1`,

  function (e, r, data) {
    res.send(data);
  })
})

app.get('/user-details/:username', function(req, res) {
  request.get(`https://api.flickr.com/services/rest/?method=flickr.people.findByUsername&api_key=${KEY}&username=${req.params.username}&format=json&nojsoncallback=1`,

  function (e, r, data) {
    res.send(data);
  })
})

app.listen(port, () => console.log(`Listening on port ${port}`));
