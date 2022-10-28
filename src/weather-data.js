async function getGeoCode(input) {
  const geoCodeResponse = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${input.value}&limit=1&appid=fdc03d483993fc606c94afc7b9d4a3d6`, { mode: 'cors' })
  const geoCodeData = await geoCodeResponse.json()
  const { name, lat, lon } = geoCodeData[0];
  console.log(lat, lon)
  return { name: name, lat: lat, lon: lon }
}

export async function getWeather(input) {
  const isDOM = el => el instanceof Element
  try {
    // checking if input is element or object
    // so i'd be able to pass in an object instead of element
    // to test out different locations by passing in a different value
    // in lat and lon in the api url
    if (isDOM(input)) {
      const geoLocation = await getGeoCode(input)
      const weatherResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${geoLocation.lat}&lon=${geoLocation.lon}&units=metric&appid=fdc03d483993fc606c94afc7b9d4a3d6`, { mode: 'cors' })
      const weatherData = await weatherResponse.json()
      const { main: { temp, temp_max, temp_min, humidity, feels_like }, sys: { country }, weather: [{ main, description }] } = weatherData
      return {
        city: geoLocation.name,
        country: country,
        temperature: temp,
        minTemp: temp_min,
        maxTemp: temp_max,
        humidity: humidity,
        feelsLike: feels_like,
        mainWeather: main,
        desc: description
      }
    } else {
      const weatherResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${input.lat}&lon=${input.lon}&units=metric&appid=fdc03d483993fc606c94afc7b9d4a3d6`, { mode: 'cors' })
      const weatherData = await weatherResponse.json()
      const { main: { temp, temp_max, temp_min, humidity, feels_like }, name, sys: { country }, weather: [{ main, description }] } = weatherData
      return {
        city: name,
        country: country,
        temperature: temp,
        minTemp: temp_min,
        maxTemp: temp_max,
        humidity: humidity,
        feelsLike: feels_like,
        mainWeather: main,
        desc: description
      }
    }
  } catch (e) {
    console.log(e)
    console.log('City Doesnt Exist')
  }
}

function defaultErrorLoc(err, Display) {
  console.warn(`ERROR(${err.code}): ${err.message}`);
  Display.displayWeather(getWeather, { lat: 40.730610, lon: -73.935242 })
}


export function userCurrentWeather(Display) {
  return navigator.geolocation.getCurrentPosition(function(pos) {
    const position = pos.coords
    const { latitude, longitude } = position
    Display.displayWeather(getWeather, { lat: latitude, lon: longitude })
    forecastHours(12, { lat: latitude, lon: longitude })
  }, err => {
    defaultErrorLoc(err, Display)
  })
}


export async function getHoursForecast(input) {
  const isDOM = el => el instanceof Element
  try {
    if (isDOM(input)) {
      const geoCode = await getGeoCode(input)
      const forecastResponse = await fetch(`https://api.weatherbit.io/v2.0/forecast/hourly?lat=${geoCode.lat}&lon=${geoCode.lon}&key=bf5cd06a8b584d3e9cfb34307c2ca472&hours=24`)
      const forecastData = await forecastResponse.json()
      const { data } = forecastData;
      // console.log(data)
      return data
    } else {
      const forecastResponse = await fetch(`https://api.weatherbit.io/v2.0/forecast/hourly?lat=${input.lat}&lon=${input.lon}&key=bf5cd06a8b584d3e9cfb34307c2ca472&hours=24`)
      const forecastData = await forecastResponse.json()
      const { data } = forecastData;
      return data
    }
  } catch (error) {
    console.log(error)
  }
}

export async function forecastHours(hours, input) {
  const forecastData = await getHoursForecast(input)
  const relevantDataHrs = []
  for (let i = 0; i < hours; i++) {
    const { app_temp, timestamp_local, weather: { description } } = forecastData[i]
    relevantDataHrs[i] = { temp: app_temp, time: timestamp_local, weather: description }
  }
  console.log(relevantDataHrs)
  return relevantDataHrs
}

