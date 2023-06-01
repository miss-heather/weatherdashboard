const apiKey = '89a150d548623816a89dae5d157172ce';

function searchWeather() {
    const city = document.getElementById('city').value;
    getWeather(city);
    addToSearchHistory(city);
  }
  
  function getWeather(city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;
  
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        displayWeather(data);
        displaySearchHistory();
      })
      .catch(error => console.log('Error:', error));
  }
  
  function getWeatherIcon(condition) {
    const weatherIcons = {
      Clear: '☀️',
      Clouds: '☁️',
      Rain: '🌧️',
      Drizzle: '🌦️',
      Thunderstorm: '⛈️',
      Snow: '❄️',
      Mist: '🌫️',
      Smoke: '🌫️',
      Haze: '🌫️',
      Dust: '🌫️',
      Fog: '🌫️',
      Sand: '🌫️',
      Ash: '🌫️',
      Squall: '🌬️',
      Tornado: '🌪️',
    };
  
    return weatherIcons[condition] || '';
  }
  

  function displayWeather(forecast) {
    const weatherContainer = document.getElementById('weather-container');
    weatherContainer.innerHTML = '';
  
    forecast.list.slice(0, 5).forEach(weatherData => {
      const date = new Date(weatherData.dt * 1000);
      const day = date.toLocaleDateString('en-US', { weekday: 'long' });
  
      const temperature = Math.round((weatherData.main.temp - 273.15) * 9/5 + 32); // Convert to Fahrenheit
      const windSpeed = weatherData.wind.speed;
      const humidity = weatherData.main.humidity;
      const weatherIcon = getWeatherIcon(weatherData.weather[0].main);
  
      const weatherCard = document.createElement('div');
      weatherCard.classList.add('weather-card');
      weatherCard.innerHTML = `
        <h3>${day}</h3>
        <p>${weatherIcon}</p>
        <p>Temperature: ${temperature}°F</p>
        <p>Wind: ${windSpeed} m/s</p>
        <p>Humidity: ${humidity}%</p>
      `;
  
      weatherContainer.appendChild(weatherCard);
    });
  }
  
  
  function addToSearchHistory(city) {
    const searchHistory = localStorage.getItem('searchHistory');
    let historyArr = searchHistory ? JSON.parse(searchHistory) : [];
  
    // Add the city to the search history array
    historyArr.unshift(city);
  
    // Limit the search history to 5 items
    if (historyArr.length > 5) {
      historyArr = historyArr.slice(0, 5);
    }
  
    // Save the updated search history to local storage
    localStorage.setItem('searchHistory', JSON.stringify(historyArr));
  
    displaySearchHistory();
  }
  
  function displaySearchHistory() {
    const searchHistory = localStorage.getItem('searchHistory');
    const historyContainer = document.getElementById('search-history');
    historyContainer.innerHTML = '';
  
    if (searchHistory) {
      const historyArr = JSON.parse(searchHistory);
  
      historyArr.forEach(city => {
        const historyItem = document.createElement('div');
        historyItem.textContent = city;
        historyItem.classList.add('history-item');
  
        historyItem.addEventListener('click', () => {
          document.getElementById('city').value = city;
          searchWeather();
        });
  
        historyContainer.appendChild(historyItem);
      });
    }
  }
