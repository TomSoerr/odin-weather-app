/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
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

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7OztBQUFBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1AsUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxZQUFZLE9BQU87O0FBRW5CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUssSUFBSSxnQkFBZ0IsR0FBRyxpQkFBaUIsR0FBRyxvQkFBb0I7O0FBRXBFO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLG1EQUFtRCxFQUFFLE1BQU0sRUFBRTs7QUFFN0Q7QUFDQSxpREFBaUQsRUFBRSxNQUFNLEVBQUU7O0FBRTNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9vZGluLXdlYXRoZXItYXBwLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImNsYXNzIEFwcCB7XG4gICNjb250ZW50O1xuXG4gICNvcGVuV2VhdGhlck1hcDtcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICAvLyB0aGlzIGlzIGEgZnJlZSBrZXlcbiAgICB0aGlzLiNvcGVuV2VhdGhlck1hcCA9ICdjZThmZWY1YTViNmEyNDcyOTZkNGFlYWE1ZThlZjgyYSc7XG4gICAgY29uc3QgY3JlYXRlID0gKGVsZW1lbnQpID0+IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoZWxlbWVudCk7XG5cbiAgICB0aGlzLiNjb250ZW50ID0gY3JlYXRlKCdkaXYnKTtcbiAgICB0aGlzLiNjb250ZW50LmlkID0gJ2NvbnRlbnQnO1xuICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kKHRoaXMuI2NvbnRlbnQpO1xuXG4gICAgY29uc3QgYnRuID0gY3JlYXRlKCdidXR0b24nKTtcbiAgICBidG4udGV4dENvbnRlbnQgPSAnQ2FsbCBBUEknO1xuICAgIHRoaXMuI2NvbnRlbnQuYXBwZW5kKGJ0bik7XG4gICAgYnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy4jY2FsbEFwaS5iaW5kKHRoaXMpKTtcbiAgfVxuXG4gIGFzeW5jICNjYWxsQXBpKCkge1xuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goXG4gICAgICBgaHR0cDovL2FwaS5vcGVud2VhdGhlcm1hcC5vcmcvZGF0YS8yLjUvd2VhdGhlcj9xPUhhbWJ1cmcmYXBwaWQ9JHtcbiAgICAgICAgdGhpcy4jb3BlbldlYXRoZXJNYXBcbiAgICAgIH0mdW5pdHM9bWV0cmljYCxcbiAgICAgIHsgbW9kZTogJ2NvcnMnIH1cbiAgICApO1xuICAgIGNvbnN0IGRhdGEgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XG4gICAgY29uc29sZS5sb2coZGF0YSk7XG4gICAgdGhpcy4jcHJvY2Vzc0RhdGEoZGF0YSk7XG4gIH1cblxuICAjcHJvY2Vzc0RhdGEoZGF0YSkge1xuICAgIGNvbnN0IHsgbmFtZSB9ID0gZGF0YTtcblxuICAgIGNvbnN0IGRheXMgPSBbXG4gICAgICAnU3VuZGF5JyxcbiAgICAgICdNb25kYXknLFxuICAgICAgJ1R1ZXNkYXknLFxuICAgICAgJ1dlZG5lc2RheScsXG4gICAgICAnVGh1cnNkYXknLFxuICAgICAgJ0ZyaWRheScsXG4gICAgICAnU2F0dXJkYXknLFxuICAgIF07XG4gICAgbGV0IHRvZGF5ID0gbmV3IERhdGUoKTtcbiAgICB0b2RheSA9IGAke1xuICAgICAgZGF5c1t0b2RheS5nZXREYXkoKV1cbiAgICB9LCAke3RvZGF5LmdldERhdGUoKX0uJHt0b2RheS5nZXRNb250aCgpfS4ke3RvZGF5LmdldEZ1bGxZZWFyKCl9YDtcblxuICAgIGNvbnN0IHRlbXBlcmF0dXJlID0gZGF0YS5tYWluLnRlbXA7XG4gICAgY29uc3QgdGVtcGVyYXR1cmVNaW4gPSBkYXRhLm1haW4udGVtcF9taW47XG4gICAgY29uc3QgdGVtcGVyYXR1cmVNYXggPSBkYXRhLm1haW4udGVtcF9tYXg7XG5cbiAgICBsZXQgc3VucmlzZSA9IG5ldyBEYXRlKGRhdGEuc3lzLnN1bnJpc2UgKiAxMDAwKTtcbiAgICBbc3VucmlzZV0gPSBzdW5yaXNlLnRvVGltZVN0cmluZygpLm1hdGNoKC9eKFxcZHsyfSk6KFxcZHsyfSkvKTtcblxuICAgIGxldCBzdW5zZXQgPSBuZXcgRGF0ZShkYXRhLnN5cy5zdW5zZXQgKiAxMDAwKTtcbiAgICBbc3Vuc2V0XSA9IHN1bnNldC50b1RpbWVTdHJpbmcoKS5tYXRjaCgvXihcXGR7Mn0pOihcXGR7Mn0pLyk7XG5cbiAgICB0aGlzLiNzaG93RGF0YSh7XG4gICAgICBuYW1lLFxuICAgICAgdG9kYXksXG4gICAgICB0ZW1wZXJhdHVyZSxcbiAgICAgIHRlbXBlcmF0dXJlTWluLFxuICAgICAgdGVtcGVyYXR1cmVNYXgsXG4gICAgICBzdW5zZXQsXG4gICAgICBzdW5yaXNlLFxuICAgIH0pO1xuICB9XG5cbiAgI3Nob3dEYXRhKGRhdGEpIHtcbiAgICBjb25zb2xlLmxvZyhkYXRhKTtcbiAgfVxufVxuXG5jb25zdCBhcHAgPSBuZXcgQXBwKCk7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=