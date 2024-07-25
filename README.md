# weather-forecast-project

github link:

Weather Forecast App Documentation:-

This Weather Forecast App is a web-based application that provides real-time weather data and a 5-day forecast for a user-specified city. The app uses the OpenWeatherMap API to fetch weather information and utilizes modern JavaScript for interactivity.

HTML:-
The HTML file defines the structure of the application. It includes input fields for city search, a button to use the current location, and sections to display weather details and forecasts.
CSS: -
The CSS file styles the application, making it responsive and visually appealing. Key elements include a navigation bar, input fields, buttons, loaders, and sections for displaying weather data.
JavaScript:-
The JavaScript file (index.js) handles the application's logic, including fetching weather data, displaying the data, and managing user interactions.
Features:-

City Search:-
Users can enter a city name and click the search button to get the current weather and a 5-day forecast for that city. The city name is stored in local storage for quick access in future searches.

Current Location:-
Users can click the "Use Current Location" button to get weather data based on their current geographical location using the Geolocation API.

Weather Details:-
The app displays current weather information, including temperature, wind speed, humidity, and weather conditions with corresponding icons.

5-Day Forecast:-
The app provides a 5-day weather forecast with details such as date, temperature, wind speed, humidity, and weather conditions.

Implementation:-

Event Listeners: Event listeners are added to buttons to trigger the fetch requests for weather data.
Fetching Data: The fetchWeatherData and displayWeatherDetails functions use the OpenWeatherMap API to fetch and display weather data.
Local Storage: The app uses local storage to store and retrieve previously searched city names.
Loader: A loader is displayed while fetching data to enhance the user experience.
Responsive Design: The app is designed to be responsive, ensuring usability across different devices and screen sizes.
Usage:-

Search by City: Enter the city name and click "Search" to fetch weather data.
Use Current Location: Click "Use Current Location" to get weather data based on the current geographical location.
View Weather Details: Weather details and a 5-day forecast are displayed on the right side of the screen.
