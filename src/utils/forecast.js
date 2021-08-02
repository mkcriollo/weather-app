const request = require("request");

const forecast = (latitude, longitude, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=a794308a6caa52ec52e767021cb44f83&query=${
    (latitude, longitude)
  }&unit=f`;

  request({ url, json: true }, (error, res) => {
    if (error) {
      callback("Unable to connect to internet");
    } else if (res.body.error) {
      callback("Unable to find location");
    } else {
      const data = res.body.current;

      callback(
        undefined,
        `${data.is_day ? "Todays" : "Tonights"} Weather Report : Its ${
          data.weather_descriptions[0]
        }. It is currently ${
          data.temperature
        } degrees out. Although it feels like ${
          data.feelslike
        } degrees out. The humidity is ${data.humidity} %`
      );
    }
  });
};

module.exports = forecast;
