console.log("hello");

$(document).ready(function () {
  console.log("HELLO");
  mapboxgl.accessToken = 'pk.eyJ1IjoiY29wbzEyMyIsImEiOiJja3V2dTdvdHMxcjdrMm9xanBtaGdkaHc4In0.cBeBLEBv8OE9UnZgr7EEzQ';
  var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/satellite-streets-v11',
    center: [-123.116226, 49.246292],
    zoom: 11.15
  });
  const geocoder = new MapboxGeocoder({
    accessToken: mapboxgl.accessToken,
    marker: {
    color: '#243918'
    },
    mapboxgl: mapboxgl
    });
     
    map.addControl(geocoder);

    map.scrollZoom.disable();
  //GET LOCATION DATA ON CLICK
  // map.on("click", (event) => {
  //   console.log(event);
  // })
  const geojson = {
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [-123.1340, 49.2712]
        },
        properties: {
          title: 'yummmmmmy',
          description: 'Granville Island'
        }
      },
      {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [-123.1683, 49.2684]
        },
        properties: {
          title: 'Kits',
          description: 'Kitsilano'
        }
      }
    ]
  };
  // add markers to map
  for (const feature of geojson.features) {
    // create a HTML element for each feature
    const el = document.createElement('div');
    el.className = 'marker';
    // make a marker for each feature and add to the map
    new mapboxgl.Marker(el).setLngLat(feature.geometry.coordinates).addTo(map)
      .setPopup(
        new mapboxgl.Popup({ offset: 25 }) // add popups
          .setHTML(
            `<h3 class="pop-title">${feature.properties.title}</h3><p>${feature.properties.description}</p>`
          )
      );
  }

  // scroll to top        
  $(function () {
    $(window).scroll(function () {
      if ($(this).scrollTop() - 200 > 0) {
        $('#to-top').stop().slideDown('fast');
      } else {
        $('#to-top').stop().slideUp('fast');
      }
    });
  });
  $("#to-top").on("click", function () {
    $("html, body").animate({
      scrollTop: 0
    }, 200);
  });

  geocode('false creek');
  function geocode(location){
   axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${location}.json?access_token=pk.eyJ1IjoiY29wbzEyMyIsImEiOiJja3V2dTdvdHMxcjdrMm9xanBtaGdkaHc4In0.cBeBLEBv8OE9UnZgr7EEzQ`, {
     params:{
       accessToken: 'pk.eyJ1IjoiY29wbzEyMyIsImEiOiJja3V2dTdvdHMxcjdrMm9xanBtaGdkaHc4In0.cBeBLEBv8OE9UnZgr7EEzQ'
     }
   })
   .then(function(response){
     console.log(response);
   })
   .catch((err) => {
     console.log("error", err);
   })
 }

//google
function initMap() {
  const center = new google.maps.LatLng(-33.712451, 150.311823);
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 9,
    center: center,
  });
  const svgMarker = {
    path: "M10.453 14.016l6.563-6.609-1.406-1.406-5.156 5.203-2.063-2.109-1.406 1.406zM12 2.016q2.906 0 4.945 2.039t2.039 4.945q0 1.453-0.727 3.328t-1.758 3.516-2.039 3.070-1.711 2.273l-0.75 0.797q-0.281-0.328-0.75-0.867t-1.688-2.156-2.133-3.141-1.664-3.445-0.75-3.375q0-2.906 2.039-4.945t4.945-2.039z",
    fillColor: "blue",
    fillOpacity: 0.6,
    strokeWeight: 0,
    rotation: 0,
    scale: 2,
    anchor: new google.maps.Point(15, 30),
  };

  new google.maps.Marker({
    position: map.getCenter(),
    icon: svgMarker,
    map: map,
  });
}

});
