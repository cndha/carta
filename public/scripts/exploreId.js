function initMap() {
  const vancouver = { lat: 49.246292, lng: -123.116226 };
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 12,
    center: vancouver,
  });
}


function retrieveMarkers(db, map) {
  console.log("IM INSIDE RERTIEVE FUNCTION")
  for (let i = 0; i < db.length; i++) {
    console.log("THIS IS MY INDEX VALUE", db[i])
    const marker = new google.maps.Marker({
      position: { lat: Number(db[i].latitude), lng: Number(db[i].longitude) },
      map,
      title: db[i].title,
      icon: '/IMGS/marker-small.png',
    })
    const infowindow = new google.maps.InfoWindow({
      content: `
      <div id="content">
        <div id="siteNotice"> </div>
        <h1 id="firstHeading" class="firstHeading">${db[i].title}</h1>
        <div id="bodyContent">
        <p><b>${db[i].formatted_Address}</b>
        ${db[i].description}
        </p>
        <p><img src="${db[i].image}"></p>
        </div>
      </div>`
    });
  };
};

let markerStorage = [];

$(document).ready(function () {

  let urlMapId = window.location.href;
  let val = urlMapId[urlMapId.length - 1];

  $.ajax({
    url: `/explore/afterLoad/${val}`,
    method: "GET",
    data: { id: val },
    success: function (data) {
      function initMap() {
        const location = { lat: Number(data.markers[0].latitude), lng: Number(data.markers[0].longitude) };
        const map = new google.maps.Map(document.getElementById("map"), {
          zoom: 12,
          center: location,
        });
        // retrieveMarkers(data.markers, map);
        //----------------------------
        console.log("IM INSIDE RERTIEVE FUNCTION")
        for (let i = 0; i < data.markers.length; i++) {
          console.log("THIS IS MY INDEX VALUE", data.markers[i])

          const infowindow = new google.maps.InfoWindow({
            content: `
            <div id="content">
              <div id="siteNotice"> </div>
              <h1 id="firstHeading" class="firstHeading">${data.markers[i].title}</h1>
              <div id="bodyContent">
              <p><b>${data.markers[i].formatted_address}</b><br>
              ${data.markers[i].description}
              </p>
              <p><img src="${data.markers[i].image}" width= "200" height="100"></p>
              </div>
            </div>`
          });

          let markerToDisplay = new google.maps.Marker({
            position: { lat: Number(data.markers[i].latitude), lng: Number(data.markers[i].longitude) },
            map,
            title: data.markers[i].title,
            icon: '/IMGS/marker-small.png',
            infowindow: infowindow
          })

          markerToDisplay.addListener("click", () => {
            hideAllInfoWindows(map);
            infowindow.open({
              anchor: markerToDisplay,
              map,
              shouldFocus: false,
            });
          });

          //close marker when click on map
          google.maps.event.addListener(map, 'click', function () {
            if (infowindow) {
              infowindow.close();
            }
          });

          markerStorage.push(markerToDisplay);

          function hideAllInfoWindows(map) {
            markerStorage.forEach(function (marker) {
              marker.infowindow.close(map, markerToDisplay);
            });
          }


        }
        //-------------------------------
      }
      initMap();
    },
    error: function (error) {
      console.log(error)
    }
  })
});
