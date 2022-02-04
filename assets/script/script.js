// var weatherApiKey = "18d9beb16b853d69589af0b11aaf06f4";
// var aviaApiKey = "1f95fd-f0ea67";
// var cityList = [];

// $("#search-btn").on("click", (event) => {
//   event.preventDefault();
//   var city = $("#city-name").val();
//   cityList = JSON.parse(localStorage.getItem("city")) || [];
//   cityList.push(city);
//   localStorage.setItem("city", JSON.stringify(cityList));
// });
// var formSearch = function (city) {
//   if (city) {
//     citySearch();
//   } else {
//     alert("please enter the city");
//   }
// };
// var citySearch = function () {
//   //format the url for city search

//   var cityUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${weatherApiKey}`;

//   //make request to the url
//   fetch(cityUrl).then(function (response) {
//     console.log(response);
//     //request was successful
//     if (response.ok) {
//       console.log("yo yo", response);
//       return response.json().then(function (data) {
//         console.log("hi ", data.name);
//         getLatLon();
//       });
//     }
//   });
// };

// var getLatLon = function (data) {
//   var lat = data.coord.lat;
//   var lon = data.coord.lon;

//   var latLon = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly,daily&units=imperial&appid=${apiKey}`;
//   fetch(latLon)
//     .then(function (response) {
//       if (response.ok) {
//         return response.json();
//       }
//     })
//     .then(function (data) {
//       console.table(data);
//       getArrivals();
//     });
// };
// var getArrivals = function () {
//   cityName = lat.val + lon.val;
//   var arrivalsUrl = `https://aviation-edge.com/v2/public/flights?key=${aviaApiKey}&arrIata=${}`;
//   fetch(arrivalsUrl)
//     .then(function (response) {
//       console.log(response);
//       if (response.ok) {
//         return response.json();
//       }
//     })
//     .then(function (data) {
//       console.log(data.aircraft);
//     });
// };

// getting all values we need from this url so when user puts the name of a city, it maches it return what we need
var cityDataBase = [];
var citySearch = function () {
  var cityUrl = `https://aviation-edge.com/v2/public/cityDatabase?key=1f95fd-f0ea67`;
  fetch(cityUrl)
    .then(function (response) {
      console.log(response);
      if (response.ok) {
        return response.json();
      }
    })
    .then(function (data) {
      console.log(data);
      console.log(
        "hii",
        // getting spicific information we need from this url
        data[0].nameCity,
        data[0].codeIataCity,
        data[0].latitudeCity,
        data[0].longitudeCity
      );
      data.forEach((element) => {
        cityDataBase.push({
          city: element.nameCity.toLowerCase(),
          iata: element.codeIataCity,
          lat: element.latitudeCity,
          lon: element.longitudeCity,
        });
      });
    });
};
citySearch();

document.getElementById("search-btn").addEventListener("click", userInput);

function userInput() {
  console.log("yo", cityDataBase);
  event.preventDefault();
  var userCity = document.getElementById("city-name").value.toLowerCase();
  console.log("user-city ", userCity);
  // looping over the cities and making sure that value matches whatever user's input is
  for (var i = 0; i < cityDataBase.length; i++) {
    if (userCity == cityDataBase[i].city) {
      console.log("citycity", cityDataBase[i]);

      var flights = cityDataBase[i].iata;
      console.log("bla bla ", flights);
      arrivalData(flights);
    }
  }
}
// getting arivals data
function arrivalData(flights) {
  var aviaApiKey = "1f95fd-f0ea67";
  var arrivalsUrl = `https://aviation-edge.com/v2/public/flights?key=${aviaApiKey}&arrIata=${flights}`;
  fetch(arrivalsUrl)
    .then(function (response) {
      if (response.ok) {
        console.log("dataaa", response);
        return response.json();
      }
    })
    .then(function (data) {
      console.table("hellooo", data);
      // clear old element
      // displayArrivals(data);
    });
}
