var weatherApiKey = "18d9beb16b853d69589af0b11aaf06f4"
var userFormEl = document.querySelector("#user-form");
var cityInputEl = document.querySelector("#cityname");

var citySearch = function (city) {
    //format the url for city search
    var cityApiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "appid=" + weatherApiKey;

    //make request to the url
    fetch(cityApiUrl)
        .then(function (response) {
            //request was successful
            if (response.ok) {
                response.json().then(function(data) {
                    displayCityInformation (data, city);
                });
            } else {
                alert('Error: City not found.');
            };
        })
        .catch(function (error) {
            alert("Unable to connect to Open Weather");
        });
};

userFormEl.addEventListener("submit", formSubmitHandler);