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
  document.querySelector(".dropdown-items").innerHTML = "";
  cities.map((city) => {
    const dropDownElements = document.createElement("p");
    dropDownElements.innerText = city;
    dropDownElements.addEventListener("click", function () {
      citySelector.value = city; // Display the selected city in the input box
      fetchWeatherData(city);
    });
    document.querySelector(".dropdown-items").append(dropDownElements);
  });
});
document.addEventListener("click", function (event) {
  if (!citySelector.contains(event.target)) {
    document.querySelector(".dropdown-items").style.display = "none";
  }
});
function fetchWeatherData(city) {
  showLoader();
  const apiKey = "d41fd69033bdcc5c42e4280421caf599";

  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error for getting responses");
      }
      return response.json();
    })
    .then((data) => {
      console.log(data);
      displayWeatherData(data);
    })
    .catch((error) => {
      console.error("Error fetching weather data:", error);
      alert(error.message);
    })
    .finally(() => {
      hideLoader();
    });
}
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
      if (!response.ok) {
        throw new Error("Enter a valid city name");
      }
      return response.json();
    })

    .then((data) => {
      console.log("result", data);
      displayWeatherData(data);
    })
    .catch((error) => {
      console.log(error);
      alert(error.message);
    });
  fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`
  )
    .then((response) => response.json())
    .then((data) => {
      console.log("res", data);
      displayForecastDetails(data);
    })
    .catch((error) => {
      console.log(error);
    });
}

function displayWeatherData(data) {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const dt = date.getDate();
  const originalDate = `${year}-${month}-${dt}`;
  console.log("date", originalDate);
  document.querySelector("#city").value = "";
  const cityName = document.querySelector(".city-name");
  cityName.innerHTML = data.name + "(" + originalDate + ")";
  const temp = document.querySelector(".temp");
  temp.innerHTML = "Temperature : " + Math.round(data.main.temp) + " °C";
  const wind = document.querySelector(".wind");
  wind.innerHTML = "Wind :" + data.wind.speed + " M/S";
  const humidity = document.querySelector(".humidity");
  humidity.innerHTML = "Humidity :" + data.main.humidity + "%";
  const weatherImage = document.querySelector(".weather-image");
  weatherImage.style.display = "block";
  weatherImage.src = getImage(data.weather[0].main);
  const weather = document.querySelector(".weather");
  weather.innerHTML = data.weather[0].main;
}
function displayWeatherByLocation() {
  showLoader();
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
          })
          .finally(() => {
            hideLoader();
          });
        fetch(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
        )
          .then((response) => response.json())
          .then((data) => {
            console.log("res", data);
            displayForecastDetails(data);
          })
          .catch((error) => {
            console.log("error", error);
          });
      },

      () => {
        alert(
          "Geolocation not supported by your browser or permission denied."
        );
        hideLoader();
      }
    );
  } else {
    alert("Geolocation not supported by your browser.");
    hideLoader();
  }
}
function showLoader() {
  document.getElementById("loader").style.display = "block";
}

function hideLoader() {
  document.getElementById("loader").style.display = "none";
}
function displayForecastDetails(data) {
  console.log("data", data);

  const dailyData = data.list.filter((item) =>
    item.dt_txt.endsWith("12:00:00")
  );
  document.querySelector(".weather-cards").innerHTML = "";
  dailyData.forEach((day) => {
    console.log("day", day);
    const date = new Date(day.dt_txt).toLocaleDateString();
    const temp = day.main.temp;
    const wind = day.wind.speed;
    const humidity = day.main.humidity;
    const description = day.weather[0].description;
    document.querySelector(".weather-cards").innerHTML += `<li class="card">
              <p class="dates">${date}</p>
              <img
                src=${getImage(day.weather[0].main)}
                alt="";
              />
              <p class="forecast-temp">Temp:${temp}</p>
              <p class="forecast-wind">Wind:${wind} M/S</p>
              <p class="forecast-humidity">Humidity:${humidity}%</p>
            </li>`;
  });
}
function getImage(data) {
  if (data === "Clear") {
    return "./images/clear.png";
  } else if (data === "Clouds") {
    return "./images/clouds.png";
  } else if (data === "Drizzle") {
    return "./images/drizzle.png";
  } else if (data === "Mist") {
    return "./images/mist.png";
  } else if (data === "Rain") {
    return "./images/rain.png";
  } else if (data === "Haze") {
    return "./images/haze.png";
  } else {
    console.log("image is not found");
  }
}
