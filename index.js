let now = new Date();
let hours = now.getHours();
let minutes = now.getMinutes();

let weekDays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let day = weekDays[now.getDay()];
let dayAndTime = document.querySelector(".dayAndTime");
dayAndTime.innerHTML = `${day}, ${hours}:${minutes}`;

function findCity(event) {
  event.preventDefault();
  let cityName = document.querySelector("#current-city").value;
  searchNewCity(cityName);
}

function currentTemp(response) {
  console.log(response.data);
  let currentTemp = document.querySelector("#currentTemp");
  let temperature = Math.round(response.data.main.temp);
  currentTemp.innerHTML = `${temperature}° C`;
  let header = document.querySelector("header");
  header.innerHTML = `Current City: ${response.data.name}`;
}

function searchNewCity(cityName) {
  let apiKey = "2fc5be9dde373caca1d6a73370bdc858";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(currentTemp);
}
function showLocation(position) {
  let apiKey = "2fc5be9dde373caca1d6a73370bdc858";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(currentTemp);
}

function currentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showLocation);
}
let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", currentLocation);

let form = document.querySelector("form");
form.addEventListener("submit", findCity);
