const fs = require("fs"),
      http = require("http"),
      YoutubePlaylistAPI = require("./YoutubePlaylistAPI.js"),
      request = require("request");

const port = 4000
const ip = '0.0.0.0'


const server = http.createServer(async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

   let videosList = await new YoutubePlaylistAPI().getVideos();
   res.end(JSON.stringify(videosList));
});


server.listen(port, ip, () => {
  console.log(`Servidor rodando em http://${ip}:${port}`)
  console.log('Para derrubar o servidor: ctrl + c');
});