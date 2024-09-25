// Fetch country data from the API
fetch("https://restcountries.com/v3.1/all")
  .then((res) => res.json()) // Parse the JSON response
  .then((data) => {
    console.log(data); // Log the data for debugging

    // Store country cards in an array for easy access later
    const countryCards = data.map((country) => {
      const countriesContainer = document.querySelector(".countries-container");
      const countryCard = document.createElement("div"); // Create a new card for the country
      countryCard.classList.add("country-card"); // Add the card class

      // Create a link for the country card
      const link = document.createElement("a");
      link.href = `country.html?name=${country.name.common}`; // Set the URL for the link
      link.classList.add("country-link"); // Add the link class

      // Create a section for the flag
      const sectionFlag = document.createElement("section");
      sectionFlag.classList.add("flag"); // Add flag class

      // Create an image element for the country flag
      const flagImage = document.createElement("img");
      flagImage.classList.add("img"); // Add image class
      flagImage.src = country.flags.svg; // Set flag image source
      flagImage.alt = country.flags.alt || `${country.name.common} flag`; // Set alt text for the image

      // Create a section for country information
      const countryInfo = document.createElement("section");
      countryInfo.classList.add("country-info"); // Add country info class

      // Create heading for the country name
      const h3 = document.createElement("h3");
      h3.innerText = `${country.name.common}`; // Set country name as heading text

      // Create paragraphs for additional information
      const population = document.createElement("p");
      population.innerHTML = `<b>Population: </b>${country.population.toLocaleString(
        "en-IN"
      )}`; // Format population number
      const region = document.createElement("p");
      region.innerHTML = `<b>Region: </b>${country.region}`; // Set region information
      const capital = document.createElement("p");
      capital.innerHTML = `<b>Capital: </b>${country.capital || "N/A"}`; // Set capital information

      // Append flag image to the flag section
      sectionFlag.append(flagImage);
      // Append country information to the info section
      countryInfo.append(h3, population, region, capital);
      // Append flag and info sections to the link
      link.append(sectionFlag, countryInfo);
      // Append the link to the country card
      countryCard.append(link);
      // Append the country card to the countries container
      countriesContainer.append(countryCard);

      // Return an object for easy access to card properties later
      return {
        name: country.name.common.toLowerCase(), // Store country name in lowercase for search
        region: country.region, // Store region
        card: countryCard, // Store reference to the card
      };
    });

    // Search functionality
    const input = document.querySelector("input");
    input.addEventListener("input", function () {
      const searchValue = input.value.toLowerCase(); // Get the current input value
      filterCountries(searchValue, ""); // Filter countries based on input
    });

    // Continent filter functionality
    const selectOption = document.getElementById("continents");
    selectOption.addEventListener("change", function () {
      const selectedContinent = selectOption.value; // Get the selected continent
      filterCountries("", selectedContinent); // Filter countries based on selected continent
    });

    // Dark mode toggle functionality
    // const darkModeToggle = document.getElementById("dark-mode-toggle");

    // darkModeToggle.addEventListener("click", function () {
    //   document.body.classList.toggle("dark-mode");
    //   const moonIcon = darkModeToggle.querySelector("img");
    //   moonIcon.src = document.body.classList.contains("dark-mode")
    //     ? "./icon/sun.png" // Change to sun icon in dark mode
    //     : "./icon/moon.png"; // Change back to moon icon in light mode
    // });

    // Function to filter countries based on search input and selected continent
    function filterCountries(searchValue, selectedContinent) {
      countryCards.forEach(({ name, region, card }) => {
        const matchesSearch = name.includes(searchValue); // Check if country name matches search
        const matchesContinent = selectedContinent
          ? region === selectedContinent // Check if region matches selected continent
          : true;

        // Show or hide the country card based on matches
        if (matchesSearch && matchesContinent) {
          card.style.display = ""; // Show the card
        } else {
          card.style.display = "none"; // Hide the card
        }
      });
    }
  })
  .catch((error) => {
    console.error("Error fetching country data:", error); // Error handling
  });
