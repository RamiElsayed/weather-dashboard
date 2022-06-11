const mainContent = document.getElementById("main-content");
const searchHistory = document.getElementById("search-history");
const searchForm = document.getElementById("search-form");
const searchButton = document.getElementById("search-button");
const weatherForecastCards = document.getElementById("weather-forecast-cards");
const cardsSection = document.getElementById("cards")
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
const renderTodayWeather = () => {
  const todayWeatherCard = `<section class="main-tables indexes-table">
        <div class="current-city">
        <h2>Birmingham</h2>
        <h3>Monday,06th June,2022</h3>
        <img
            class="weather-icon"
            alt="weather-icon"
            src="./assets/images/weather icon.png"
        />
        </div>
        <div class="weather-index">
        <div class="weather-element">temperature</div>
        <div class="weather-element">16 &deg;c</div>
        </div>
        <div class="weather-index">
        <div class="weather-element">humidity</div>
        <div class="weather-element">20&percnt;</div>
        </div>
        <div class="weather-index">
        <div class="weather-element">wind speed</div>
        <div class="weather-element">10 mph</div>
        </div>
        <div class="weather-index">
        <div class="weather-element">uv index</div>
        <div class="weather-element">
            <span class="uv-index">1.5</span>
        </div>
        </div>
    </section>`;
    console.log(todayWeatherCard)
    weatherForecastCards.insertAdjacentHTML("beforeend", todayWeatherCard)
};
const rendercards = () => {
    const currentWeatherCards = ` <section id="cards" class="cards-section is-fullwidth-destop">
        <div class="card">
            <div class="card-content">
            <div class="card-header">
                <h3>Monday, 06th 2022</h3>
                <div>
                <img
                    class="weather-icon"
                    alt="weather-icon"
                    src="./assets/images/weather icon.png"
                />
                </div>
            </div>
            <div class="card-indexes">
                <div class="card-element">temperature</div>
                <div class="card-element">16 &deg;c</div>
            </div>
            <div class="card-indexes">
                <div class="card-element">humidity</div>
                <div class="card-element">20&percnt;</div>
            </div>
            <div class="card-indexes">
                <div class="card-element">wind speed</div>
                <div class="card-element">10 mph</div>
            </div>
            <div class="card-indexes">
                <div class="card-element">uv index</div>
                <div class="card-element">
                <span class="uv-index">1.5</span>
                </div>
            </div>
            </div>
        </div>
        <div class="card">
            <div class="card-content">
            <div class="card-header">
                <h3>Monday, 06th 2022</h3>
                <div>
                <img
                    class="weather-icon"
                    alt="weather-icon"
                    src="./assets/images/weather icon.png"
                />
                </div>
            </div>
            <div class="card-indexes">
                <div class="card-element">temperature</div>
                <div class="card-element">16 &deg;c</div>
            </div>
            <div class="card-indexes">
                <div class="card-element">humidity</div>
                <div class="card-element">20&percnt;</div>
            </div>
            <div class="card-indexes">
                <div class="card-element">wind speed</div>
                <div class="card-element">10 mph</div>
            </div>
            <div class="card-indexes">
                <div class="card-element">uv index</div>
                <div class="card-element">
                <span class="uv-index">1.5</span>
                </div>
            </div>
            </div>
        </div>
        <div class="card is-4-desktop is-8-mobile">
            <div class="card-content">
            <div class="card-header">
                <h3>Monday, 06th 2022</h3>
                <div>
                <img
                    class="weather-icon"
                    alt="weather-icon"
                    src="./assets/images/weather icon.png"
                />
                </div>
            </div>
            <div class="card-indexes">
                <div class="card-element">temperature</div>
                <div class="card-element">16 &deg;c</div>
            </div>
            <div class="card-indexes">
                <div class="card-element">humidity</div>
                <div class="card-element">20&percnt;</div>
            </div>
            <div class="card-indexes">
                <div class="card-element">wind speed</div>
                <div class="card-element">10 mph</div>
            </div>
            <div class="card-indexes">
                <div class="card-element">uv index</div>
                <div class="card-element">
                <span class="uv-index">1.5</span>
                </div>
            </div>
            </div>
        </div>
        <div class="card is-4-desktop is-8-mobile">
            <div class="card-content">
            <div class="card-header">
                <h3>Monday, 06th 2022</h3>
                <div>
                <img
                    class="weather-icon"
                    alt="weather-icon"
                    src="./assets/images/weather icon.png"
                />
                </div>
            </div>
            <div class="card-indexes">
                <div class="card-element">temperature</div>
                <div class="card-element">16 &deg;c</div>
            </div>
            <div class="card-indexes">
                <div class="card-element">humidity</div>
                <div class="card-element">20&percnt;</div>
            </div>
            <div class="card-indexes">
                <div class="card-element">wind speed</div>
                <div class="card-element">10 mph</div>
            </div>
            <div class="card-indexes">
                <div class="card-element">uv index</div>
                <div class="card-element">
                <span class="uv-index">1.5</span>
                </div>
            </div>
            </div>
        </div>
        <div class="card is-4-desktop is-8-mobile">
            <div class="card-content">
            <div class="card-header">
                <h3>Monday, 06th 2022</h3>
                <div>
                <img
                    class="weather-icon"
                    alt="weather-icon"
                    src="./assets/images/weather icon.png"
                />
                </div>
            </div>
            <div class="card-indexes">
                <div class="card-element">temperature</div>
                <div class="card-element">16 &deg;c</div>
            </div>
            <div class="card-indexes">
                <div class="card-element">humidity</div>
                <div class="card-element">20&percnt;</div>
            </div>
            <div class="card-indexes">
                <div class="card-element">wind speed</div>
                <div class="card-element">10 mph</div>
            </div>
            <div class="card-indexes">
                <div class="card-element">uv index</div>
                <div class="card-element">
                <span class="uv-index">1.5</span>
                </div>
            </div>
            </div>
        </div>
        </section>`;
        weatherForecastCards.insertAdjacentHTML("beforeend", currentWeatherCards);
}
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
    // `<ul class="search-table-elements search-history"> </ul>`;

    searchHistory.append(citiesList);
  } else {
    const alert = document.createElement("div");
    alert.textContent = "you have no recent searches";
    alert.classList.add("search-alert");
    alert.setAttribute("id", "alert");
    searchHistory.append(alert);
  }
};

const onRecentSearch = (event) => {
  const target = event.target;
  if (target.tagName === "LI") {
    const city = target.textContent;
    console.log(city);
  }
};

const onFormSubmit = (event) => {
  event.preventDefault();
  const cityName = document.getElementById("search-input").value;
  if (cityName) {


    renderTodayWeather();
    rendercards();
    const recentSearches = readFromLs("recentSearches", []);
    if (!recentSearches.includes(cityName)) {
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
