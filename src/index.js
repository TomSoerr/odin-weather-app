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

    const btn = create('button');
    btn.textContent = 'Call API';
    this.#content.append(btn);
    btn.addEventListener('click', this.#callApi.bind(this));
  }

  async #callApi() {
    const response = await fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=Hamburg&appid=${
        this.#openWeatherMap
      }&units=metric`,
      { mode: 'cors' }
    );
    const data = await response.json();
    console.log(data);
    this.#processData(data);
  }

  #processData(data) {
    const { name } = data;

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
    today = `${
      days[today.getDay()]
    }, ${today.getDate()}.${today.getMonth()}.${today.getFullYear()}`;

    const temperature = data.main.temp;
    const temperatureMin = data.main.temp_min;
    const temperatureMax = data.main.temp_max;

    let sunrise = new Date(data.sys.sunrise * 1000);
    [sunrise] = sunrise.toTimeString().match(/^(\d{2}):(\d{2})/);

    let sunset = new Date(data.sys.sunset * 1000);
    [sunset] = sunset.toTimeString().match(/^(\d{2}):(\d{2})/);

    this.#showData({
      name,
      today,
      temperature,
      temperatureMin,
      temperatureMax,
      sunset,
      sunrise,
    });
  }

  #showData(data) {
    console.log(data);
  }
}

const app = new App();
