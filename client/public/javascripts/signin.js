$(document).ready(function() {
  $('#login').find('button').click(function(e) {
    e.preventDefault();
    var username=$('#login').find(".inputUsername").val();
    var password=$('#login').find(".inputPassword").val();

    $.ajax({
      type: "POST",
      url: "/api/login",
      data: {"username": username, "password": password},
      dataType: "json",
      success: function(res) {
        if (res.status=="User not found") {
          $('#login').find('.err').show();
        }
        else {
          sessionStorage.setItem("token",res.token);
          window.location.replace("http://localhost:8080/home");
        }
      },
      error: function() {
        // message du pb en html
      }
    });
  });

  $('#login').find('a').click(function(e) {
   $('#register').show();
   $('#login').hide();
  });


  $('#register').find('button').click(function(e) {
    e.preventDefault();
    var username=$('#register').find(".inputUsername").val();
    var password=$('#register').find(".inputPassword").val();
    var email=$('#register').find(".inputEmail").val();

    $.ajax({
      type: "POST",
      url: "/api/register",
      data: {"username": username, "password": password, "email": email},
      dataType: "json",
      success: function(res) {
        sessionStorage.setItem("token",res.token);
      },
      error: function() {
        // message du pb en html
      }
    });

  });

});
