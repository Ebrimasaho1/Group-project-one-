$(document).ready(function () {
	// Initialize Firebase
	var config = {
		apiKey: "AIzaSyD_baRSHcSt4zUg6eUi6rupCghjOdB5jfQ",
		authDomain: "group-project-one-f2dd4.firebaseapp.com",
		databaseURL: "https://group-project-one-f2dd4.firebaseio.com",
		projectId: "group-project-one-f2dd4",
		storageBucket: "group-project-one-f2dd4.appspot.com",
		messagingSenderId: "392304607656"
	};
	firebase.initializeApp(config);

	//ADD VARIABLES FOR APP HERE
	var searchTerm;
	var location;
	var price;
	var ratings;
	var cuisine;


	//ADD GOOGLE MAPS API HERE
	var map;
	function initMap() {
		map = new google.maps.Map(document.getElementById('map'), {
			center: { lat: -34.397, lng: 150.644 },
			zoom: 8
		});
	}

	// search button to initiate 
	$('#search-btn').on('click', function () {
		searchTerm = $('.bld-selector').val();
		console.log(searchTerm);
		
		location = $('#Location-search').val();

		console.log(location);
		
		ratings = $('.ratings-selector').val();
		console.log(ratings);
		
		price = $('.cost-selector').val();
		console.log(price);
		
		cuisine = $('#cuisine-search').val();
		console.log(cuisine);
		

		//Client ID
		// xascU5ugK2Ug2q-JjxjZQQ

		//ADD YELP API HERE
		var queryURL = 'p_8oTalIkZpUAr2YHAezKSGLi08fBObQUd1OYhnnVq9NH8kMNK-nmqgrvftLHXLix9FirSJqPp9Ejh2zpzftSkhxl3-Tn64dXLgU40eJG5otnRLpclSJCzL8mjCxXHYx';

		$.ajax({
			xhrFields: {
				withCredentials: true
			},
			beforeSend: function (xhr) {
				xhr.setRequestHeader('Authorization: Bearer ' + queryURL);
			},
			url: "https://api.yelp.com/v3/businesses/search?term=" + searchTerm + "&/location?=" + location + "&/price?=" + price + "&/rating?=" + ratings + "/limit?=5",
			method: 'GET',
			dataType: 'json',
		}).then(function (response) {
			console.log("hjhbkj");


		})
		//searchparam()
	});
})

//input validation for phone number and email
//Phone validation
function phoneValidate() {
	var num = document.getElementById("phone-input").value;


	if (isNaN(num)) {
		var text = "Enter only numeric value";
		document.getElementById("errMessage").innerHTML = text;
		console.log(text);
		return false;
	}
	if (num.length < 10 || num.length > 10) {
		var text = "number must be 10 digits";
		document.getElementById("errMessage").innerHTML = text;
		return false;
	}


	if (num.charAt(0) != 2 && num.charAt(0) != 3 && num.charAt(0) != 4 && num.charAt(0) != 5 && num.charAt(0) != 6 && num.charAt(0) != 7 && num.charAt(0) != 8 && num.charAt(0) != 9) {
		var text = "first digit must not be zero";
		document.getElementById("errMessage").innerHTML = text;
		return false;
	}
	else {
		var text = "Success";
		document.getElementById("errMessage").innerHTML = text;
	}
}


// email validation

function emailValidate() {

	var email = document.getElementById("email-input").value;
	if (email.indexOf('@') <= 0) {
		var text = "@ character must be present";
		document.getElementById("errMessage").innerHTML = text;
		return false;
	}
	if (email.charAt(email.length - 4) != "." && email.charAt(email.length - 3) != ".") {
		var text = "Incorrect location of '.'";
		document.getElementById("errMessage").innerHTML = text;
		return false;
	}
	else {
		var text = "Success";
		document.getElementById("errMessage").innerHTML = text;
	}
}

// function searchparam(){
// 	var ratingsValidate = document.getElementById("ratingsVal").value;

// 	if (ratingsValidate < 1 || ratingsValidate > 5){
// 		var text = "ratings should be between 1-5";
// 		document.getElementById("ratingsErr").innerHTML = text;
// 	}
// }