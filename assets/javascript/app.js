$(document).ready(function () {
	//ADD VARIABLES FOR APP HERE
	var searchTerm;
	var location;
	var price;
	var ratings;
	var cuisine;

		//ADD YELP API HERE
		var yelpKey = 'hj3IEH41ZB9OxWnEi31vdifki_JQVxL3wGiDhvWLCBoQhNR5JzfAjlVtJs3jPM9ZvCThgbtwDF-kbqBuRHEYATvPrv82r4nH1_mAdl0gVe8EQuxB1jp7nm34HySsXHYx';

	$('#search-btn').on('click', function () {
		searchTerm = $('.bld-selector').val();
		location = $('#Location-search').val();
		ratings = $('.ratings-selector').val();
		price = $('.cost-selector').val();
		cuisine = $('#cuisine-search').val();
    console.log(searchTerm, location, ratings, price);

    var yelpURL = "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=" + searchTerm;
    
    if(cuisine != '') {
      // Case where user wnats a specific cuisine in the Meal-Time
      yelpURL += (' ' + cuisine);
    }
    if(location != ''){
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
			database.ref().child('/yelp/businesses').set(response.businesses);
		}).catch(function (error) {
      console.log(error);
    })
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

// SHIP IT CLICK FUNCTION FOR PHONE NUMMBER
$('#phone-sub').on('click', function () {
	database.ref().child('/user/phone').set($('#phone-input').val());
});

// SHIP IT CLICK FUNCTION FOR EMAIL
$('#email-sub').on('click', function () {
	database.ref().child('/user/email').set($('#email-input').val());
})