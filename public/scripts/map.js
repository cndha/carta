console.log("😈 BEFORE DOCUMENT>READY");

let marker;
// Each marker is labeled with a single alphabetical character.
const labels = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
let labelIndex = 0;

function initMap() {
  const startCenter = { lat: 49.246292, lng: -123.116226 };
  // startCenter = the [0] of map markers?
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 12,
    center: startCenter,
  });
  // const $title = document.getElementById("title")
  // console.log($title);
  const contentString = '<div id="content">' +
    '<div id="siteNotice">' +
    "</div>" +
    `<h1 id="firstHeading" class="firstHeading">TITLE</h1>` +
    '<div id="bodyContent">' +
    "<p><b>LOCATION</b> " +
    "description " +
    "..... " +
    ".... " +
    "... " +
    " ..</p>" +
    '<p><a href="http://google.com">' +
    "external link</a> " +
    "(last visited June 22, 2009).</p>" +
    "</div>" +
    "</div>";

  const infowindow = new google.maps.InfoWindow({
    content: contentString,
  });
  // FIRST CREATED MARKER
  const marker = new google.maps.Marker({
    draggable: true,
    animation: google.maps.Animation.DROP,
    position: { lat: 49.2727014, lng: -123.1352146 },
    map: map,
    title: "Public Market",
    icon: '/IMGS/marker-small.png',
  });

  marker.addListener("click", () => {
    infowindow.open({
      anchor: marker,
      map,
      shouldFocus: false,
    });
  });
  google.maps.event.addListener(map, 'click', function (event) {
    placeMarker(event.latLng);
  });
  function placeMarker(location) {
    if (marker == undefined) {
      marker = new google.maps.Marker({
        position: location,
        map: map,
        animation: google.maps.Animation.DROP,
      });
    }
    else {
      marker.setPosition(location);
    }
  }

  google.maps.event.addListener(map, 'click', (event) => {

    console.log("LAT--->", event.latLng.lat());
    const lat = event.latLng.lat();
    console.log("LNG--->", event.latLng.lng());
    const lng = event.latLng.lng();

    let latlng = lat + "," + lng;

    $.ajax({
      url: "/create/information/ask",
      method: "GET",
      data: { latLng: latlng },
      success: (data) => {
        //formatted address:
        const formattedAddress = data.results[0].formatted_address;

        $('#formatted_address').val(formattedAddress);

        const lat = data.results[0].geometry.location.lat;
        const lng = data.results[0].geometry.location.lng;

        $('#latitude').val(lat);
        $('#longitude').val(lng);
      },
      error: (error) => {
        console.log(error)
      }
    })

  })

}

$(document).ready(function () {
  console.log("👻 AFTER DOCUMENT>READY");
  function addMarker(location, map) {
    new google.maps.Marker({
      position: location,
      map: map,
    });
    // EVENT ON MAP CLICK ?? SHOULDN'T INPUT FIELD FILL BE IN HERE?

    // google.maps.event.addListener(map, 'click', (event) => {
    //   alert("hello")
    // })

    // map.addListener("click", (event) => {
    //   alert("hello")
    // });

    // $("#map").on("click", (event) => {
    //   alert("hello")
    // })
  }

  //WORKING
  $("#formSearchTerm").on("submit", function (event) {
    event.preventDefault();
    $.ajax({
      url: "/create/information/ask",
      method: "GET",
      data: { latLng: $('#searchTerm').val() },
      success: (data) => {
        //formatted address:
        const formattedAddress = data.results[0].formatted_address;

        $('#formatted_address').val(formattedAddress);

        const lat = data.results[0].geometry.location.lat;
        const lng = data.results[0].geometry.location.lng;

        $('#latitude').val(lat);
        $('#longitude').val(lng);

        // $('#map').val().placeMarker(lat + ',' + lng)

      },
      error: (error) => {
        console.log(error)
      }
    })
  });

  //CREATING THE MAP (profile)
  $("#create").on("click", function (event) {
    event.preventDefault();
    // const address = $('#formatted-address').val();
    const address = $('#formatted-address').text();
    const longitude = $('#longitude').text();
    const latitude = $('#latitude').text();
    $.ajax({
      url: "/create",
      method: "POST",
      // data: { address: address, latitude: $('.latitudeBox').val(), longitude: $('.longitudeBox').val() },
      data: { address: address, latitude: latitude, longitude: longitude },
      success: function (data) {
        console.log("SUCCESS WE DID THE AJAX CALL ON CLIENT'S END")
      },
      error: function (error) {
        console.log(error)
      }
    })
  });

  //saves a pin into the map when creatpin button is pressed
  // CAN'T FIND ID CREATEPIN-------------------------------------->
  $("#createPin").on("click", function (event) {
    event.preventDefault();
    const title = $('#pin-title').text();
    const longitude = $('longitude').text();
    const latitude = $('latitude').text();
    $.ajax({
      url: `/create/pin/`,
      method: "POST",
      data: { title: title, latitude: latitude, longitude: longitude },
      success: function (data) {
        console.log("SUCCESS WE DID THE AJAX CALL ON CLIENT'S END", data)
      },
      error: function (error) {
        console.log(error)
      }
    })
    console.log(event);
  });


  //THIS USE SO THAT TITLE HAS TO BE SENT------------------------> NOT SURE WHICH FUNCTION IS CURRENTLY SENDING DATA IDs ???
  $("#createForm").submit(function (event) {
    event.preventDefault();
    const $title = $('#title');
    const $blank = $title.val().length;
    const $error = $('#error');

    if ($blank === 0 || $count === $blank) {
      console.log("title cannot be left empty");
      // return $error.slideDown('swing');
      // return alert("You're not saying anything");
    }
    const DATA = $("#<------ some form").serialize();
    $.ajax({
      type: "POST",
      url: "/create/",
      data: "<------------something also known as DATA to send",
    })
      .then(function (data) {
      })
      .then(function (data) {
        $error.slideUp('swing');
      })
  })
  //DOCUMENT READY
});


// ********

// // REMOVE MAKER -----> ADD ON.CLICK EVENT
// function SetMarker(position) {
//   //Remove previous Marker.
//   if (marker != null) {
//     marker.setMap(null);
//   }

// //SET MARKER
//   marker = new google.maps.Marker(
//     {
//       map: map,
//       draggable: true,
//       animation: google.maps.Animation.DROP,
//       position: results[0].geometry.location
//     });
//     //DRAG TO REPOSITION MARKER
//   google.maps.event.addListener(marker, 'dragend', function () {
//     geocodePosition(marker.getPosition());
//   });
//   //RETRIEVE GEOCODE LOCATION
//   function geocodePosition(pos) {
//     geocoder = new google.maps.Geocoder();
//     geocoder.geocode
//       ({
//         latLng: pos
//       },
//       //LATLNG POSITION
//       // RETRIEVE FORMATTED ADDRESS
//         function (results, status) {
//           if (status == google.maps.GeocoderStatus.OK) {
//             $("#mapSearchInput").val(results[0].formatted_address);
//             $("#mapErrorMsg").hide(100);
//           }
//           else {
//             $("#mapErrorMsg").html('Cannot determine address at this location.' + status).show(100);
//           }
//         }
//       );
//   }
// }
