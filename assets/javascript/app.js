$(document).ready(function () {
	//ADD VARIABLES FOR APP HERE
	var searchTerm;
	var location;
	var price;
	var ratings;
  var cuisine;
  var resultsArray = [];

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
      yelpURL += ('&categories=' + cuisine);
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
			// searchResults(response);

			resultsArray = response.businesses;
			console.log(resultsArray);
			

			for (i = 0; i < response.businesses.length; i++ ){
				searchResults(response.businesses[i], "search-results-div");
			}

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
function phoneData(){
$("#phone-input").each(function(){
	var phoneNum = $(this).val();
	localStorage.setItem("Phone", phoneNum);
});
}

function emailData(){
$("#email-input").each(function(){
var emailAdd = $(this).val();
localStorage.setItem("Email",emailAdd);
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
function searchResults(data, targetDiv){
	console.log(data);
	
	// for (var i = 0 ; i<5; i++){
		var restDiv = $("<div class='restaurants' data-id="+ i +">")
		restDiv.append('<p class ="restaurant-name"  data-id='+ i +'>' + data.name + '<p>');
		restDiv.append('<p class ="restaurant-rating"  data-id='+ i +'>' + data.rating + '<p>');
		restDiv.append('<p class ="restaurant-address" data-id='+ i +' >' + data.location.display_address[0] + data.location.display_address[1] + '<p>');
		restDiv.append('<p class ="restaurant-price" data-id='+ i +'>' + data.price + '<p>');
		restDiv.append("<img src="+data.image_url+" class='restaurant-image' data-id=" + i +">");
		// $("#search-results-div").append(restDiv)			
		$("#" + targetDiv).append(restDiv)
	// }
}

//logic is ready to be implemented for clicking the search results and display it in maps

$(document).on("click",".restaurants", function(event){
console.log(event);


	//logic for what should happen after clicking search results
	console.log(event.target.dataset.id);
	

});


// function for storing user selected meal place 
 
// function selectedResults(){
// 	for( var i = 0; i<resultsArray.length; i++){
// 		if 
// 	}
// }

