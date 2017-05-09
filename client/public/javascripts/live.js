$(document).ready(function() {

  var id = 1;
  var player = dashjs.MediaPlayer().create();
  player.getDebug().setLogToBrowserConsole(false);
  player.initialize();
  player.attachView(document.getElementById('videoplayer'));
  player.attachVideoContainer(document.getElementById('videocontainer'));
  player.setAutoSwitchQuality(false);
  player.enableBufferOccupancyABR(false);
  player.setAutoPlay(true);
  player.attachSource("http://localhost:8080/api/mpd/"+id);
  player.setLiveDelay(1);  // en secondes

/*
  cpt = 0;
	if (player.on(MediaPlayerEvents.ERROR,onError))
  {
    cpt++;
    if (cpt == 3) {
      player.reset();
    }
  }

*/


});
