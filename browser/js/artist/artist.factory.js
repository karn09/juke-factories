juke.factory('ArtistFactory', function($http) {
  var artistObj = {};
  artistObj.fetchAll = function() {
    $http.get('/api/artists')
      .then(function(artists) {
        return artists.data;
      });
  };
  return artistObj;
});
