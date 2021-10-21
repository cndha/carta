console.log("😈");
//CHECK FOR GOOGLE PLACES API
//https://developers.google.com/maps/documentation/javascript/places-autocomplete

$(document).ready(function() {
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

    const $title = document.getElementById("title");
    console.log($title);
    const contentString = '<div id="content">' +
      '<div id="siteNotice">' +
      "</div>" +
      `<h1 id="firstHeading" class="firstHeading">${$title}</h1>` +
      '<div id="bodyContent">' +
      "<p><b>Uluru</b>, also referred to as <b>Ayers Rock</b>, is a large " +
      "sandstone rock formation in the southern part of the " +
      "Northern Territory, central Australia. It lies 335&#160;km (208&#160;mi) " +
      "south west of the nearest large town, Alice Springs; 450&#160;km " +
      "(280&#160;mi) by road. Kata Tjuta and Uluru are the two major " +
      "features of the Uluru - Kata Tjuta National Park. Uluru is " +
      "sacred to the Pitjantjatjara and Yankunytjatjara, the " +
      "Aboriginal people of the area. It has many springs, waterholes, " +
      "rock caves and ancient paintings. Uluru is listed as a World " +
      "Heritage Site.</p>" +
      '<p>Attribution: Uluru, <a href="https://en.wikipedia.org/w/index.php?title=Uluru&oldid=297882194">' +
      "https://en.wikipedia.org/w/index.php?title=Uluru</a> " +
      "(last visited June 22, 2009).</p>" +
      "</div>" +
      "</div>";

    const infowindow = new google.maps.InfoWindow({
      content: contentString,
    });

    const marker = new google.maps.Marker({
      position: { lat: 49.2727014, lng: -123.1352146 },
      map,
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
      console.log($('#formatted-address'));
      // console.log("LNG--->", event.latLng.lng());
      const lng = event.latLng.lng();
      const latLng = `${lat}, ${lng}`;

      $.ajax({
        url: "/create/information/ask",
        method: "GET",
        data: { latLng: latLng },
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
    })
    //init
  }

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

    const address = $('#formatted-address').val();
    const title = $('#longitude').val();
    const longitude = $('#longitude').val();
    const latitude = $('#latitude').val();

    console.log("THIS IS THE LATITUDE", latitude);

    $.ajax({
      url: "/create",
      method: "GET",
      // data: { address: address, latitude: $('.latitudeBox').val(), longitude: $('.longitudeBox').val() },
      data: { address: address, latitude: latitude, longitude: longitude, title: title },
      success: function (data) {
        console.log("SUCCESS WE DID THE AJAX CALL ON CLIENT'S END")
      },
      error: function (error) {
        console.log(error)
      }
    })
  });

  $("#createForm").on("submit", function (event) {
    event.preventDefault();

    const address = $('#formatted-address').val();
    const title = $('#longitude').val();
    const longitude = $('#longitude').val();
    const latitude = $('#latitude').val();

    console.log("THIS IS THE LATITUDE", address);

    $.ajax({
      url: "/create",
      method: "POST",
      // data: { address: address, latitude: $('.latitudeBox').val(), longitude: $('.longitudeBox').val() },
      data: { address: address, latitude: latitude, longitude: longitude, title: title },
      success: function (data) {
        console.log("SUCCESS WE DID THE AJAX CALL ON CLIENT'S END")
      },
      error: function(error) {
        console.log(error);
      }
    });
  });




  initMap();

});
