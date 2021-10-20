const { addNewMarker } = require("../../routes/database");

console.log("😈");
$(document).ready(function () {
  console.log("👻");

  let marker;

  function initMap() {
    const map = new google.maps.Map(document.getElementById("map"), {
      zoom: 13,
      center: { lat: 49.246292, lng: -123.116226 },
    });

    map.addListener("click", (event) => {
      // console.log("LAT--->", event.latLng.lat());
      $('.latitudeBox').val(event.latLng.lat());

      // console.log("LNG--->", event.latLng.lng());
      $('.longitudeBox').val(event.latLng.lng());
    })

    // google.maps.event.addListener(map, "click", (event) => {
    //   addMarker({coords: event.latLng});
    // })

    marker = new google.maps.Marker({
      map,
      draggable: true,
      animation: google.maps.Animation.DROP,
      position: { lat: 49.251754722903854, lng: -122.97958354394531 },

      //marker location
    });
    marker = new google.maps.Marker({
      map,
      draggable: true,
      animation: google.maps.Animation.DROP,
      position: { lat: 49.273321738192486, lng: -123.24619670100792 },
    })

    marker.addListener("click", toggleBounce);

    // marker.addListener("click", () => {
    //   infoWindow.open(map_id, marker_id)
    // });
  }
  //ajAx request -> db

  function toggleBounce() {
    if (marker.getAnimation() !== null) {
      marker.setAnimation(null);
    } else {
      marker.setAnimation(google.maps.Animation.BOUNCE);
    }
  }
  initMap();

  var geocoder;
  var map;
  function initialize() {
    geocoder = new google.maps.Geocoder();
    var latlng = new google.maps.LatLng(-34.397, 150.644);
    var mapOptions = {
      zoom: 8,
      center: latlng
    }
    map = new google.maps.Map(document.getElementById('map'), mapOptions);
  }

  function codeAddress() {
    var address = document.getElementById('address').value;
    geocoder.geocode({ 'address': address }, function (results, status) {
      if (status == 'OK') {
        map.setCenter(results[0].geometry.location);
        var marker = new google.maps.Marker({
          map: map,
          position: results[0].geometry.location
        });
      } else {
        alert('Geocode was not successful for the following reason: ' + status);
      }
    });
  }

  // $("#ajaxTextForm").submit(function (event) {
  //   alert("Handler for .submit() called.");
  //   event.preventDefault();
  // });

  $("#ajaxButton").on("click", function (event) {
    event.preventDefault();

    $.ajax({
      url: "/create",
      method: "POST",
      data: { latitude: $('.latitudeBox').val(), longitude: $('.longitudeBox').val() },

      success: function (data) {
        console.log("SUCCESS WE DID THE AJAX CALL ON CLIENT'S END")
      },
      error: function (error) {
        console.log(error)
      }
    })

  });


});
