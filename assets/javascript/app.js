	//ADD VARIABLES FOR APP HERE
	var searchTermGLOBAL;
	// var location;
	// var price;
	// var ratings;
	// var cuisine;
	var resultsArray = [];



$(document).ready(function () {
	// //ADD VARIABLES FOR APP HERE
	var searchTerm;
	var location;
	var price;
	var ratings;
	var cuisine;
	// var resultsArray = [];

	//ADD YELP API HERE
	var yelpKey = 'hj3IEH41ZB9OxWnEi31vdifki_JQVxL3wGiDhvWLCBoQhNR5JzfAjlVtJs3jPM9ZvCThgbtwDF-kbqBuRHEYATvPrv82r4nH1_mAdl0gVe8EQuxB1jp7nm34HySsXHYx';

	$('#search-btn').on('click', function () {
		// Prevent default auto load here:
		event.preventDefault();

		searchTerm = $('.bld-selector').val();
		location = $('#Location-search').val();
		ratings = $('.ratings-selector').val();
		price = $('.cost-selector').val();
		cuisine = $('#cuisine-search').val();
		console.log(searchTerm, location, ratings, price);

		searchTermGLOBAL = searchTerm;

		var yelpURL = "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=" + searchTerm;

		if (cuisine != '') {
			// Case where user wnats a specific cuisine in the Meal-Time
			yelpURL += ('&categories=' + cuisine);
		}
		if (location != '') {
			yelpURL += ('&location=' + location);
		} else {
			// Autofill case
			yelpURL += ('&location=' + 'Seattle');
		}
		// yelpURL += "/price?=" + price + "/rating?=" + ratings + "/limit?=5"
		yelpURL += "&price=" + price + "&limit=5"

		console.log(yelpURL);

		$.ajax({
			method: 'GET',
			headers: {
				"Authorization": `Bearer ${yelpKey}`
			},
			url: yelpURL,

		}).then(function (response) {
			console.log('Querying Yelp now...');
			console.log(response);
			// searchResults(response);

			resultsArray = response.businesses;
			console.log(resultsArray);

			// Clear the contents of results
			$("#search-results-div").empty();

			for (i = 0; i < response.businesses.length; i++) {
				searchResults(response.businesses[i], i, "search-results-div", false);
			}

			database.ref().child('/yelp/businesses').set(response.businesses);

			console.log("Stop here");
		}).catch(function (error) {
			console.log(error);
		})

		console.log(resultsArray);
	});

});



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
	phoneData();
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
	emailData();
}

// Storing phone and email into local storage
function phoneData() {
	$("#phone-input").each(function () {
		var phoneNum = $(this).val();
		localStorage.setItem("Phone", phoneNum);
	});
}

function emailData() {
	$("#email-input").each(function () {
		var emailAdd = $(this).val();
		localStorage.setItem("Email", emailAdd);
	});

}

// SHIP IT CLICK FUNCTION FOR PHONE NUMMBER
//Firebase
$('#phone-sub').on('click', function () {
	database.ref().child('/user/phone').set($('#phone-input').val());
});

// SHIP IT CLICK FUNCTION FOR EMAIL
$('#email-sub').on('click', function () {
	database.ref().child('/user/email').set($('#email-input').val());
});

//

//displaying search results in div
function searchResults(data, index, targetDiv, isSelect) {
	// Create the pieces to compose of a restaurant 'card'
	var restDiv = $("<div class='restaurants' data-id=" + index + ">");
	// restDiv.css('position', 'relative');
	
	var restName = $("<div>");
	restName.html("<strong>" + (index + 1) + ". " + data.name + "</strong>");
	restName.attr('data-id', '' + index);
	// restName.css('position', 'absolute');

	var restRating = $("<img>");
	restRating.html(data.rating);
	var halfStar = data.rating;								// If half star, need to get the corred name for half stars (e.g. "4_half.png");
	var doubleRate = data.rating * 2;
	if(doubleRate % 2 === 1 ) {
		halfStar = ((doubleRate - 1) / 2) + "_half";
	}
	restRating.attr('src', 'assets/images/yelp_stars/small_' + halfStar + '.png');
	restRating.attr('data-id', '' + index);
	// restRating.css('position', 'absolute');

	var restAddress = $("<div>");
	restAddress.html(data.location.display_address[0] + " " + data.location.display_address[1]);
	restAddress.attr('data-id', '' + index);
	// restAddress.css('position', 'absolute');

	var restPrice = $("<div>");
	restPrice.html("Price-Level: " + data.price);
	restPrice.attr('data-id', '' + index);
	// restPrice.css('position', 'absolute');

	var reviewCount = $("<div>");
	reviewCount.html("Reviews: " + data.review_count);
	reviewCount.attr('data-id', '' + index);

	var restImage = $("<div>");
	restImage.css('background-image', "url('" + data.image_url + "')");
	restImage.css('background-size', 'cover');
	restImage.css('background-repeat', 'no-repeat');
	restImage.css('background-position', '50% 50%');
	// restImage.css('position', 'absolute');

	var yelpTag = $("<img>");
	// restImage.html();
	yelpTag.attr('src', 'assets/images/Yelp_trademark_RGB.png');
	yelpTag.attr('data-id', '' + index);
	// yelpTag.css('position', 'absolute');

	if (isSelect) {
		restName.addClass("selected-restaurant-name");
		restRating.addClass("selected-restaurant-rating");
		restAddress.addClass("selected-restaurant-address");
		restPrice.addClass("selected-restaurant-price");
		reviewCount.addClass("selected-review-count");
		restImage.addClass("selected-restaurant-image");
		yelpTag.addClass("selected-yelp-tag");
	} else {
		restName.addClass("restaurant-name");
		restRating.addClass("restaurant-rating");
		restAddress.addClass("restaurant-address");
		restPrice.addClass("restaurant-price");
		reviewCount.addClass("review-count");
		restImage.addClass("restaurant-image");
		yelpTag.addClass("yelp-tag");
	}

	// append each piece to the restDiv
	restDiv.append(restName);
	restDiv.append(restRating);
	restDiv.append(reviewCount);
	restDiv.append(restAddress);
	restDiv.append(restPrice);
	restDiv.append(restImage);
	restDiv.append(yelpTag);
			
	// Lastly, append restDiv to the target div where we want the entire card.
	$("#" + targetDiv).append(restDiv)
}

//logic is ready to be implemented for clicking the search results and display it in maps

$(document).on("click", ".restaurants", function (event) {
	// Prevent default auto load here:
	event.preventDefault();

	//logic for what should happen after clicking search results
	// 	We want to save that Card INTO the corresponding meal-time div 
	console.log(event.target.dataset.id);

	var selectedResultIndex = event.target.dataset.id;
	var selectedResult = resultsArray[selectedResultIndex];

	// Empty the previous selection
	$("#" + searchTermGLOBAL + "-div").empty();

	console.log(selectedResult);

	searchResults(selectedResult, selectedResultIndex, searchTermGLOBAL + "-div", true);

});


