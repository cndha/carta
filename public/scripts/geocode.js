$(document).ready(function () {

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

})
