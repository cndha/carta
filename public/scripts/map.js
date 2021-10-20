console.log("😈");

//CHECK FOR GOOGLE PLACES API
//https://developers.google.com/maps/documentation/javascript/places-autocomplete

$(document).ready(function () {
  console.log("👻");

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

    // new google.maps.Marker({
    //   position: myLatlng,
    //   map,
    //   title: "Hello World!",
    // });

    const marker = new google.maps.Marker({
      position: { lat: 49.25772100646572, lng: -123.237075609375 },
      title: "Hello World!"
    });
    marker.setMap(map);

    // addMarker() when the map is clicked.
    google.maps.event.addListener(map, "click", (event) => {
      addMarker(event.latLng, map);
    });
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

  // $(function() {
  //   const $button = $('#map');
  //   $button.on('click', function () {
  //     console.log('Button clicked, performing ajax call...');
  //     $.ajax('** database **', { method: 'GET' })
  //     .then(function (mapMarker) {
  //       console.log('Success: ', mapMarker);
  //       $button.replaceWith(mapMarker);
  //     });
  //   });
  // });








  function toggleBounce() {
    if (marker.getAnimation() !== null) {
      marker.setAnimation(null);
    } else {
      marker.setAnimation(google.maps.Animation.BOUNCE);
    }
  }

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

  $("#search-query").on("submit", (event) => {
    event.preventDefault();

    $.ajax({
      url: "/create/information/ask",
      method: "GET",
      data: $('#search-input').val(),
      success: (data) => {
        console.log(data)
        //formatted address:
        const formattedAddress = data.results[0].formatted_address;
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

        //outputs to browser
        document.getElementById('formatted_address').innerHTML = outputAddress;
        document.getElementById('components').innerHTML = componentsOutput;
        document.getElementById('geometry').innerHTML = geometryOutput;
      },
      error: (error) => {
        console.log(error)
      }
    })
  })


  initMap();
});





// custom icons and labels
// to the base of the flagpole.

$(document).ready(function () {

  // function initMap() {
  //   const map = new google.maps.Map(document.getElementById("map"), {
  //     zoom: 10,
  //     center: { lat: -33.9, lng: 151.2 },
  //   });

  //   setMarkers(map);
  // }

  // // Data for the markers consisting of a name, a LatLng and a zIndex for the
  // // order in which these markers should display on top of each other.
  // const beaches = [
  //   ["Bondi Beach", -33.890542, 151.274856, 4],
  //   ["Coogee Beach", -33.923036, 151.259052, 5],
  //   ["Cronulla Beach", -34.028249, 151.157507, 3],
  //   ["Manly Beach", -33.80010128657071, 151.28747820854187, 2],
  //   ["Maroubra Beach", -33.950198, 151.259302, 1],
  // ];

  // function setMarkers(map) {
  //   // Adds markers to the map.
  //   // Marker sizes are expressed as a Size of X,Y where the origin of the image
  //   // (0,0) is located in the top left of the image.
  //   // Origins, anchor positions and coordinates of the marker increase in the X
  //   // direction to the right and in the Y direction down.
  //   const image = {
  //     url: "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png",
  //     // This marker is 20 pixels wide by 32 pixels high.
  //     size: new google.maps.Size(20, 32),
  //     // The origin for this image is (0, 0).
  //     origin: new google.maps.Point(0, 0),
  //     // The anchor for this image is the base of the flagpole at (0, 32).
  //     anchor: new google.maps.Point(0, 32),
  //   };
  //   // Shapes define the clickable region of the icon. The type defines an HTML
  //   // <area> element 'poly' which traces out a polygon as a series of X,Y points.
  //   // The final coordinate closes the poly by connecting to the first coordinate.
  //   const shape = {
  //     coords: [1, 1, 1, 20, 18, 20, 18, 1],
  //     type: "poly",
  //   };

  //   for (let i = 0; i < beaches.length; i++) {
  //     const beach = beaches[i];

  //     new google.maps.Marker({
  //       position: { lat: beach[1], lng: beach[2] },
  //       map,
  //       icon: image,
  //       shape: shape,
  //       title: beach[0],
  //       zIndex: beach[3],
  //     });
  //   }
  // }

});





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
