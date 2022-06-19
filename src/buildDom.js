import oneDay from './img/01d.svg';
import oneNight from './img/01n.svg';
import twoDay from './img/02d.svg';
import twoNight from './img/02n.svg';
import threeDay from './img/03d.svg';
import threeNight from './img/03n.svg';
import fourDay from './img/04d.svg';
import fourNight from './img/04n.svg';
import nineDay from './img/09d.svg';
import nineNight from './img/09n.svg';
import tenDay from './img/10d.svg';
import tenNight from './img/10n.svg';
import elevenDay from './img/11d.svg';
import elevenNight from './img/11n.svg';
import thirteenDay from './img/13d.svg';
import thirteenNight from './img/13n.svg';
import fiftyDay from './img/50d.svg';
import fiftyNight from './img/50n.svg';

const img = {
  '01d': oneDay,
  '01n': oneNight,
  '02d': twoDay,
  '02n': twoNight,
  '03d': threeDay,
  '03n': threeNight,
  '04d': fourDay,
  '04n': fourNight,
  '09d': nineDay,
  '09n': nineNight,
  '10d': tenDay,
  '10n': tenNight,
  '11d': elevenDay,
  '11n': elevenNight,
  '13d': thirteenDay,
  '13n': thirteenNight,
  '50d': fiftyDay,
  '50n': fiftyNight,
};

const create = (element = 'div') => document.createElement(element);

function buildPage() {
  const header = create();
  header.id = 'header';
  const searchContainer = create();
  searchContainer.id = 'search-container';
  const search = create('input');
  search.type = 'search';
  search.placeholder = 'Search for a city';
  const errorMsg = create('span');
  searchContainer.append(search, errorMsg);
  const select = create();
  select.id = 'select';
  const celsius = create('button');
  celsius.id = 'celsius';
  celsius.classList.add('active');
  celsius.textContent = '°C';
  const fahrenheit = create('button');
  fahrenheit.id = 'fahrenheit';
  fahrenheit.textContent = '°F';
  select.append(celsius, fahrenheit);
  header.append(searchContainer, select);

  return [header, search, celsius, fahrenheit, errorMsg];
}

function buildWeather(data) {
  const domObj = create();
  domObj.id = 'container';

  const today = create();
  today.id = 'today';
  const city = create('p');
  city.textContent = data.name;
  const date = create('p');
  date.textContent = data.today;
  const icon = create('img');
  icon.src = img[data.icon];
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

  today.append(city, date, icon, temperature, rainLabel, rain);
  if (data.rain != null) {
    const rainVolumeLabel = create('p');
    rainVolumeLabel.classList.add('label');
    rainVolumeLabel.textContent = 'Volume/h:';
    const rainVolume = create('p');
    rainVolume.textContent = data.rain;
    today.append(rainVolumeLabel, rainVolume);
  }
  today.append(
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
    forecastIcon.src = img[item.icon];
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
      forecastRain
    );
    if (item.rain != null) {
      const forecastRainVolumeLabel = create('p');
      forecastRainVolumeLabel.classList.add('label');
      forecastRainVolumeLabel.textContent = 'Volume/3h:';
      const forecastRainVolume = create('p');
      forecastRainVolume.textContent = item.rain;

      card.append(forecastRainVolumeLabel, forecastRainVolume);
    }
    card.append(forecastWindLabel, forecastWind);
    forecast.append(card);
  });

  domObj.append(today, forecast);

  return domObj;
}

export { buildPage, buildWeather };
