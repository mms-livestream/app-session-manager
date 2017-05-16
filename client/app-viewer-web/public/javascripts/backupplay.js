
$(document).ready(function() {


  var id = sessionStorage.getItem("idVideo");
  var player = dashjs.MediaPlayer().create();
  player.getDebug().setLogToBrowserConsole(false);
  player.initialize();
  player.attachView(document.getElementById('videoplayer'));
  player.attachVideoContainer(document.getElementById('videocontainer'));
  player.setAutoSwitchQuality(false);
  player.enableBufferOccupancyABR(false);
  player.setAutoPlay(false);

  player.attachSource("http://localhost:8080/segment/segment"+id+"/mpd.mpd");


  $(function () {
    var socket = io.connect('http://localhost:8080');
      $('form').submit(function(){
        if ( $('#m').val() != "") {
         socket.emit('chat message', $('#m').val());
         $('#m').val('');
       }
         return false;
      });
        socket.on('chat message', function(msg){

        var date = new Date();
        var hour = date.getHours();
        hour = (hour < 10 ? "0" : "") + hour;
        var min  = date.getMinutes();
        min = (min < 10 ? "0" : "") + min;
        var sec  = date.getSeconds();
        sec = (sec < 10 ? "0" : "") + sec;
        var now=hour+":"+min+":"+sec;

      $('#messages').append($('<small class="text-muted" >').text(now));
      $('#messages').append($('<li>').text(msg));

    });
  });

});
