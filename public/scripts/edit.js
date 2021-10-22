$(document).ready(function () {
  $("#addNewMarker").on("click", function () {
    $("#newMarkerWrap").slideDown('swing');
  });

  $("#map").on("mousedown", function () {
    $(".content-large").slideDown('swing');
  });
});
