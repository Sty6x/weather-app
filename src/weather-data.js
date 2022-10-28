async function getGeoCode(input) {
  const geoCodeResponse = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${input.value}&limit=5&appid=fdc03d483993fc606c94afc7b9d4a3d6`, { mode: 'cors' })
  const geoCodeData = await geoCodeResponse.json()
  const { name, lat, lon } = geoCodeData[0];
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
      const preLat = geoLocation.lat.toPrecision(geoLocation.lat.length)
      const preLon = geoLocation.lon.toPrecision(geoLocation.lon.length)
      const weatherResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${preLat}&lon=${preLon}&units=metric&appid=fdc03d483993fc606c94afc7b9d4a3d6`, { mode: 'cors' })
      const weatherData = await weatherResponse.json()
      const { main: { temp, temp_max, temp_min, humidity, feels_like, pressure }, name, sys: { country }, weather: [{ main, description }], wind: { deg, speed }
      } = weatherData
      return {
        city: geoLocation.name,
        country: country,
        temperature: temp,
        minTemp: temp_min,
        maxTemp: temp_max,
        humidity: humidity,
        feelsLike: feels_like,
        pressure: pressure,
        windDeg: deg,
        windSpd: speed,
        mainWeather: main,
        desc: description
      }
    } else {
      const weatherResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${input.lat}&lon=${input.lon}&units=metric&appid=fdc03d483993fc606c94afc7b9d4a3d6`, { mode: 'cors' })
      const weatherData = await weatherResponse.json()
      const { main: { temp, temp_max, temp_min, humidity, feels_like, pressure }, name, sys: { country }, weather: [{ main, description }], wind: { deg, speed }
      } = weatherData
      return {
        city: name,
        country: country,
        temperature: temp,
        minTemp: temp_min,
        maxTemp: temp_max,
        humidity: humidity,
        feelsLike: feels_like,
        pressure: pressure,
        windDeg: deg,
        windSpd: speed,
        mainWeather: main,
        desc: description
      }
    }
  } catch (e) {
    console.log(e)
    console.log('City Doesnt Exist')
  }
}


async function hourlyForecastAPI(input) {
  const isDOM = el => el instanceof Element
  try {
    if (isDOM(input)) {
      const geoCode = await getGeoCode(input)
      const forecastResponse = await fetch(`https://api.weatherbit.io/v2.0/forecast/hourly?lat=${geoCode.lat}&lon=${geoCode.lon}&key=bf5cd06a8b584d3e9cfb34307c2ca472&hours=24`)
      const forecastData = await forecastResponse.json()
      const { data } = forecastData;
      return data
    } {
      const forecastResponse = await fetch(`https://api.weatherbit.io/v2.0/forecast/hourly?lat=${input.lat}&lon=${input.lon}&key=bf5cd06a8b584d3e9cfb34307c2ca472&hours=24`)
      const forecastData = await forecastResponse.json()
      const { data } = forecastData;
      return data
    }
  } catch (error) {
    console.log(error)
  }
}


async function dailyForecastAPI(input) {
  const isDOM = el => el instanceof Element
  try {
    if (isDOM(input)) {
      const geoCode = await getGeoCode(input)
      const forecastDailyResponse = await fetch(`https://api.weatherbit.io/v2.0/forecast/daily?lat=${geoCode.lat}&lon=${geoCode.lon}&key=bf5cd06a8b584d3e9cfb34307c2ca472`)
      const forecastDailyData = await forecastDailyResponse.json()
      const { data } = forecastDailyData;
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


export async function getHourlyForecast(input) {
  try {
    const forecastData = await hourlyForecastAPI(input)
    const relevantDataHrs = []
    const hours = 12
    for (let i = 0; i < hours; i++) {
      const { app_temp, timestamp_local, weather: { description } } = forecastData[i]
      relevantDataHrs[i] = { temp: app_temp, time: timestamp_local, weather: description }
    }
    return relevantDataHrs

  } catch (error) {
    console.log(error)
  }
}

export async function getDailyForecast(input) {
  try {
    const forecastData = await dailyForecastAPI(input)
    const relevantDailyData = []
    const days = 7
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


