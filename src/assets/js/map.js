// google map
$(document).ready(function() {
  var myLatlng = new google.maps.LatLng(25.051094, 121.5928083);
  var mapOptions = {
    zoom: 17,
    center: myLatlng,
  }
  var map = new google.maps.Map(document.getElementById("map"), mapOptions);
  var marker = new google.maps.Marker({
      position: myLatlng,
      title:"CHILLSPACE"
  });
  // To add the marker to the map, call setMap();
  // marker.setMap(map);
});
