console.log("😈");
$(document).ready(function () {
  console.log("👻");

  let marker;
  // In the following example, markers appear when the user clicks on the map.
// Each marker is labeled with a single alphabetical character.
const labels = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
let labelIndex = 0;

function initMap() {
  const vancouver = { lat: 49.246292, lng: -123.116226 };
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 12,
    center: vancouver,
  });

  // This event listener calls addMarker() when the map is clicked.
  google.maps.event.addListener(map, "click", (event) => {
    addMarker(event.latLng, map);
  });
  // Add a marker at the center of the map.
  addMarker(vancouver, map);
}
 

// Adds a marker to the map.
function addMarker(location, map) {
  // Add the marker at the clicked location, and add the next-available label
  // from the array of alphabetical characters.
  new google.maps.Marker({
    position: location,
    label: labels[labelIndex++ % labels.length],
    map: map,
  });

  map.addListener("click", (event) => {
    // console.log("LAT--->", event.latLng.lat());
    $('.latitudeBox').val(event.latLng.lat());

    // console.log("LNG--->", event.latLng.lng());
    $('.longitudeBox').val(event.latLng.lng());
  })
}

/// ------------> BELOW DOESNT PLACE A MARKER. 
///  -----------> lng and lat from event listener "onclick"

  // function initMap() {
  //   const map = new google.maps.Map(document.getElementById("map"), {
  //     zoom: 12.5,
  //     center: { lat: 49.246292, lng: -123.116226 },
  //   });
  //   map.addListener("click", (event) => {
  //     // console.log("LAT--->", event.latLng.lat());
  //     $('.latitudeBox').val(event.latLng.lat());

  //     // console.log("LNG--->", event.latLng.lng());
  //     $('.longitudeBox').val(event.latLng.lng());
  //   })

  //   marker = new google.maps.Marker({
  //     map,
  //     draggable: true,
  //     animation: google.maps.Animation.DROP,
  //     position: { lat: 49.251754722903854, lng: -122.97958354394531 },

  //     //marker location
  //   });
  //   marker = new google.maps.Marker({
  //     map,
  //     draggable: true,
  //     animation: google.maps.Animation.DROP,
  //     position: { lat: 49.273321738192486, lng: -123.24619670100792 },
  //   })

  //   marker.addListener("click", toggleBounce);
  // }
  
  // //ajAx request -> db

  function toggleBounce() {
    if (marker.getAnimation() !== null) {
      marker.setAnimation(null);
    } else {
      marker.setAnimation(google.maps.Animation.BOUNCE);
    }
  }
  initMap();

  // var geocoder;
  // var map;
  // function initialize() {
  //   geocoder = new google.maps.Geocoder();
  //   var latlng = new google.maps.LatLng(-34.397, 150.644);
  //   var mapOptions = {
  //     zoom: 8,
  //     center: latlng
  //   }
  //   map = new google.maps.Map(document.getElementById('map'), mapOptions);
  // }

  // function codeAddress() {
  //   var address = document.getElementById('address').value;
  //   geocoder.geocode({ 'address': address }, function (results, status) {
  //     if (status == 'OK') {
  //       map.setCenter(results[0].geometry.location);
  //       var marker = new google.maps.Marker({
  //         map: map,
  //         position: results[0].geometry.location
  //       });
  //     } else {
  //       alert('Geocode was not successful for the following reason: ' + status);
  //     }
  //   });
  // }

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
