console.log("hello");

$(document).ready(function () {
  console.log("HELLO");

  // scroll to top
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

  $("#exploreButton").on("click", function () {
    $("#map-container").get(0).scrollIntoView('swing');
  });
  $("#map").on("mousedown", function () {
    $(".content-large").slideDown('swing');
  });
  
//DOCUMENT.READY
});
