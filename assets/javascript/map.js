//ADD GOOGLE MAPS API HERE
var map;
function initMap() {
    map = new google.maps.Map(document.getElementById('map-div'), {
        center: { lat: 47.62541904760501, lng: -122.33551025390625 },
        zoom: 8
    });
};

