var aviaApiKey = "1f95fd-f0ea67";

// getting all values we need from this url so when user puts the name of a city, it maches it return what we need
var cityDataBase = [];
var citySearch = function () {
  var cityUrl = `https://aviation-edge.com/v2/public/cityDatabase?key=${aviaApiKey}`;
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
      displayArrDep(data);
    });
}
// display aircraft, arrivals, departures, status to the page
var displayArrDep = function (data) {
  for (var i = 0; i < data.length; i++) {
    var flight = document.createElement("div");
    flight.className = "flight-group card-panel col s12 m3 ivory";

    //getting aircraft
    var aircraft = data[i].aircraft.iataCode;
    var aircraftEl = document.createElement("div");
    aircraftEl.className = "card-panel teal white-text";
    aircraftEl.textContent = "AIRCRAFT: " + i + " " + aircraft;
    flight.append(aircraftEl);

    //getting arrivals
    var arrival = data[i].airline.iataCode;
    var arrivalEl = document.createElement("div");
    arrivalEl.className = "card-panel teal white-text";
    arrivalEl.textContent = "ARRIVAL: " + i + " " + arrival;
    flight.append(arrivalEl);

    //getting departure
    var departures = data[i].departure.iataCode;
    var departuresEl = document.createElement("div");
    departuresEl.className = "card-panel teal white-text";
    departuresEl.textContent = "DEPARTURES: " + departures;
    flight.append(departuresEl);

    //getting status
    var status = data[i].status;
    var statusEl = document.createElement("div");
    statusEl.className = "card-panel teal white-text";
    statusEl.textContent = "STATUS: " + status;
    flight.append(statusEl);

    $("#display").append(flight);
  }
};

// got that displaying on the page , but cannot get the value of aircraft, it says it's undefined but it is on the page
// we will need to get other values displaying on the page exactly the same way
