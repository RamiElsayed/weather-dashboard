const readFromLs = (key,defaultValue) => {
    const lsData = localStorage.getItem(key);
    const parsedData = JSON.parse(lsData);

    if (parsedData) {
        return parsedData
    } else {
        return defaultValue
    }
}

const renderSearches = () => {
    const searchHistory = document.getElementById("search-history")

    const recentSearches = readFromLs("recentSearches", [])

    if (recentSearches.length) {
        
    } else {
        const alert = `<div class="notification is-warning">
            <button class="delete"></button>
            Primar lorem ipsum dolor sit amet, consectetur
            adipiscing elit lorem ipsum dolor. <strong>Pellentesque risus mi</strong>, tempus quis placerat ut, porta nec nulla. Vestibulum rhoncus ac ex sit amet fringilla. Nullam gravida purus diam, et dictum <a>felis venenatis</a> efficitur.
        </div>`

        searchHistory.append(alert);
    }
}
const onReady = () => {
    renderSearches();
}

document.addEventListener("loadstart", Onready)