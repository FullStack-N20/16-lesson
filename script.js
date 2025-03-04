const countriesContainer = document.getElementById("countries-container");
const searchInput = document.getElementById("search");
const regionFilter = document.getElementById("region-filter");
const themeToggle = document.getElementById("theme-toggle");

async function fetchCountries() {
    const res = await fetch("https://restcountries.com/v3.1/all");
    const countries = await res.json();
    displayCountries(countries);
}

function displayCountries(countries) {
    countriesContainer.innerHTML = "";
    countries.forEach(country => {
        const countryCard = document.createElement("div");
        countryCard.classList.add("country-card");
        countryCard.innerHTML = `
            <img src="${country.flags.svg}" alt="Flag of ${country.name.common}">
            <h3>${country.name.common}</h3>
            <p><strong>Population:</strong> ${country.population.toLocaleString()}</p>
            <p><strong>Region:</strong> ${country.region}</p>
            <p><strong>Capital:</strong> ${country.capital ? country.capital[0] : "N/A"}</p>
        `;
        countriesContainer.appendChild(countryCard);
    });
}

searchInput.addEventListener("input", () => {
    const searchTerm = searchInput.value.toLowerCase();
    document.querySelectorAll(".country-card").forEach(card => {
        const countryName = card.querySelector("h3").textContent.toLowerCase();
        card.style.display = countryName.includes(searchTerm) ? "block" : "none";
    });
});

regionFilter.addEventListener("change", async () => {
    const res = await fetch("https://pokeapi.co/api/v2/pokemon/18/");
    const countries = await res.json();
    const filteredCountries = countries.filter(country => country.region === regionFilter.value || regionFilter.value === "");
    displayCountries(filteredCountries);
});

themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    themeToggle.textContent = document.body.classList.contains("dark-mode") ? "☀️ Light Mode" : "🌙 Dark Mode";
});

fetchCountries();
