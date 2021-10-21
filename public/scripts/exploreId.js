
$(document).ready(function () {

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
      new google.maps.Marker({
        position: { lat: Number(db[i].latitude), lng: Number(db[i].longitude) },
        map,
        title: db[i].title,
        icon: '/IMGS/marker-small.png',
      })
    }
  };

  $("#buttonPressForStuff").on("click", (event) => {

    $.ajax({
      url: "/explore/afterLoad/1",
      method: "GET",
      data: { id: 1 },
      success: function (data) {

        function initMap() {
          const vancouver = { lat: 49.246292, lng: -123.116226 };
          const map = new google.maps.Map(document.getElementById("map"), {
            zoom: 10,
            center: vancouver,
          });
          retrieveMarkers(data.markers, map);
        }
        initMap();
      },
      error: function (error) {
        console.log(error)
      }
    })

  })

  initMap();
});
