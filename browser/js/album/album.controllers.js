'use strict';

juke.controller('AlbumCtrl', function($scope, $http, $rootScope, $log, StatsFactory, AlbumFactory, PlayerFactory) {
  $scope.showAlbum = false;

  $rootScope.$on('oneAlbum', function(event, id) {

    AlbumFactory.fetchById(id)
      .then(function(album) {
        // album.imageUrl = '/api/albums/' + album._id + '.image';
        album.songs.forEach(function(song, i) {
          song.audioUrl = '/api/songs/' + song._id + '.audio';
          song.albumIndex = i;
        });
        $scope.album = album;
        StatsFactory.totalTime(album)
          .then(function(albumDuration) {
            $scope.fullDuration = albumDuration;
          });
        $scope.showAlbum = true;
      });
  });
  // AlbumFactory.fetchAll()
  //   .then(function(albums) {
  //     AlbumFactory.fetchById(albums[0]._id)
  //       .then(function(album) {
  //         // album.imageUrl = '/api/albums/' + album._id + '.image';
  //         album.songs.forEach(function(song, i) {
  //           song.audioUrl = '/api/songs/' + song._id + '.audio';
  //           song.albumIndex = i;
  //         });
  //         $scope.album = album;
  //         StatsFactory.totalTime(alb
  //           .then(function(albumDuration) {
  //             $scope.fullDuration = albumDuration;
  //           });
  //       });
  //   })
  //   .catch($log.error); // $log service can be turned on and off; also, pre-bound

  $scope.toggle = function(song) {
    if (PlayerFactory.isPlaying()) {
      PlayerFactory.pause();
    } else {
      PlayerFactory.start(song, $scope.album);
    }
  };
  // why does this work??
  $scope.playing = PlayerFactory.isPlaying;
  $scope.currentSong = PlayerFactory.getCurrentSong;
  // // main toggle
  // $scope.toggle = function(song) {
  //   if ($scope.playing && song === $scope.currentSong) {
  //     $rootScope.$broadcast('pause');
  //   } else $rootScope.$broadcast('play', song);
  // };
  //
  // // incoming events (from Player, toggle, or skip)
  // $scope.$on('pause', pause);
  // $scope.$on('play', play);
  // $scope.$on('next', next);
  // $scope.$on('prev', prev);
  //
  // // functionality
  // function pause() {
  //   $scope.playing = false;
  // }
  //
  // function play(event, song) {
  //   $scope.playing = true;
  //   $scope.currentSong = song;
  // };
  //

});
// factory injected into controller, from factory would broadcast intro controller, controller would emit to rootscope
juke.controller('AlbumsCtrl', function($scope, $rootScope, AlbumFactory) {
  $scope.showAlbums = false;
  $scope.$on('showAlbumList', function(event, args) {
    $scope.showAlbums = true;
  });

  $scope.showAlbum = function(id) {
    $scope.showAlbums = false;
    $rootScope.$emit('oneAlbum', id);
  };

  AlbumFactory.fetchAll()
    .then(function(albums) {
      $scope.albums = albums;
    });

});
