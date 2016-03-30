juke.controller('ArtistCtrl', function($scope, $rootScope, ArtistFactory) {
  ArtistFactory.fetchAll()
    .then(function(artists) {
      console.log(artists);
      $scope.artists = artists;
    });
});
