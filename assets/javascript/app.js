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
	
	//ADD YELP API HERE
	var yelpKey = 'hj3IEH41ZB9OxWnEi31vdifki_JQVxL3wGiDhvWLCBoQhNR5JzfAjlVtJs3jPM9ZvCThgbtwDF-kbqBuRHEYATvPrv82r4nH1_mAdl0gVe8EQuxB1jp7nm34HySsXHYx';

	$('#search-btn').on('click', function () {
		searchTerm = $('.bld-selector').val();
		location = $('#Location-search').val();
		ratings = $('.ratings-selector').val();
		price = $('.cost-selector').val();
		cuisine = $('#cuisine-search').val();
    console.log(searchTerm, location, ratings, price);
    
    // "https://api.yelp.com/v3/businesses/search?=" + searchTerm + "/location?=" + location + "/price?=" + price + "/rating?=" + ratings + "/limit?=5"

    var yelpURL = "https://api.yelp.com/v3/businesses/search?=" + searchTerm;

    if(cuisine != '') {
      // Case where user wnats a specific cuisine in the Meal-Time
      yelpURL += (' ' + cuisine);
    }
    if(location != ''){
      yelpURL += ('/location?=' + location);
    } else {
      // Autofill case
      yelpURL += ('/location?=' + 'Seattle, WA');
    }
    yelpURL += "/price?=" + price + "/rating?=" + ratings + "/limit?=5"

    console.log(yelpURL);
    

		$.ajax({
      method: 'GET', 
      xhrFields: {
		 		withCredentials: true
		 	},
		 	beforeSend: function (xhr) {
		 		xhr.setRequestHeader('Authorization', 'Bearer ' + yelpKey);
		 	},
		 	url: yelpURL,
      dataType: 'jsonp'
      
		}).then(function (response) {
      console.log('Querying Yelp now...');
			console.log(response);
		}).catch(function (error) {
      console.log(error);
    })
	});
	
})