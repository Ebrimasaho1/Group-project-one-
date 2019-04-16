//INITAILIZE FIREBASE
var config = {
    apiKey: "AIzaSyD_baRSHcSt4zUg6eUi6rupCghjOdB5jfQ",
    authDomain: "group-project-one-f2dd4.firebaseapp.com",
    databaseURL: "https://group-project-one-f2dd4.firebaseio.com",
    projectId: "group-project-one-f2dd4",
    storageBucket: "group-project-one-f2dd4.appspot.com",
    messagingSenderId: "392304607656"
};
firebase.initializeApp(config);
var database = firebase.database();

//ADD GOOGLE MAPS API HERE
var map;

// var lat =  47.62541904760501;
// var long = -152.33551025390625;

function initMap() {
    map = new google.maps.Map(document.getElementById('map-div'), {
        center: { lat: 47.62541904760501, lng: -122.33551025390625 },
        zoom: 8
    });
};
database.ref().child('/yelp/businesses/0').on('value', function (snap) {
    console.log(snap.val());
    lat = snap.val().coordinates.latitude;
    long = snap.val().coordinates.longitude;
    businessName = snap.val().alias;
    console.log(lat, long, businessName);
});

var marker = new google.maps.Marker({
    position: {lat: lat, lng: long},
    title: businessName
});

// To add the marker to the map, call setMap();
marker.setMap(map);
