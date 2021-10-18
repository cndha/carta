//CLIENT

const escape = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

$(document).ready(function () {
  map.on('load', () => {
    map.addLayer({
      id: 'terrain-data',
      type: 'line',
      source: {
        type: 'vector',
        url: 'mapbox://mapbox.mapbox-terrain-v2'
      },
      'source-layer': 'contour'
    });
  });


});