console.log("hello");

// const stores = {
//   "type": "FeatureCollection",
//   "features": [
//     {
//       "type": "Feature",
//       "geometry": {
//         "type": "Point",
//         "coordinates": [
//           -77.034084142948,
//           38.909671288923
//         ]
//       }


//CLIENT
// const escape = function (str) {
//   let div = document.createElement("div");
//   div.appendChild(document.createTextNode(str));
//   return div.innerHTML;
// };

$(document).ready(function () {

  $.get(mapid)
    .then((maps) => {
      console.log(maps);
      renderMapEle(maps)
    })
  const createNewMap = (map) => {
    const $mapEle = $(`
    <div>
    <h2>map name ${map.id} ${map.map_title} </h2>
    <h2>${title}</h2>
    </div>
    `)
    return $mapEle;
  }
  const renderMapEle = (map) => {
    for (const map of maps) {
      const $mapEle = createNewMap(map);
      const $mapContainer = $(`#map-container`) //named html with id contains mapbox
      $mapContainer.append($mapEle);
    }
  }
  const $newmapform = $(`#new-map-form`)
  $newmapform.on('submit', (event) => {
    event.preventDefault();
    const data = $newmapform.serialize();
    console.log(data);
  })

  //to-top
  scrollButton = document.getElementById('scrollUp-btn');
  window.onscroll = () => {
    scrollFunction();
  };

  const scrollFunction = () => {
    if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
      scrollButton.style.display = "block";
    } else {
      scrollButton.style.display = "none";
    }
  };

  $("#scrollUp-btn").click(function() {
    document.documentElement.scrollTop = 0;
  }); 

});

//   //access mapbox with key
//   mapboxgl.accessToken = 'pk.eyJ1IjoiY29wbzEyMyIsImEiOiJja3V2dTdvdHMxcjdrMm9xanBtaGdkaHc4In0.cBeBLEBv8OE9UnZgr7EEzQ';
//   var map = new mapboxgl.Map({
//     container: 'map',
//     style: 'mapbox://styles/mapbox/satellite-streets-v11',
//     center: [-123.116226, 49.246292],
//     zoom: 11.15
//   });
//   // add markers to map
//   for (const feature of geojson.features) {
//     // create a HTML element for each feature
//     const el = document.createElement('div');
//     el.className = 'marker';
//     // make a marker for each feature and add to the map
//     new mapboxgl.Marker(el).setLngLat(feature.geometry.coordinates).addTo(map)
//       .setPopup(
//         new mapboxgl.Popup({ offset: 25 }) // add popups
//           .setHTML(
//             `<h3>${feature.properties.title}</h3><p>${feature.properties.description}</p>`
//           )
//       );
//   }