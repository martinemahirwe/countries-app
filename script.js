const searchInput = document.getElementById('search');
const regionSelect = document.getElementById('region');
const toggleThemeButton = document.getElementById('toggle-theme');
const main = document.querySelector('.country-grid');

let countriesData = [];

fetch('https://restcountries.com/v3.1/all')
  .then(response => response.json())
  .then(data => {
    countriesData = data;

    
    function displayCountryCards(countries) {
      main.innerHTML = '';
      countries.forEach(country => {
      
        const card = document.createElement('div');
        card.classList.add('country-card');
        card.innerHTML = `
          <img src="${country.flags.png}" alt="${country.name.common}">

          <h2>${country.name.common}</h2>
          <p><strong>Population:</strong> ${country.population}</p>
          <p><strong>Region:</strong> ${country.region}</p>
          <p><strong>Capital:</strong> ${country.capital}</p>
        `;
        
        main.appendChild(card);
      });
    }
    

    displayCountryCards(countriesData);

  
    searchInput.addEventListener('input', () => {
      const searchTerm = searchInput.value.toLowerCase();
      const filteredCountries = countriesData.filter(country =>
        country.name.common.toLowerCase().includes(searchTerm)
      );
      displayCountryCards(filteredCountries);
    });

    regionSelect.addEventListener('change', () => {
      const selectedRegion = regionSelect.value;
      if (selectedRegion === 'all') {
        displayCountryCards(countriesData);
      } else {
        const filteredCountries = countriesData.filter(country =>
          country.region.toLowerCase() === selectedRegion
        );
        displayCountryCards(filteredCountries);
      }
    });
    

  
    toggleThemeButton.addEventListener('click', () => {
      document.body.classList.toggle('dark-mode');
    });
  })
  .catch(error => console.error('Error fetching data:', error));
