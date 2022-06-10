const searchHistory = document.getElementById("search-history");

const readFromLs = (key, defaultValue) => {
  const lsData = localStorage.getItem(key);
  const parsedData = JSON.parse(lsData);

  if (parsedData) {
    return parsedData;
  } else {
    return defaultValue;
  }
};

const renderSearches = () => {
  const recentSearches = readFromLs("recentSearches", []);
  if (recentSearches.length) {
    const getCity = (city) => { 
        const searchedCity = document.createElement("li");
        searchedCity.classList.add("history-cities");
        searchedCity.textContent = city;
        return searchedCity
    };
    
    const citiesList = document.createElement("ul");
    recentSearches.map(getCity).forEach(x => citiesList.appendChild(x));
    console.log(citiesList)
    // `<ul class="search-table-elements search-history"> </ul>`;

    searchHistory.append(citiesList);
  } else {
    const alert = document.createElement("div");
    alert.textContent = "you have no recent searches";
    alert.classList.add("search-alert");
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
const onReady = () => {
  renderSearches();
};

searchHistory.addEventListener("click", onRecentSearch);
window.onload = onReady;
