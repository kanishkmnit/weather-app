document.addEventListener('DOMContentLoaded', () => {
    const cityInput = document.getElementById("city-input");
    const getWeatherBtn = document.getElementById("get-weather-btn");
    const weatherInfo = document.getElementById("weather-info");
    const cityNameDisplay = document.getElementById("city-name");
    const temperatureDisplay = document.getElementById("temperature");
    const descriptionDisplay = document.getElementById("description");
    const errorMessage = document.getElementById("error-message");

    getWeatherBtn.addEventListener('click', async () => {
        const city = cityInput.value.trim();
        if (!city) return;

        try {
            const weatherData = await fetchWeatherData(city);
            displayWeatherData(weatherData);
        } catch (error) {
            showError();
        }
    });

    async function fetchWeatherData(city) {
        const apiKey = "fcf92f75cbe268262f83720b8a9008d2";
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("City Not Found");
        }

        const data = await response.json();
        return data;
    }

    function displayWeatherData(data) {
        const { name, main, weather, wind, sys } = data;
        const icon = weather[0].icon;

        // Set the weather icon
        const weatherIcon = document.getElementById("weather-icon");
        weatherIcon.src = `https://openweathermap.org/img/wn/${icon}@2x.png`;

        // Display weather data
        cityNameDisplay.textContent = name;
        temperatureDisplay.textContent = `Temperature: ${main.temp} °C`;
        descriptionDisplay.textContent = weather[0].description;

        // Display additional weather details
        document.getElementById("humidity").textContent = `Humidity: ${main.humidity}%`;
        document.getElementById("wind-speed").textContent = `Wind Speed: ${wind.speed} m/s`;
        document.getElementById("pressure").textContent = `Pressure: ${main.pressure} hPa`;

        // Convert and display sunrise/sunset times
        const sunriseTime = new Date(sys.sunrise * 1000);
        const sunsetTime = new Date(sys.sunset * 1000);
        document.getElementById("sunrise").textContent = `Sunrise: ${sunriseTime.toLocaleTimeString()}`;
        document.getElementById("sunset").textContent = `Sunset: ${sunsetTime.toLocaleTimeString()}`;

        weatherInfo.classList.remove('hidden');
        errorMessage.classList.add('hidden');
    }

    function showError() {
        weatherInfo.classList.add('hidden');
        errorMessage.classList.remove('hidden');
    }
});
