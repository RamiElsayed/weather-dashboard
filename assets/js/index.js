const searchHistory = document.getElementById("search-history");
const searchForm = document.getElementById("search-form");
const searchButton = document.getElementById("search-button");
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
const writeToLs = (key,value) => {
        const strinfiedValue = JSON.stringify(value);
        localStorage.setItem(key,strinfiedValue);
}
const renderSearches = () => {
    citiesList.innerHTML = '';
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
        return searchedCity
    };
    recentSearches.map(getCity).forEach(x => citiesList.appendChild(x));
    console.log(citiesList)
    // `<ul class="search-table-elements search-history"> </ul>`;

    searchHistory.append(citiesList);
  } else {
    const alert = document.createElement("div");
    alert.textContent = "you have no recent searches";
    alert.classList.add("search-alert");
    alert.setAttribute("id","alert");
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
             const recentSearches = readFromLs("recentSearches", []);
             if (!recentSearches.includes(cityName)) {
                  recentSearches.push(cityName);
             }
             writeToLs("recentSearches", recentSearches);
             
             renderSearches();
        }
}
const onReady = () => {
  renderSearches();
};

searchHistory.addEventListener("click", onRecentSearch);
searchButton.addEventListener("click", onFormSubmit);
window.onload = onReady;
