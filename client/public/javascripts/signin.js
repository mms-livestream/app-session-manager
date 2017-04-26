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
        alert(res.toSource());
        // res.send ma page: window location javascript change
      },
      error: function() {
        // message du pb en html
      }
    });

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
        alert(res.toSource());
      },
      error: function() {
        // message du pb en html
      }
    });

  });

});
