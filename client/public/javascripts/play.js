
$(document).ready(function() {



  var player = dashjs.MediaPlayer().create();
  player.getDebug().setLogToBrowserConsole(false);
  player.initialize();
  player.attachView(document.getElementById('videoplayer'));
  player.attachVideoContainer(document.getElementById('videocontainer'));
  player.setAutoSwitchQuality(false);
  player.enableBufferOccupancyABR(false);
  player.setAutoPlay(false);

  player.attachSource("http://localhost:8080/segment/segment"+document.cookie+"/mpd.mpd");


});
