//ADD GOOGLE MAPS API HERE
var map;

var lat =  47.62541904760501;
var long = -152.33551025390625;

function initMap() {
    map = new google.maps.Map(document.getElementById('map-div'), {
        center: { lat: lat, lng: long },
        zoom: 8
    });
}