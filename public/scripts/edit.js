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
});
