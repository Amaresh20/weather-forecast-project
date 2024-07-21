document
  .querySelector("#search-btn")
  .addEventListener("click", displayWeatherDetails);
document
  .querySelector("#location-btn")
  .addEventListener("click", displayWeatherByLocation);
const citySelector = document.querySelector("#city");

citySelector.addEventListener("click", function () {
  document.querySelector(".dropdown-items").style.display = "block";
  const cities = JSON.parse(localStorage.getItem("city")) || [];
  console.log("cities", cities);
});
function displayWeatherDetails() {
  const city = document.querySelector("#city").value;
  const cities = JSON.parse(localStorage.getItem("city")) || [];
  cities.push(city);
  localStorage.setItem("city", JSON.stringify(cities));

  if (city === "") {
    alert("Enter city name");
    return;
  }
  console.log("city", city);
  const apiKey = "d41fd69033bdcc5c42e4280421caf599";
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
  )
    .then((response) => {
      return response.json();
    })

    .then((data) => {
      console.log(data);
      displayWeatherData(data);
    })
    .catch((error) => {
      console.log(error);
    });
}
function displayWeatherData(data) {
  document.querySelector("#city").value = "";
  const cityName = document.querySelector(".city-name");
  cityName.innerHTML = data.name;
  const date = new Date();
  // date.toLocaleDateString();
  console.log("date", date);
  const temp = document.querySelector(".temp");
  temp.innerHTML = "Temperature : " + Math.round(data.main.temp) + " °C";
  const wind = document.querySelector(".wind");
  wind.innerHTML = "Wind :" + data.wind.speed + " M/S";
  const humidity = document.querySelector(".humidity");
  humidity.innerHTML = "Humidity :" + data.main.humidity + "%";
  const weatherImage = document.querySelector(".weather-image");
  weatherImage.style.display = "block";
  if (data.weather[0].main === "Clear") {
    weatherImage.src = "./images/clear.png";
  } else if (data.weather[0].main === "Clouds") {
    weatherImage.src = "./images/clouds.png";
  } else if (data.weather[0].main === "Drizzle") {
    weatherImage.src = "./images/drizzle.png";
  } else if (data.weather[0].main === "Mist") {
    weatherImage.src = "./images/mist.png";
  } else if (data.weather[0].main === "Rain") {
    weatherImage.src = "./images/rain.png";
  } else if (data.weather[0].main === "Haze") {
    weatherImage.src = "./images/haze.png";
  } else {
    console.log("image is not found");
  }
  const weather = document.querySelector(".weather");
  weather.innerHTML = data.weather[0].main;
}
function displayWeatherByLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        const apiKey = "d41fd69033bdcc5c42e4280421caf599";

        fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
        )
          .then((response) => response.json())
          .then((data) => {
            console.log("result", data);
            displayWeatherData(data);
          })
          .catch((error) => {
            console.log(error);
            alert("Unable to fetch weather data for your location");
          });
      },
      () => {
        alert(
          "Geolocation not supported by your browser or permission denied."
        );
      }
    );
  } else {
    alert("Geolocation not supported by your browser.");
  }
}
