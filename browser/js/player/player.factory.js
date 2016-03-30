'use strict';

juke.factory('PlayerFactory', function($rootScope) {

  var playerObj = {};
  // global private vars;
  var _currentSong = null;
  var _isPlaying = false;
  var progress = 0;
  var _audio = document.createElement('audio');
  var _songList = null;

  // main functionality
  playerObj.start = function(song, songList) {
    this.pause();
    _isPlaying = true;
    // resume current song
    if (songList) _songList = songList.songs;
    if (song === _currentSong) return _audio.play();
    // enable loading new song
    _currentSong = song;
    _audio.src = song.audioUrl;
    _audio.load();
    _audio.play();
    _audio.addEventListener('timeupdate', function() {
      progress = 100 * (_audio.currentTime / _audio.duration);
      $rootScope.$evalAsync();
    });
  };

  playerObj.pause = function() {
    _audio.pause();
    _isPlaying = false;
  };

  playerObj.resume = function() {
    _audio.play();
    _isPlaying = true;
  };

  playerObj.isPlaying = function() {
    return _isPlaying;
  };

  playerObj.getCurrentSong = function() {
    return _currentSong;
  };

  playerObj.next = function() {
    skip(1);
  };

  playerObj.previous = function() {
    skip(-1);
  };

  playerObj.getProgress = function() {
    return progress;
  };

  // helper functions
  function mod(num, m) {
    return ((num % m) + m) % m;
  }

  function skip(interval) {
    if (!_currentSong) return;
    var index = _songList.indexOf(_currentSong);
    index = mod((index + (interval || 1)), _songList.length);
    playerObj.start(_songList[index]);
  }

  return playerObj;
});
