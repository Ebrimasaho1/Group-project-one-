//ADD GOOGLE MAPS API HERE
var map;
function initMap(searchResultMap) {
    map = new google.maps.Map(document.getElementById('map-div'), {
        center: { lat: -34.397, lng: 150.644 },
        zoom: 8
    });
}