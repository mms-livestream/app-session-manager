

$('#logout').find('a').click(function(e) {
  sessionStorage.removeItem("token");
});

$('#about').find('a').click(function(e) {
  e.preventDefault();
  sessionStorage.getItem("token");
  $.ajax({
    type: "GET",
    url: "/api/home/about",
    data: {"token": sessionStorage.getItem("token")},
    dataType: "json",
    success: function(res) {
      window.location.replace("http://localhost:8080/home/about");
    },
    error: function() {
      // message du pb en html
    }
  });
});
