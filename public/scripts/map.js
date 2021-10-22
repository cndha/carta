console.log(":smiling_imp: BEFORE DOCUMENT>READY");
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
      console.log(location);
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
  console.log(":ghost: AFTER DOCUMENT>READY");
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

  //AJAX REQUEST TO LOAD MAPS AFTER YOU SEARCH SOMETHING ON SEARCH BAR IN INDEX
  // $.ajax({
  //   type: "GET",
  //   url: "/explore",
  //   data: { keyWord: $('#searchTerm').val() },
  //   success: function (data) {
  //     appendData(data);
  //   },
  //   error: function (error) {
  //     console.log(error)
  //   }
  // })

  // let appendData = function () {
  //   //appending data to ejs here
  // }


  //AJAX REQUEST FOR WHEN DELETE BUTTON IS PRESSED
  // $.ajax({
  //   type: "DELETE",
  //   url: `/delete/map/${whateversHoldingMapId}`,
  //   data: { mapIp: whateversHoldingMapId },
  //   success: function (data) {

  //   },
  //   error: function (error) {
  //     console.log(error)
  //   }
  // })


  // AJAX REQUEST TO LOAD MAPS AFTER YOU CLICK FAVORITES

  $("#favorites").on("click", function (event) {
    event.preventDefault();

    $.ajax({
      type: "GET",
      url: "/profile/favorites",
      success: function (data) {

        appendData(data);
      },
      error: function (error) {
        console.log(error)
      }
    })
  });
  
  $("#contributions").on("click", function (event) {
    event.preventDefault();
    $.ajax({
      type: "GET",
      url: "/profile/contributions",
      success: function (data) {

        appendData(data);
      },
      error: function (error) {
        console.log(error)
      }
    })
  });

  $("#mine").on("click", function (event) {
    event.preventDefault();
    $.ajax({
      type: "GET",
      url: "/profile/userMaps",
      success: function (data) {
        appendDataForMyMaps(data);
      },
      error: function (error) {
        console.log(error)
      }
    })
  });

  let appendData = function (data) {

    let $finalStringToPut = "";

    for (let i = 0; i < data.length; i++) {

      let $stringToAppend =
        `<div class="wrapper">
        <div class="frame">
          <div class="preview">
            <img src="/IMGS/thumbnail.jpg">
          </div>
          <div class="description">
            <h1>
            ${data[i].title}
            </h1>
            <p>
            ${data[i].description}
            </p>

          </div>
        </div>
        <div class="right">
          <span class="likes">
            <i class="fas fa-heart"></i>
            ${data[i].likes}
          </span>
          <div class="edit">
            <form method="GET" action="profile/edit/id">
              <i class="fas fa-edit"></i>
            </form>
            <form method="GET" action="profile/delete/id">
              <i class="fas fa-trash-alt" style="margin-left: 10px;"></i>
            </form>
          </div>
        </div>
      </div>`

      $finalStringToPut = $finalStringToPut + $stringToAppend;
    }

    let $output = $($finalStringToPut);
    let node = document.getElementById('explore');
    node.innerHTML = "";
    $('#explore').append($output)
  }

  let appendDataForMyMaps = function (data) {

    let $finalStringToPut = "";

    for (let i = 0; i < data.length; i++) {

      let $stringToAppend =
        `
        <div class="wrapper">
          <div class="frame">
            <div class="preview">
              <img src="/IMGS/thumbnail.jpg">
            </div>
            <div class="description">
              <h1>
              ${data[i].title}
              </h1>
              <p>
              ${data[i].description}
              </p>
            </div>
          </div>
          <div class="right">
            <span class="likes">
              <i class="fas fa-heart" style="margin-right: 25px;"></i>
              <p>
              ${data[i].likes}
              </p>
            </span>
            <div class="edit">
              <form method="GET" action="profile/edit/id">
                <i class="fas fa-edit" id="${data[i].id}""></i>
              </form>
              <form method="GET" action="profile/delete/id">
                <i class="fas fa-trash-alt" style="margin-left: 20px;"></i>
              </form>
            </div>
          </div>
        </div>`
      $finalStringToPut = $finalStringToPut + $stringToAppend;
    }

    let $output = $($finalStringToPut);
    let node = document.getElementById('explore');
    node.innerHTML = "";
    $('#explore').append($output)
  }

  // press to redirect to edit
  $(document).on('click', '.fa-edit', function (event) {

    window.location.assign(`http://localhost:8080/edit/${event.target.id}`);

    // location.href = `http://localhost:8080/edit/${event.target.id}`

  })
  //DOCUMENT READY

  let mostRecentMapId = 0;


  $("#createMapButton").on("click", function (event) {
    event.preventDefault();
    $.ajax({
      type: "POST",
      url: "/create",
      data: { title: $('#title').val(), description: $('#description').val() },
      success: function (data) {

        console.log("SUCCESS WITH CREATE MAP!")
        mostRecentMapId = data.id;
        console.log("Most recent map id:", mostRecentMapId)

      },
      error: function (error) {
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

  $("#createMarkerButton").on("click", function (event) {
    event.preventDefault();

    let image = "https://previews.123rf.com/images/draganche/draganche1907/draganche190700013/128680797-road-through-the-forest-nice-place-for-a-picnic-with-friends-.jpg";

    console.log("BEFORE JQUERY CALL MAP ID IS THIS:", mostRecentMapId)

    $.ajax({
      type: "POST",
      url: `create/pin/${mostRecentMapId}`,
      data: { longitude: $('#longitude').val(), latitude: $('#latitude').val(), map_id: mostRecentMapId, image: image, formatted_Address: $('#formatted_address').val(), title: $('#title').val(), description: "I love this place!" },
      sucess: function (data) {
        console.log("SUCCESS WE DID THE AJAX CALL ON CLIENT'S END")
      },
      error: function (error) {
        console.log(error)
      }
    })

  })
});
