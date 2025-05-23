const customCities = [];

function updateCurrentTime() {
    const now = new Date();
    const options = { hour12: true, weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
    const currentDateTime = now.toLocaleString('en-US', options);
    document.getElementById('current-time-display').textContent = `${currentDateTime}`;
}

function updateAllCityTimes() {
    const cities = document.querySelectorAll('.clock');
    cities.forEach(city => {
        const cityName = city.getAttribute('data-city');
        const timezone = city.getAttribute('data-timezone');
        updateTime(cityName, timezone);
    });
}

updateCurrentTime();
setInterval(updateCurrentTime, 1000);

updateAllCityTimes();
setInterval(updateAllCityTimes, 1000);

function getCurrentTime(timezone) {
    const now = new Date();
    const options = { timeZone: timezone, hour12: true, hour: 'numeric', minute: 'numeric', second: 'numeric' };
    return now.toLocaleTimeString('en-US', options);
}

function clearClocks(selectedCity) {
    const clocks = document.querySelectorAll('.clock');
    clocks.forEach(clock => {
        const cityName = clock.getAttribute('data-city');
        if (!customCities.find(city => city.name === cityName) && cityName !== selectedCity) {
            clock.remove();
        }
    });
}

function updateTime(cityName, timezone) {
    const clockDiv = document.querySelector(`.clock[data-city="${cityName}"]`);
    const dateElement = clockDiv.querySelector('.date');
    const timeElement = clockDiv.querySelector('.time');
    const currentTime = getCurrentTime(timezone);

    const now = new Date();
    const options = { timeZone: timezone, weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const currentDate = now.toLocaleDateString('en-US', options);

    dateElement.textContent = currentDate;
    timeElement.textContent = `${cityName}: ${currentTime}`;
}

function displayTime(cityName, timezone) {
    const time = getCurrentTime(timezone);
    const clockDiv = document.createElement('div');
    clockDiv.classList.add('clock');
    clockDiv.setAttribute('data-city', cityName);
    clockDiv.setAttribute('data-timezone', timezone);
    clockDiv.innerHTML = `
        <p class="date"></p>
        <p class="time">${cityName}: ${time}</p>`;

    const defaultOption = document.getElementById('city').querySelector(`option[value="${cityName}"]`);
    if (!defaultOption) {
        document.getElementById('custom-cities-container').appendChild(clockDiv);
        customCities.push({ name: cityName, timezone: timezone });
    } else {
        document.getElementById('clocks-container').appendChild(clockDiv);
    }

    updateTime(cityName, timezone);
}

document.getElementById('city').addEventListener('change', () => {
    const selectedCity = document.getElementById('city').value;
    const timezone = document.getElementById('city').options[document.getElementById('city').selectedIndex].getAttribute('data-timezone');
    if (selectedCity && timezone) {
        clearClocks(selectedCity);
        displayTime(selectedCity, timezone);
    }
});

document.getElementById('add-location-btn').addEventListener('click', () => {
    const city = prompt('Enter city name:');
    const timezone = prompt('Enter timezone (e.g., America/New_York):');
    if (city && timezone) {
        clearClocks(city);
        displayTime(city, timezone);
    }
});
