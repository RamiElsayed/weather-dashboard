const mainContent = document.getElementById("main-content");
const searchHistory = document.getElementById("search-history");
const searchForm = document.getElementById("search-form");
const searchButton = document.getElementById("search-button");
const weatherForecastCards = document.getElementById("weather-forecast-cards");
const cardsSection = document.getElementById("cards");
const citiesList = document.createElement("ul");

const readFromLs = (key, defaultValue) => {
  const lsData = localStorage.getItem(key);
  const parsedData = JSON.parse(lsData);

  if (parsedData) {
    return parsedData;
  } else {
    return defaultValue;
  }
};
const writeToLs = (key, value) => {
  const strinfiedValue = JSON.stringify(value);
  localStorage.setItem(key, strinfiedValue);
};
const constructUrl = (baseUrl, params) => {
  const queryParams = new URLSearchParams(params).toString();

  return queryParams ? `${baseUrl}?${queryParams}` : baseUrl;
};

const fetchData = async (url, options = {}) => {
  try {
    const response = await fetch(url, options);

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error("Failed to fetch data");
    }
  } catch (error) {
    throw new Error(error.message);
  }
};
const getUviClassName = (uvi) => {
  if (uvi >= 0 && uvi <= 2) {
    return "healthy-uvi";
  }

  if (uvi > 2 && uvi <= 8) {
    return "neutral-uvi";
  }
  if (uvi > 8) {
    return "dangerous-uvi";
  }
};
const renderTodayWeather = (data) => {
        const todayWeatherCard = `<section class="main-tables indexes-table">
          <div class="current-city">
          <h2>${data.cityName}</h2>
          <h3>${moment.unix(data.weatherData.current.dt + data.weatherData.timezone_offset).format("dddd, Do MMM, YYYY")}</h3>
          <img
              class="weather-icon"
              alt="weather-icon"
              src="http://openweathermap.org/img/w/${data.weatherData.current.weather[0].icon}.png"
          />
          </div>
          <div class="weather-index">
          <div class="weather-element">temperature</div>
          <div class="weather-element">${data.weatherData.current.temp} &deg;c</div>
          </div>
          <div class="weather-index">
          <div class="weather-element">humidity</div>
          <div class="weather-element">${data.weatherData.current.humidity}&percnt;</div>
          </div>
          <div class="weather-index">
          <div class="weather-element">wind speed</div>
          <div class="weather-element">${data.weatherData.current.wind_speed} mph</div>
          </div>
          <div class="weather-index">
          <div class="weather-element">uv index</div>
          <div class="weather-element">
              <span class=${getUviClassName(data.weatherData.current.uvi)}>${data.weatherData.current.uvi}</span>
          </div>
          </div>
    </section>`;
  weatherForecastCards.insertAdjacentHTML("beforeend", todayWeatherCard);
};

//rendering the weather 5 cards
const rendercards = (data) => {
  const createforecastCard = (each) => {
    const forecast = `<div class="card">
      <div class="card-content">
      <div class="card-header">
          <h3>${moment.unix(each.dt).format("ddd, Do MMM")}</h3>
          <div>
          <img
              class="weather-icon"
              alt="weather-icon"
              src="http://openweathermap.org/img/w/${each.weather[0].icon}.png"
          />
          </div>
      </div>
      <div class="card-indexes">
          <div class="card-element">temperature</div>
          <div class="card-element">${each.temp.day} &deg;c</div>
      </div>
      <div class="card-indexes">
          <div class="card-element">humidity</div>
          <div class="card-element">${each.humidity}&percnt;</div>
      </div>
      <div class="card-indexes">
          <div class="card-element">wind speed</div>
          <div class="card-element">${each.wind_speed} mph</div>
      </div>
      <div class="card-indexes">
          <div class="card-element">uv index</div>
          <div class="card-element">
          <span class=${getUviClassName(each.uvi)}>${each.uvi}</span>
          </div>
      </div>
      </div>
    </div>`
    return forecast
  }

  const forecastCards = data.weatherData.daily.slice(1,6).map(createforecastCard).join("");
  const currentCityForecastCards = ` <section id="cards" class="cards-section is-fullwidth-destop">
        ${forecastCards}
        </section>`;
  weatherForecastCards.insertAdjacentHTML("beforeend", currentCityForecastCards);
};

//render the search form alert and recent searches
const renderSearches = () => {
  citiesList.innerHTML = "";
  const recentSearches = readFromLs("recentSearches", []);
  if (recentSearches.length) {
    const alert = document.getElementById("alert");
    if (alert) {
      alert.remove();
    }
    const getCity = (city) => {
      const searchedCity = document.createElement("li");
      searchedCity.classList.add("history-cities");
      searchedCity.textContent = city;
      return searchedCity;
    };
    recentSearches.map(getCity).forEach((x) => citiesList.appendChild(x));

    searchHistory.append(citiesList);
  } else {
    const alert = document.createElement("div");
    alert.textContent = "you have no recent searches";
    alert.classList.add("search-alert");
    alert.setAttribute("id", "alert");
    searchHistory.append(alert);
  }
};
 const renderAlert = () => {
  weatherForecastCards.innerHTML = "";
  const alert = `<div class ="invalid-city-alert">you entered invalid city name<div>`
  weatherForecastCards.insertAdjacentHTML("afterbegin", alert);
 }
const renderWeatherData = async(cityName) => {
  try {
    const weatherData = await fetchWeatherData(cityName);
      weatherForecastCards.innerHTML = "";
      renderTodayWeather(weatherData);
      rendercards(weatherData);

      return true;
    
  } catch (error) {
    renderAlert();
    return false;
  }
}
const onRecentSearch = async(event) => {
  const target = event.target;
  if (target.tagName === "LI") {
    const city = target.textContent;

    await renderWeatherData(city);
  }
};

const fetchWeatherData = async(cityName) => {


  const currentWeatherUrl = constructUrl(
    "https://api.openweathermap.org/data/2.5/weather",
    {
      q: cityName,
      appid: "cc62f1f5a783a34cac3cb5e4ca44e8a4",
    }
  );
  const currentData = await fetchData(currentWeatherUrl);

  const lat = currentData?.coord?.lat;
  const lon = currentData?.coord?.lon;
  const currentCity = currentData?.name;

  const forecastDataUrl = constructUrl(
    "https://api.openweathermap.org/data/2.5/onecall",
    {
      lat: lat,
      lon: lon,
      exclude: "minutely,hourly",
      units: "metric",
      appid: "cc62f1f5a783a34cac3cb5e4ca44e8a4",
    }
  );

  const forecastData = await fetchData(forecastDataUrl);

  return {
    cityName: currentCity,
    weatherData : forecastData,
  };
}

//submitting form
const onFormSubmit = async (event) => {
  event.preventDefault();

  const cityName = document.getElementById("search-input").value;

  if (cityName) {
    
    //render today's weather and cards
    const renderStatus = await renderWeatherData(cityName);

    const recentSearches = readFromLs("recentSearches", []);
    if (!recentSearches.includes(cityName) && renderStatus) {
      recentSearches.push(cityName);
    }
    writeToLs("recentSearches", recentSearches);

    renderSearches();
  }
};
const onReady = () => {
  renderSearches();
};

searchHistory.addEventListener("click", onRecentSearch);
searchButton.addEventListener("click", onFormSubmit);
window.onload = onReady;
