const fs = require("fs"),
      http = require("http"),
      YoutubePlaylistAPI = require("./YoutubePlaylistAPI.js"),
      request = require("request");

var express = require('express');
var app = express();


app.get('/', async function (req, res) {
  let videosList = await new YoutubePlaylistAPI().getVideos();
  res.send(videosList);
});

app.listen(4000, function () {});

