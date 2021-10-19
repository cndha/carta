console.log("😈");
$(document).ready(function () {
  console.log("👻");

  let marker;

  function initMap() {
    const map = new google.maps.Map(document.getElementById("map"), {
      zoom: 13,
      center: { lat: 49.246292, lng: -123.116226 },
    });
  
    marker = new google.maps.Marker({
      map,
      draggable: true,
      animation: google.maps.Animation.DROP,
      position: { lat: 49.246292, lng: -123.116226 },
    });
    marker.addListener("click", toggleBounce);
  }
  
  
  function toggleBounce() {
    if (marker.getAnimation() !== null) {
      marker.setAnimation(null);
    } else {
      marker.setAnimation(google.maps.Animation.BOUNCE);
    }
  }
  initMap();
});
