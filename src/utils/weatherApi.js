export const getCurrentWeather = ({ latitude, longitude }, APIkey) => {
  return fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${APIkey}`
  ).then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Error: ${res.status}`);
    }
  });
};

export const filterWeatherData = (data) => {
  const fahrenheit = Math.round(data.main.temp);
  const celsius = Math.round(((fahrenheit - 32) * 5) / 9);

  const result = {
    city: data.name,
    temp: {
      F: fahrenheit,
      C: celsius,
    },
    type: getWeatherType(fahrenheit),
    condition: data.weather[0].main.toLowerCase(),
    isDay: isDay(data.sys, Date.now()),
  };

  return result;
};

const isDay = ({ sunrise, sunset }, now) => {
  return sunrise * 1000 < now && now < sunset * 1000;
};

const getWeatherType = (temperature) => {
  if (temperature >= 86) {
    return "hot";
  } else if (temperature >= 66) {
    return "warm";
  } else {
    return "cold";
  }
};
