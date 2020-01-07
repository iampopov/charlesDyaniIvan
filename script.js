//Project one js testing arena. Update comments as you go to make it easier to follow
//or remove if needed.


//lets create some variables
//These variables will last testing
var savedLocations = ["Winter Park", "Vail", "Copper", "A-Basin"];
var darkskyApiKey = "d2f367ae26a429b81b3e3148169f1332";

//These variables may or may not last testing
var latCurrent = 39.8868;
var lonCurrent = -105.7625;
var day3;

// lets make some functions

//This function takes location array and uses it to populate the dropdown 
//this needs changed to create buttons for city options
function dropPop () {
    var dropDownMenu = $(".dropPop");
    dropDownMenu.empty();
    savedLocations.forEach(function (item) {
        var newButton = $("<button>").attr({"data-value": item});
        newButton.text(item);
        dropDownMenu.append(newButton);
        
    })
}

//This function will be used to pull from local Storage savedLocations array going to need changed to get objects
function localPull () {
    var pulledStorage = localStorage.getItem("Location-Array");
    console.log(pulledStorage);
    if (pulledStorage === null) {
        savedLocations = [];
    } else {
        savedLocations = pulledStorage.split(",");
    }
}

//This function will add a new location to the list of savedLocations.
//Will need other function call outs added to this function later to 
//populate the html with the info we want, for this stage this is good. 
//this will need changed to work with the buttons created for the search
function newLocation () {
    var siblingAry = $(this).siblings();
    var newLocation = siblingAry[0].value;
    savedLocations.push(newLocation);
    console.log(savedLocations);
    siblingAry[0].value = "";
    localPush();
    dropPop();
    pullDarksky();
}

//This function will push the savedLocations array to local storage will need changed for objects
function localPush () {
    var savedLocationsString = savedLocations.toString();
    localStorage.setItem("Location-Array", savedLocationsString);
}

//This function will make the ajax callout to pull information from darksky
function pullDarksky () {
    var proxy = "https://cors-anywhere.herokuapp.com/";
    var queryURL = "https://api.darksky.net/forecast/" + darkskyApiKey + "/" + latCurrent + "," + lonCurrent;
    $.ajax({
        url: proxy + queryURL,
        method: "GET"
    }).then(function(response){
        // console.log(response);
        day3 = response.currently.time;
        console.log(day3);
        pullDarkskyPast();
    })
}

//This function will make the ajax call to pull historical infor for the location
function pullDarkskyPast () {
    var proxy = "https://cors-anywhere.herokuapp.com/";
    var queryURL = "https://api.darksky.net/forecast/" + darkskyApiKey + "/" + latCurrent + "," + lonCurrent + "," + day3;
    $.ajax({
        url: proxy + queryURL,
        method: "GET"
    }).then(function(response){
        console.log(response);
    })

}

//Function call outs for testing
localPull(); 
dropPop();
pullDarksky();


//Creating on click events

//This is the click event for the add new location button
$("#newLocation").on("click", "button", newLocation);

//This section is for tempoary code tests delete when section is working

//IDs needed newLocation for the button 