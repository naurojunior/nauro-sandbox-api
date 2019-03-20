const fs = require("fs"),
      http = require("http"),
      YoutubePlaylistAPI = require("./YoutubePlaylistAPI.js"),
      request = require("request");

var express = require('express');
var app = express();
var Tumblr = require('./tumblr.js')


app.get('/videos', async function (req, res) {
  let videosList = await new YoutubePlaylistAPI().getVideos();
  res.send(videosList);
});

app.get('/tumblr/:tumblr/:tag', async function(req,res){
  let results = await new Tumblr().start(req.params.tumblr,req.params.tag);
  res.send(results);
});

app.listen(4000, function () {});

