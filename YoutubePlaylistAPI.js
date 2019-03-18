const request = require("request");
const apiKey = require('./credentials/youtubeApi.json').apiKey


class YoutubePlaylistAPI {
  getVideos(){
    return new Promise((resolve, reject) => {
    request('https://www.googleapis.com/youtube/v3/playlistItems?key=' + apiKey + '&maxResults=50&part=snippet&playlistId=PL6RJ3WK_UjzHWrkDPeihY-TjX_sIqLf5l', function (error, response, body) {
          let bodyParsed = JSON.parse(body);
          let retorno = bodyParsed.items.map((val) => {
            return {id: val.snippet.resourceId.videoId, title: val.snippet.title}
          });

          resolve(retorno);
        });
    });

  }
};

module.exports = YoutubePlaylistAPI;
