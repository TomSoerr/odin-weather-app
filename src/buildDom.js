const create = (element = 'div') => document.createElement(element);

function buildPage() {
  const domObj = create();

  const searchDiv = create();
  searchDiv.id = 'search';
  const search = create('input');
  search.type = 'search';
  search.placeholder = 'Search for a city';
  searchDiv.append(search);

  const today = create();
  today.id = 'today';

  const forecast = create();
  forecast.id = 'forecast';

  domObj.append(searchDiv, today, forecast);

  return [domObj, search];
}

function buildWeather(data) {
  console.log(data);

  const domObj = create();

  const today = create();
  const icon = create('img');
  icon.src = `https://openweathermap.org/img/wn/${data.icon}@2x.png`;
  const city = create('p');
  city.textContent = data.name;
  const date = create('p');
  date.textContent = data.today;
  const temperature = create('p');
  temperature.textContent = data.temperature;
  const rain = create('p');
  rain.textContent = data.chanceOfRain;
  const wind = create('p');
  wind.textContent = data.speed;
  const humidity = create('p');
  humidity.textContent = data.humidity;
  const sunrise = create('p');
  sunrise.textContent = data.sunrise;
  const sunset = create('p');
  sunset.textContent = data.sunset;
  today.append(
    icon,
    city,
    date,
    temperature,
    rain,
    wind,
    humidity,
    sunrise,
    sunset
  );

  const forecast = create();
  [...data.forecast].forEach((item) => {
    const card = create();
    const forecastIcon = create('img');
    forecastIcon.src = `https://openweathermap.org/img/wn/${data.icon}@2x.png`;
    const time = create('p');
    time.textContent = item.time;
    const forecastTemperature = create('p');
    forecastTemperature.textContent = item.temperature;
    const forecastRain = create('p');
    forecastRain.textContent = item.chanceOfRain;
    const forecastWind = create('p');
    forecastWind.textContent = item.speed;
    card.append(
      forecastIcon,
      time,
      forecastTemperature,
      forecastRain,
      forecastWind
    );
    forecast.append(card);
  });

  domObj.append(today, forecast);

  return domObj;
}

export { buildPage, buildWeather };
