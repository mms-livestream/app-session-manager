$(document).ready(function() {

  var user = JSON.parse(sessionStorage.getItem("user"));
  var player = dashjs.MediaPlayer().create();
  var BUFFER = 40;

  player.getDebug().setLogToBrowserConsole(false);
  player.initialize();
  player.attachView(document.getElementById('videoplayer'));
  player.attachVideoContainer(document.getElementById('videocontainer'));
  player.setAutoSwitchQuality(false);
  player.enableBufferOccupancyABR(false);
            player.setBufferTimeAtTopQuality(BUFFER);
            player.setBufferTimeAtTopQualityLongForm(BUFFER);
            player.setStableBufferTime(BUFFER);
  player.setAutoPlay(true);
  player.attachSource("http://localhost:8080/api/mpd/"+user.id);
  //player.attachSource("http://192.168.2.132:8080/api/mpd/"+user.id);




  //player.setLiveDelay(20);  // en secondes


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
