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
    // Create the search box and link it to the UI element.
    const input = document.getElementById("pac-input");
    const searchBox = new google.maps.places.SearchBox(input);

    map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
    // Bias the SearchBox results towards current map's viewport.
    map.addListener("bounds_changed", () => {
      searchBox.setBounds(map.getBounds());
    });

    let markers = [];

    // Listen for the event fired when the user selects a prediction and retrieve
    // more details for that place.
    searchBox.addListener("places_changed", () => {
      const places = searchBox.getPlaces();

      if (places.length == 0) {
        return;
      }

      // Clear out the old markers.
      markers.forEach((marker) => {
        marker.setMap(null);
      });
      markers = [];

      // For each place, get the icon, name and location.
      const bounds = new google.maps.LatLngBounds();

      places.forEach((place) => {
        if (!place.geometry || !place.geometry.location) {
          console.log("Returned place contains no geometry");
          return;
        }

        const icon = {
          url: place.icon,
          size: new google.maps.Size(71, 71),
          origin: new google.maps.Point(0, 0),
          anchor: new google.maps.Point(17, 34),
          scaledSize: new google.maps.Size(25, 25),
        };

        // Create a marker for each place.
        markers.push(
          new google.maps.Marker({
            map,
            icon,
            title: place.name,
            position: place.geometry.location,
          })
        );
        if (place.geometry.viewport) {
          // Only geocodes have viewport.
          bounds.union(place.geometry.viewport);
        } else {
          bounds.extend(place.geometry.location);
        }
      });
      map.fitBounds(bounds);
    });

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
