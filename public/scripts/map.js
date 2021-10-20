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
    //set marker at center
    // marker.setMap(map);

    // new google.maps.Marker({
    //   position: myLatlng,
    //   map,
    //   title: "Hello World!",
    // });

    // const marker = new google.maps.Marker({
    //   position: { lat: 49.25772100646572, lng: -123.237075609375 },
    //   title: "Hello World!",
    //   icon: '/IMGS/marker-small.png'
    // });

    const contentString = "Food n' Stuff";

    const infowindow = new google.maps.InfoWindow({
      content: contentString,
    });

    const marker = new google.maps.Marker({
      position: { lat: 49.2727014, lng: -123.1352146 },
      map,
      title: "Public Market",
      icon: '/IMGS/marker-small.png'
    });

    marker.addListener("click", () => {
      infowindow.open({
        anchor: marker,
        map,
        shouldFocus: false,
      });
    });




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
      const lat = event.latLng.lat();
      // console.log("LNG--->", event.latLng.lng());
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
          //   <li>${addressComponents[1].types[0]}: ${addressComponents[1].long_name}</li>
          //   <li>${addressComponents[3].types[0]}: ${addressComponents[3].long_name}</li>
          //   <li>${addressComponents[5].types[0]}: ${addressComponents[5].long_name}</li>
          //   <li>${addressComponents[6].types[0]}: ${addressComponents[6].long_name}</li>
          //   <li>${addressComponents[7].types[0]}: ${addressComponents[7].long_name}</li>
          // </class>`;
          let componentsOutput = '<class="list">';
          for (var i = 0; i < addressComponents.length; i++) {
            componentsOutput += `<li>${addressComponents[i].types[0]}: ${addressComponents[i].long_name}</li>`
          }
          componentsOutput += '</class>';

          //lat-long
          const lat = res.data.results[0].geometry.location.lat;
          const lng = res.data.results[0].geometry.location.lng;
          const geometryOutput = `<li>Latitude: ${lat}</li><li>Longitude: ${lng}</li>`;

          //outputs to browser
          document.getElementById('formatted_address').innerHTML = outputAddress;
          document.getElementById('components').innerHTML = componentsOutput;
          document.getElementById('geometry').innerHTML = geometryOutput;
        })
        .catch(error => {
          console.log(error)
        });
    })
  //init
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

  //RETRIEVES LNG/LAT ON cLICK
  $("#ajaxButton").on("click", function (event) {
    event.preventDefault();

    const address = $('#formatted-address').text();

    $.ajax({
      url: "/create",
      method: "POST",
      data: { address: address, latitude: $('.latitudeBox').val(), longitude: $('.longitudeBox').val() },

      success: function (data) {
        console.log("SUCCESS WE DID THE AJAX CALL ON CLIENT'S END")
      },
      error: function (error) {
        console.log(error)
      }
    })
  });

  initMap();
});
