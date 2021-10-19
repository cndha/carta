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
          map.on("click", (event) => {
            console.log(event);
          })
          map.scrollZoom.disable();
          map.addControl(new mapboxgl.NavigationControl());

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
});
