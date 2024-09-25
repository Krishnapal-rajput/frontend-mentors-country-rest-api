// Get the query string from the URL
const queryString = window.location.search;
// Create a URLSearchParams object to access query parameters
const urlParams = new URLSearchParams(queryString);
const countryName = urlParams.get("name"); // Get the country name from the URL

// If a country name exists in the URL
if (countryName) {
  // Fetch country details by name
  fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`)
    .then((res) => res.json()) // Parse the JSON response
    .then((data) => {
      const country = data[0]; // Get the first country object from the response
      const countryFlag = document.querySelector(".country-flag"); // Select the flag section
      // Set the inner HTML of the flag section with the country's flag
      countryFlag.innerHTML = `<img src="${country.flags.svg}" alt="${country.flags.alt}" />`;

      const headingHeader = document.querySelector(".heading-header"); // Select the heading section
      // Set the inner HTML to display the country name
      headingHeader.innerHTML = `<h1>${country.name.common}</h1>`;

      const lmain = document.querySelector(".lmain"); // Select the left main section
      lmain.innerHTML = `
                <p><b>Native Name: </b>${country.name.common}</p>
                <p><b>Population: </b>${country.population.toLocaleString(
                  "en-IN"
                )}</p>
                <p><b>Region: </b>${country.region}</p>
                <p><b>Sub Region: </b>${country.subregion || country.region}</p>
                <p><b>Capital: </b>${country.capital}</p>
            `; // Set inner HTML with country details

      const rmain = document.querySelector(".rmain"); // Select the right main section
      rmain.innerHTML = `
                <p><b>Top Level Domain: </b>${country.tld.join(", ")}</p>
                <p><b>Currencies: </b>${Object.values(country.currencies)
                  .map((currency) => currency.name)
                  .join(", ")}</p>
                <p><b>Languages: </b>${Object.values(country.languages).join(
                  ", "
                )}</p>
            `; // Set inner HTML with additional country details

      const footer = document.querySelector(".foot"); // Select the footer section
      footer.innerHTML = `<p><b>Border Countries:</b>&nbsp; </p>`; // Initialize footer content

      const borderCountriesContainer = document.createElement("div"); // Create a container for border countries
      borderCountriesContainer.classList.add("border-countries"); // Add class to the container

      // If the country has borders
      if (country.borders) {
        // Create an array of promises to fetch border countries
        const borderCountryPromises = country.borders.map((border) => {
          return fetch(`https://restcountries.com/v3.1/alpha/${border}`) // Fetch each border country by alpha code
            .then((res) => res.json()) // Parse the response
            .then((borderData) => {
              const borderCountry = document.createElement("span"); // Create a span for the border country
              borderCountry.classList.add("border-country"); // Add class to the span
              // Set inner HTML with a link to the border country
              borderCountry.innerHTML = `<a href="country.html?name=${borderData[0].name.common}">${borderData[0].name.common}</a>`;
              borderCountriesContainer.appendChild(borderCountry); // Append to the container
            });
        });

        // Wait for all fetch requests to complete
        Promise.all(borderCountryPromises).then(() => {
          footer.appendChild(borderCountriesContainer); // Append the container to the footer
        });
      } else {
        footer.innerHTML += `<span>&nbsp;No border countries</span>`; // If no borders, display a message
      }
      // Append the container to the footer
    });
}
