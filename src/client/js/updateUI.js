function updateUI(geo, weather, image, date){
  return    `<div class="card-header">
                <h2 class="header1">My trip to: <span class="output">${geo.toponymName}, ${geo.countryName}</span></h2>
                <h2 class="header2">Departing: <span class="output">${date}</span></h2>
            </div>
            <div class="image">
                    <img src=${image.webformatURL} alt="You can find images like this on https://pixabay.com">
                </div>
            <section class="travel-details">
                <div class="destination-info">
                <h3>Population: <span class="sub-item">${geo.population}</span></h3>
                </div>
            </section>
            <section class="weather-details">
                ${updateWeatherSection({weather})}
            </section>
      `;

}

function updateWeatherSection(data, date) {
    const weather = data.weather;
    if (weather.length > 1) {
        return weather
        .map((item) => {
          return `
            <div class="multiple-item">
                <div class="weather-date">
                    <span>${item.valid_date}</span>
                </div>
                <div class="weather-temp">
                    <div class="temp-item">
                        <h3 class="label">High</h3>
                        <p>${item.high_temp} <span class="celcius">&#8451;</span></p>
                    </div>
                    <div class="temp-item">
                        <h3 class="label">Low</h3>
                        <p>${item.low_temp} <span class="celcius">&#8451;</span></p>
                    </div>
                </div>
                <div class="weather-description">
                    <h3>Expect:</h3>
                    <p>${item.weather.description}</p>
                </div>
            </div>
            `;
        })
        .join(" ");
    } else {
        return `
            <div class="item">
                <div class="weather-date">
                    <span>${weather[0].ob_time}</span>
                </div>
                <div class="weather-temp">
                    <div class="temp-item">
                        <h3>Temperature</h3>
                        <p>${weather[0].temp} <span class="celcius">&#8451;</span></p>
                    </div>
                    <div class="temp-item">
                        <h3>Real sensation</h3>
                        <p>${weather[0].app_temp} <span class="celcius">&#8451;</span></p>
                    </div>
                </div>
                <div class="weather-description">
                    <h3>Expect:</h3>
                    <p>${weather[0].weather.description}</p>
                </div>
            </div>
        `;
    }
}

export { updateUI }

