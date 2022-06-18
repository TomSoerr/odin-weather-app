const create = (element = 'div') => document.createElement(element);

function buildPage() {
  const searchDiv = create();
  searchDiv.id = 'header';
  const search = create('input');
  search.type = 'search';
  search.placeholder = 'Search for a city';
  searchDiv.append(search);

  return [searchDiv, search];
}

function buildWeather(data) {
  console.log(data);

  const domObj = create();
  domObj.id = 'container';

  const today = create();
  today.id = 'today';
  const city = create('p');
  city.textContent = data.name;
  const date = create('p');
  date.textContent = data.today;
  const icon = create('img');
  icon.src = `https://openweathermap.org/img/wn/${data.icon}@2x.png`;
  const temperature = create('p');
  temperature.textContent = data.temperature;
  const rainLabel = create('p');
  rainLabel.classList.add('label');
  rainLabel.textContent = 'Chance of rain:';
  const rain = create('p');
  rain.textContent = data.chanceOfRain;
  const windLabel = create('p');
  windLabel.classList.add('label');
  windLabel.textContent = 'Wind speed:';
  const wind = create('p');
  wind.textContent = data.speed;
  const humidityLabel = create('p');
  humidityLabel.classList.add('label');
  humidityLabel.textContent = 'Humidity:';
  const humidity = create('p');
  humidity.textContent = data.humidity;
  const sunriseLabel = create('p');
  sunriseLabel.classList.add('label');
  sunriseLabel.textContent = 'Sunrise:';
  const sunrise = create('p');
  sunrise.textContent = data.sunrise;
  const sunsetLabel = create('p');
  sunsetLabel.classList.add('label');
  sunsetLabel.textContent = 'Sunset:';
  const sunset = create('p');
  sunset.textContent = data.sunset;
  today.append(
    city,
    date,
    icon,
    temperature,
    rainLabel,
    rain,
    windLabel,
    wind,
    humidityLabel,
    humidity,
    sunriseLabel,
    sunrise,
    sunsetLabel,
    sunset
  );

  const forecast = create();
  forecast.id = 'forecast';
  [...data.forecast].forEach((item) => {
    const card = create();
    card.classList.add('card');
    const forecastIcon = create('img');
    forecastIcon.src = `https://openweathermap.org/img/wn/${item.icon}@2x.png`;
    const time = create('p');
    time.textContent = item.time;
    const forecastTemperature = create('p');
    forecastTemperature.textContent = item.temperature;
    const forecastRainLabel = create('p');
    forecastRainLabel.classList.add('label');
    forecastRainLabel.textContent = 'Rain:';
    const forecastRain = create('p');
    forecastRain.textContent = item.chanceOfRain;
    const forecastWindLabel = create('p');
    forecastWindLabel.classList.add('label');
    forecastWindLabel.textContent = 'Wind:';
    const forecastWind = create('p');
    forecastWind.textContent = item.speed;
    card.append(
      time,
      forecastIcon,
      forecastTemperature,
      forecastRainLabel,
      forecastRain,
      forecastWindLabel,
      forecastWind
    );
    forecast.append(card);
  });

  domObj.append(today, forecast);

  return domObj;
}

export { buildPage, buildWeather };
