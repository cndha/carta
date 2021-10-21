
$(document).ready(function () {
  function initMap(obj) {
    const vancouver = { lat: 49.246292, lng: -123.116226 };
    const map = new google.maps.Map(document.getElementById("map"), {
      zoom: 12,
      center: vancouver,
    });
    retrieveMarkers(db);
  }

  function retrieveMarkers(db) {
    for (let x = 0; x < db.length; x++) {
      new google.maps.Marker({
        position: { lat: db[i].latitude, lng: db[i].longitude },
        map: map,
        title: db[i].title,
      })
    }
  };
  initMap();
});
