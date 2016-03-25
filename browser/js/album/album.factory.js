'use strict';
juke.factory('StatsFactory', function($q) {
  var statsObj = {};
  statsObj.totalTime = function(album) {
    var audio = document.createElement('audio');
    return $q(function(resolve, reject) {
      var sum = 0;
      var n = 0;

      function resolveOrRecur() {
        if (n >= album.songs.length) resolve(sum);
        else audio.src = album.songs[n++].audioUrl;
      }
      audio.addEventListener('loadedmetadata', function() {
        sum += audio.duration;
        resolveOrRecur();
      });
      resolveOrRecur();
    });
  };
  return statsObj;
});

juke.factory('AlbumFactory', function($q, $http) {
  var albumsObj = {};

  albumsObj.fetchAll = function() {
    return $http.get('/api/albums/')
      .then(function(res) {
        // console.log(res.data)
        res.data.forEach(function(album) {
          album.imageUrl = '/api/albums/' + album._id + '.image';
        });
        return res.data;
      });
  };

  albumsObj.fetchById = function(id) {
    return $http.get('/api/albums/' + id)
      .then(function(res) {
        var album = res.data;
        album.imageUrl = '/api/albums/' + album._id + '.image';
        return album;
      });
  };
  return albumsObj;
});
