$(document).ready(function () {
  $(function () {
    $(window).scroll(function () {
      if ($(this).scrollTop() - 200 > 0) {
        $('#to-top').stop().slideDown('fast');
      } else {
        $('#to-top').stop().slideUp('fast');
      }
    });
  });
  $("#to-top").on("click", function () {
    $("html, body").animate({
      scrollTop: 0
    }, 200);
  });

  // $("#addNewMarker").on("click", function () {
  //   $("#newMarkerWrap").slideDown('swing');
  // });

  $("#updateMapButton").on("click", function(e) {
    e.preventDefault();

    let urlMapId = window.location.href;
    let val = urlMapId[urlMapId.length - 1];

    if (urlMapId[urlMapId.length - 2] !== "/") {
      val = urlMapId[urlMapId.length - 2] + val;
    }

    $.ajax({
      type: "POST",
      url: `edit/map/${val}`,
      data: { title: $('#title').val(), description: $('#description').val() },
      sucess: function (data) {
        console.log("SUCCESS WE DID THE AJAX CALL ON CLIENT'S END")
      },
      error: function (error) {
        console.log(error)
      }
    })
  })
});
