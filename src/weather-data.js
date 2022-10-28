async function getGeoCode(input) {
  const geoCodeResponse = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${input.value}&limit=1&appid=fdc03d483993fc606c94afc7b9d4a3d6`, { mode: 'cors' })
  const geoCodeData = await geoCodeResponse.json()
  const { name, lat, lon } = geoCodeData[0];
  // console.log(lat, lon)
  return { name: name, lat: lat, lon: lon }
}

// checking if input is element or object
// so i'd be able to pass in an object instead of element
// to test out different locations by passing in a different value
// in lat and lon in the api url
export async function getCurrentWeather(input) {
  const isDOM = el => el instanceof Element
  try {
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
  Display.displayWeather(getCurrentWeather, { lat: 40.730610, lon: -73.935242 })
}

export function userCurrentWeather(Display) {
  return navigator.geolocation.getCurrentPosition(function(pos) {
    const position = pos.coords
    const { latitude, longitude } = position
    Display.displayWeather(getCurrentWeather, { lat: latitude, lon: longitude })
    getExtHourlyForecast(12, { lat: latitude, lon: longitude })
    getExtDailyForecast(12, { lat: latitude, lon: longitude })
  }, err => {
    defaultErrorLoc(err, Display)
  })
}


export async function getHourlyForecast(input) {
  const isDOM = el => el instanceof Element
  try {
    if (isDOM(input)) {
      const geoCode = await getGeoCode(input)
      const forecastResponse = await fetch(`https://api.weatherbit.io/v2.0/forecast/hourly?lat=${geoCode.lat}&lon=${geoCode.lon}&key=bf5cd06a8b584d3e9cfb34307c2ca472&hours=24`)
      const forecastData = await forecastResponse.json()
      const { data } = forecastData;
      console.log(data)
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


export async function getDailyForecast(input) {
  const isDOM = el => el instanceof Element
  try {
    if (isDOM(input)) {
      const geoCode = await getGeoCode(input)
      const forecastDailyResponse = await fetch(`https://api.weatherbit.io/v2.0/forecast/daily?lat=${geoCode.lat}&lon=${geoCode.lon}&key=bf5cd06a8b584d3e9cfb34307c2ca472`)
      const forecastDailyData = await forecastDailyResponse.json()
      const { data } = forecastDailyData;
      console.log(data)
      return data
    } else {
      const forecastDailyResponse = await fetch(`https://api.weatherbit.io/v2.0/forecast/daily?lat=${input.lat}&lon=${input.lon}&key=bf5cd06a8b584d3e9cfb34307c2ca472`)
      const forecastDailyData = await forecastDailyResponse.json()
      const { data } = forecastDailyData;
      return data
    }
  } catch (error) {
    console.log(error)
  }
}


export async function getExtHourlyForecast(hours, input) {
  try {
    const forecastData = await getHourlyForecast(input)
    const relevantDataHrs = []
    for (let i = 0; i < hours; i++) {
      const { app_temp, timestamp_local, weather: { description } } = forecastData[i]
      relevantDataHrs[i] = { temp: app_temp, time: timestamp_local, weather: description }
    }
    console.log(relevantDataHrs)
    return relevantDataHrs

  } catch (error) {
    console.log(error)
  }
}


export async function getExtDailyForecast(days, input) {
  try {
    const forecastData = await getDailyForecast(input)
    const relevantDailyData = []
    for (let i = 0; i < days; i++) {
      const { app_max_temp, datetime, weather: { description } } = forecastData[i]
      relevantDailyData[i] = { temp: app_max_temp, time: datetime, weather: description }
    }
    console.log(relevantDailyData)
    return relevantDailyData
  } catch (err) {
    console.log(err)
  }
}
