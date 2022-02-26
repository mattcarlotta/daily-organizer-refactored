// display weather data to the DOM
function displayWeather(data) {
  const displayWeatherSection = document.querySelector(".weather-section");
  const displayTimezone = document.querySelector(".timezone");
  const displayCity = document.querySelector(".city");
  const displayTemp = document.querySelector(".temp");
  const weatherSummary = document.querySelector(".summary");
  const displaySunrise = document.querySelector(".sunrise");
  const displaySunset = document.querySelector(".sunset");
  const displayWindSpeed = document.querySelector(".wind-speed");
  const displayVisibility = document.querySelector(".visibility");

  // set the text content of each DOM element
  displayTimezone.textContent = data.timezone;
  displayCity.textContent = data.city_name;
  displayTemp.textContent = `${data.temp}°`;
  weatherSummary.textContent = data.weather.description;
  displaySunset.textContent = `Sunset: ${data.sunset}`;
  displaySunrise.textContent = `Sunrise: ${data.sunrise}`;
  displayWindSpeed.textContent = `Wind speed: ${data.wind_spd} m/s`;
  displayVisibility.textContent = `Visibility: ${data.vis} KM`;

  // by initially setting the "weather-section" as hidden we don't have to
  // keep overriding it; instead, we will only display the results if successful
  // displays the weather section only when we have a succesful response from the API
  displayWeatherSection.style.display = "block";
}

// await the response from the API
// if the promise is succesful - await the JSON response, else throw an error
async function getWeatherData(url) {
  try {
    // never expose API keys to source control
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "x-rapidapi-host": process.env.RAPIDAPIHOST,
        "x-rapidapi-key": process.env.RAPIDAPIKEY,
      },
    });

    if (!response.ok) throw new Error(response.statusText);

    const res = await response.json();
    displayWeather(res.data[0]);
  } catch (err) {
    // how is a user going to know if this fails?
    // how can we communicate to the UI that it fails?
    console.error("ERROR", err);
  }
}

// gets the users current geolocation position
// grabs the lat/lng to make a request to the weatherbit API
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition((position) => {
    const url = `https://weatherbit-v1-mashape.p.rapidapi.com/current?lon=${position.coords.longitude}&lat=${position.coords.latitude}`;

    getWeatherData(url);
  });
}

// hot module replacement (not required)
import.meta.webpackHot.accept();
