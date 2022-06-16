import './style.css';
import { buildPage, buildWeather } from './buildDom';

class App {
  #content;

  #openWeatherMap;

  constructor() {
    // this is a free key
    this.#openWeatherMap = 'ce8fef5a5b6a247296d4aeaa5e8ef82a';
    const create = (element) => document.createElement(element);

    this.#content = create('div');
    this.#content.id = 'content';
    document.body.append(this.#content);

    const [domObj, search] = buildPage();

    search.addEventListener('keyup', (e) => {
      if (e.keyCode === 13) {
        this.#callApi(search.value);
      }
    });

    this.#content.append(domObj);
  }

  async #callApi(city) {
    const geoResponse = await fetch(
      `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${
        this.#openWeatherMap
      }`,
      { mode: 'cors' }
    );
    const geoData = await geoResponse.json();
    const { lat } = geoData[0];
    const { lon } = geoData[0];

    const [weather, forecast] = await Promise.all([
      fetch(
        `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${
          this.#openWeatherMap
        }&units=metric`,
        { mode: 'cors' }
      ),
      fetch(
        `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&cnt=8&appid=${
          this.#openWeatherMap
        }&units=metric`,
        { mode: 'cors' }
      ),
    ]);
    const weatherData = await weather.json();
    const forecastData = await forecast.json();

    this.#processData({ weatherData, forecastData });
  }

  #processData({ weatherData = {}, forecastData = {} }) {
    const { name } = weatherData;

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

    const temperature = `${Math.round(weatherData.main.temp)} °C`;

    const chanceOfRain = `${forecastData.list[0].pop * 100} %`;

    const speed = `${Math.round(weatherData.wind.speed * 3.6)} km/h`;

    const humidity = `${weatherData.main.humidity} %`;

    let sunrise = new Date(weatherData.sys.sunrise * 1000);
    [sunrise] = sunrise.toTimeString().match(/^(\d{2}):(\d{2})/);

    let sunset = new Date(weatherData.sys.sunset * 1000);
    [sunset] = sunset.toTimeString().match(/^(\d{2}):(\d{2})/);

    const forecast = [];

    forecastData.list.forEach((item) => {
      forecast.push({
        icon: item.weather[0].icon,
        time: item.dt_txt.match(/ (\d{2}:\d{2})/)[1],
        temperature: `${Math.round(item.main.temp)}°C`,
        chanceOfRain: `${item.pop * 100}%`,
        speed: `${Math.round(item.wind.speed * 3.6)}km/h`,
      });
    });

    const domObj = buildWeather({
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
    });
    this.#content.append(domObj);
  }
}

const app = new App();
