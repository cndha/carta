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

// DOCUMENT READY
});
