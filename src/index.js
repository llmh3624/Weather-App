// TIME NOW
let timeNow = document.querySelector("#date-now");

let now = new Date();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednsday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];

let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
let month = months[now.getMonth()];

let date = now.getDate();

let year = now.getFullYear();

let hours = now.getHours();
if (hours < "10") {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < "10") {
  minutes = `0${minutes}`;
}

timeNow.innerHTML = `${day}, ${month} ${date}  ${year} - ${hours}:${minutes}`;

// SEARCH LOCATION - TEMPERATURE

function searchLocation(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input");
  let searchedcity = document.querySelector("#city");
  searchedcity.innerHTML = `${city.value}`;
}

function searchLocationResults(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input");
  search(city.value);
}

function search(city) {
  let apiKey = "a3c53b47tec350ef3aeodd4ca5138dbc";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayLocationTemperature);
}

function searchCity(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  search(city);
}

function displayLocationTemperature(response) {
  console.log();
  let city = response.data.name;
  let cityElement = document.querySelector("#city");
  let temperature = Math.round(response.data.main.temp);
  let temperatureElement = document.querySelector(".temperature-now");

  temperatureElement.innerHTML = `${temperature}`;
  cityElement.innerHTML = `${city}`;

  let humidity = Math.round(esponse.data.main.humidity * 3.6);
  let humidityElement = document.querySelector("#humidity");
  let wind = Math.round(response.data.wind.speed);
  let windElement = document.querySelector("#wind");

  humidityElement.innerHTML = `${humidity}`;
  windElement.innerHTML = `${wind}`;
}

let locationSubmitEntered = document.querySelector("#search-form");
locationSubmitEntered.addEventListener("submit", searchLocationResults);

let locationClickEntered = document.querySelector("#search-form");
locationClickEntered.addEventListener("click", searchLocationResults);

// CURRENT LOCATION - TEMPERATURE

function displayCurrentTemperature(response) {
  console.log();
  let city = response.data.name;
  let cityElement = document.querySelector("#city");
  let temperature = Math.round(response.data.main.temp);
  let temperatureElement = document.querySelector(".temperature-now");

  cityElement.innerHTML = `${city}`;
  temperatureElement.innerHTML = `${temperature}`;
}

function showCurrentLocation(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let units = "metric";
  let apiKey = "a3c53b47tec350ef3aeodd4ca5138dbc";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?lon=${longitude}&lat=${latitude}&key=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayCurrentTemperature);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showCurrentLocation);
}

let currentButton = document.querySelector(".current");
currentButton.addEventListener("click", getCurrentLocation);

//TEMPERATURE CELSIUS
function changeCelsius(event) {
  event.preventDefault();
  let celsiusUnits = document.querySelector(".temperature-now");
  celsiusUnits.innerHTML = `15`;
}

let celsius = document.querySelector("#temp-celsius");
celsius.addEventListener("click", changeCelsius);

//TEMPERATURE FARENHEIT
function changeFarenheit(event) {
  event.preventDefault();
  let farenheitUnits = document.querySelector(".temperature-now");
  farenheitUnits.innerHTML = `59`;
}

let farenheits = document.querySelector("#temp-farenheit");
farenheits.addEventListener("click", changeFarenheit);
