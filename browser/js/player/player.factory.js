'use strict';

juke.factory('PlayerFactory', function() {

  var playerObj = {};
  // global private vars;
  var _currentSong = null;
  var _isPlaying = false;
  var _audio = document.createElement('audio');
  var _songList = null;
  var _progress = 0;

  // main functionality
  playerObj.start = function(song, songList) {
    this.pause();
    _isPlaying = true;
    // resume current song
    if (songList) _songList = songList;
    if (song === _currentSong) return _audio.play();
    // enable loading new song
    _currentSong = song;
    _audio.src = song.audioUrl;
    _audio.load();
    _audio.play();
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
    if (_audio.currentTime === 0) return 0;
    return _audio.currentTime / _audio.duration;
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
