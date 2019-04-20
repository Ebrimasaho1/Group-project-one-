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
var marker;
var marker1;
var marker2;
var marker3;
var marker4;
var lat =  47.62541904760501;
var long = -152.33551025390625;
var lat1 = 0;
var lat2 = 0;
var lat3 = 0;
var lat4 = 0;
var long1 = 0;
var long2 = 0;
var long3 = 0;
var long4 = 0;
var businessName = '';

function initMap() {
    
    map = new google.maps.Map(document.getElementById('map-div'), {
        center: { lat: 47.62541904760501, lng: -122.33551025390625 },
        zoom: 8
    });
}


database.ref().child('/yelp/businesses/0').on('value', function (snap) {
    console.log(snap.val());
    lat = snap.val().coordinates.latitude;
    long = snap.val().coordinates.longitude;
    businessName = snap.val().alias;
    console.log(lat, long, businessName);
    marker = new google.maps.Marker({
        position: {lat: lat, lng: long},
        title: businessName
    });
    map.setCenter({lat: lat, lng: long});
    marker.setMap(map);
    
});

database.ref().child('/yelp/businesses/1').on('value', function (snap) {
    console.log(snap.val());
    lat1 = snap.val().coordinates.latitude;
    long1 = snap.val().coordinates.longitude;
    businessName = snap.val().alias;
    console.log(lat, long, businessName);
    marker1 = new google.maps.Marker({
        position: {lat: lat1, lng: long1},
        title: businessName
    });
    marker1.setMap(map);
    
});

database.ref().child('/yelp/businesses/2').on('value', function (snap) {
    console.log(snap.val());
    lat2 = snap.val().coordinates.latitude;
    long2 = snap.val().coordinates.longitude;
    businessName = snap.val().alias;
    console.log(lat, long, businessName);
    marker2 = new google.maps.Marker({
        position: {lat: lat2, lng: long2},
        title: businessName
    });
    marker2.setMap(map);
    
});

database.ref().child('/yelp/businesses/3').on('value', function (snap) {
    console.log(snap.val());
    lat3 = snap.val().coordinates.latitude;
    long3 = snap.val().coordinates.longitude;
    businessName = snap.val().alias;
    console.log(lat, long, businessName);
    marker3 = new google.maps.Marker({
        position: {lat: lat3, lng: long3},
        title: businessName
    });
    marker3.setMap(map);
    
});

database.ref().child('/yelp/businesses/4').on('value', function (snap) {
    console.log(snap.val());
    lat4 = snap.val().coordinates.latitude;
    long4 = snap.val().coordinates.longitude;
    businessName = snap.val().alias;
    console.log(lat, long, businessName);
    marker4 = new google.maps.Marker({
        position: {lat: lat4, lng: long4},
        title: businessName
    });
    marker4.setMap(map);
    
});

$('#search-btn').on('click', function () {
    marker.setMap(null);
    marker1.setMap(null);
    marker2.setMap(null);
    marker3.setMap(null);
    marker4.setMap(null);
});