import './style.css';
import { buildPage, buildWeather } from './buildDom';

class App {
  #content;

  #openWeatherMap;

  #units;

  #current;

  #errorSpan;

  constructor() {
    // this is a free key
    this.#openWeatherMap = 'ce8fef5a5b6a247296d4aeaa5e8ef82a';
    this.#units = 'metric'; // imperial
    this.#current = 'Bayern';

    this.#content = document.createElement('div');
    this.#content.id = 'content';
    document.body.append(this.#content);

    const [domObj, search, celsius, fahrenheit, errorMsg] = buildPage();

    this.#errorSpan = errorMsg;

    search.addEventListener('keyup', (e) => {
      if (e.key === 'Enter') {
        this.#callApi(search.value);
        search.value = '';
      }
    });

    celsius.addEventListener('click', () => {
      celsius.classList.add('active');
      fahrenheit.classList.remove('active');
      this.#units = 'metric';
      this.#callApi();
    });

    fahrenheit.addEventListener('click', () => {
      celsius.classList.remove('active');
      fahrenheit.classList.add('active');
      this.#units = 'imperial';
      this.#callApi();
    });

    this.#content.append(domObj);
    this.#callApi();
  }

  async #callApi(city = this.#current) {
    this.#current = city;

    let lat;
    let lon;
    let name;

    try {
      const geoResponse = await fetch(
        `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${
          this.#openWeatherMap
        }`,
        { mode: 'cors' }
      );
      const geoData = await geoResponse.json();

      lat = geoData[0].lat;
      lon = geoData[0].lon;
      name = geoData[0].name;
      if (geoData[0].state && geoData[0].state !== geoData[0].name) {
        name += `, ${geoData[0].state}`;
      }
      this.#errorSpan.textContent = '';
    } catch (error) {
      console.log(error);
      this.#errorSpan.textContent = 'City not found';
    }

    if (lat != null && lon != null && name != null) {
      try {
        const [weatherData, forecastData] = await Promise.all([
          (async () => {
            const weatherResponse = await fetch(
              `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${
                this.#openWeatherMap
              }&units=${this.#units}`,
              { mode: 'cors' }
            );
            const weather = await weatherResponse.json();
            return weather;
          })(),
          (async () => {
            const forecastResponse = await fetch(
              `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&cnt=8&appid=${
                this.#openWeatherMap
              }&units=${this.#units}`,
              { mode: 'cors' }
            );
            const forecast = await forecastResponse.json();
            return forecast;
          })(),
        ]);

        this.#processData({ weatherData, forecastData, name });
        this.#errorSpan.textContent = '';
      } catch (error) {
        console.log(error);
        this.#errorSpan.textContent = 'Could not fetch data';
      }
    }
  }

  #processData({ weatherData = {}, forecastData = {}, name = 'Unknown' }) {
    const { icon } = weatherData.weather[0];

    const days = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ];
    let today = new Date();
    today = `${days[today.getDay()]}, ${today.getDate()}.${
      today.getMonth() + 1
    }.${today.getFullYear()}`;

    const temperature =
      this.#units === 'metric'
        ? `${Math.round(weatherData.main.temp)}°C`
        : `${Math.round(weatherData.main.temp)}°F`;

    const chanceOfRain = `${forecastData.list[0].pop * 100}%`;

    const speed =
      this.#units === 'metric'
        ? `${Math.round(weatherData.wind.speed * 3.6)}km/h`
        : `${Math.round(weatherData.wind.speed)}mph`;

    const humidity = `${weatherData.main.humidity}%`;

    let sunrise = new Date(weatherData.sys.sunrise * 1000);
    [sunrise] = sunrise.toTimeString().match(/^(\d{2}):(\d{2})/);

    let sunset = new Date(weatherData.sys.sunset * 1000);
    [sunset] = sunset.toTimeString().match(/^(\d{2}):(\d{2})/);

    const forecast = [];

    forecastData.list.forEach((item) => {
      const obj = {
        icon: item.weather[0].icon,
        time: item.dt_txt.match(/ (\d{2}:\d{2})/)[1],
        temperature:
          this.#units === 'metric'
            ? `${Math.round(item.main.temp)}°C`
            : `${Math.round(item.main.temp)}°F`,
        chanceOfRain: `${Math.round(item.pop * 100)}%`,
        speed:
          this.#units === 'metric'
            ? `${Math.round(item.wind.speed * 3.6)}km/h`
            : `${Math.round(item.wind.speed)}mph`,
      };

      if ('rain' in item && '3h' in item.rain) {
        obj.rain = `${item.rain['3h']}mm`;
      }
      forecast.push(obj);
    });

    if (this.#content.children[1]) this.#content.children[1].remove();

    const obj = {
      name,
      icon,
      today,
      temperature,
      chanceOfRain,
      speed,
      humidity,
      sunset,
      sunrise,
      forecast,
    };
    if ('rain' in weatherData && '1h' in weatherData.rain) {
      obj.rain = `${weatherData.rain['1h']}mm`;
    }
    const domObj = buildWeather(obj);
    this.#content.append(domObj);
  }
}

const app = new App();
