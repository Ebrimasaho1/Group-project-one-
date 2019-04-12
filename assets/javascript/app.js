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

	//ADD GOOGLE MAPS API HERE
	var map;
	function initMap() {
		map = new google.maps.Map(document.getElementById('map'), {
			center: { lat: -34.397, lng: 150.644 },
			zoom: 8
		});
	}
	//ADD YELP API HERE
	var yelpKey = 'hj3IEH41ZB9OxWnEi31vdifki_JQVxL3wGiDhvWLCBoQhNR5JzfAjlVtJs3jPM9ZvCThgbtwDF-kbqBuRHEYATvPrv82r4nH1_mAdl0gVe8EQuxB1jp7nm34HySsXHYx';
	$.ajax({
		xhrFields: {
			withCredentials: true
		},
		beforeSend: function (xhr) {
			xhr.setRequestHeader('Authorization', 'Bearer ' + yelpKey);
		},
		url: "https://api.yelp.com/v3/autocomplete?text=" + searchTerm + "/businesses/search?=" + searchTerm + "/location?=" + location + "/price?=" + price + "/limit?=5"
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
