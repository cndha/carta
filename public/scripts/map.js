console.log("😈 BEFORE DOCUMENT>READY");

let marker;
// Each marker is labeled with a single alphabetical character.
const labels = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
let labelIndex = 0;

function initMap() {
  const vancouver = { lat: 49.246292, lng: -123.116226 };
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 12,
    center: vancouver,
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
}

$(document).ready(function () {
  console.log("👻 AFTER DOCUMENT>READY");
  function addMarker(location, map) {
    new google.maps.Marker({
      position: location,
      map: map,
    });
    map.addListener("click", (event) => {
    // google.maps.event.addListener(map, 'click', (event) => {
    //   $('#map').on('click', (event) => {
      console.log($('#formatted-address'))
      console.log("LAT--->", event.latLng.lat());
      const lat = event.latLng.lat();
      console.log("LNG--->", event.latLng.lng());
      const lng = event.latLng.lng();
      const latLng = `${lat}, ${lng}`;
      axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
        params: {
          address: latLng,
          key: 'AIzaSyCloL_uI_F9x3edJ_zViI7qC5zoq9u2HZg'
        }
      })
        .then(res => {
          console.log(res);
          //formatted address:
          const formattedAddress = res.data.results[0].formatted_address;
          const outputAddress = `
                <class="list">
                  <li id="formatted-address">${formattedAddress}</li>
                </class>`;
          //loop through address components
          const addressComponents = res.data.results[0].address_components;
          // let componentsOutput = `
          // <class="list">
          //   <li>${addressComponents[0].types[0]}: ${addressComponents[0].long_name}</li>
          // </class>`;
          let componentsOutput = '<class="list">';
          for (var i = 0; i < addressComponents.length; i++) {
            componentsOutput += `<li>${addressComponents[i].types[0]}: ${addressComponents[i].long_name}</li>`
          }
          componentsOutput += '</class>';

          //lat-long
          const lat = res.data.results[0].geometry.location.lat;
          const lng = res.data.results[0].geometry.location.lng;
          const geometryOutput = `<li id="latitude">Latitude: ${lat}</li><li id="Longitude">Longitude: ${lng}</li>`;

          $('#formatted_address').val(formattedAddress);
          $('#latitude').val(lat);
          $('#longitude').val(lng);
          //outputs to browser
          document.getElementById('formatted_address').innerHTML = outputAddress;
          document.getElementById('components').innerHTML = componentsOutput;
          document.getElementById('geometry').innerHTML = geometryOutput;
        })
        .catch(error => {
          console.log(error)
        });
    })
  }
//for EXPLORE/:id
  $("#goForm").on("submit", function (event) {
    event.preventDefault();
    $.ajax({
      url: "/create/information/ask",
      method: "GET",
      data: { latLng: $('#search').val() },
      success: (data) => {
        //formatted address:
        const formattedAddress = data.results[0].formatted_address;

        $('#formatted_address').val(formattedAddress);

        const outputAddress = `<class="list"><li>${formattedAddress}</li></class>`;
        //loop through address components
        const addressComponents = data.results[0].address_components;
        let componentsOutput = `<class="list">`

        for (var i = 0; i < addressComponents.length; i++) {
          componentsOutput += `<li>${addressComponents[i].types[0]}: ${addressComponents[i].long_name}</li>`
        }
        componentsOutput += '</class>';

        const lat = data.results[0].geometry.location.lat;
        const lng = data.results[0].geometry.location.lng;
        const geometryOutput = `<li>Latitude: ${lat}</li><li>Longitude: ${lng}</li>`;

        $('#latitude').val(lat);
        $('#longitude').val(lng);
        //outputs to browser
        document.getElementById('formatted_address').innerHTML = outputAddress;
        document.getElementById('components').innerHTML = componentsOutput;
        document.getElementById('geometry').innerHTML = geometryOutput;
      },
      error: (error) => {
        console.log(error)
      }
    })
  });

  //RETRIEVES LNG/LAT ON cLICK
  $("#create").on("click", function (event) {
    event.preventDefault();
    // const address = $('#formatted-address').val();
    const address = $('#formatted-address').text();
    const longitude = $('longitude').text();
    const latitude = $('latitude').text();
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