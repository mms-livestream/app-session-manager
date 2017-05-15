

$('#logout').find('a').click(function(e) {
  sessionStorage.removeItem("token");
});

$('#about').find('a').click(function(e) {
  e.preventDefault();
  var token = sessionStorage.getItem('token');
  $.ajax({
    type: "GET",
    url: "/home/about",
    headers: { "Authorization": token},
    dataType: "json",
    success: function(res) {
      var result= parse(res.sendFile);
      window.location.replace(result);
    },
    error: function() {
      // message du pb en html
    }
  });
});
