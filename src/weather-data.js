async function getGeoCode(input) {
  const geoCodeResponse = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${input.value}&limit=1&appid=fdc03d483993fc606c94afc7b9d4a3d6`, { mode: 'cors' })
  const geoCodeData = await geoCodeResponse.json()
  const { lat, lon } = geoCodeData[0];
  return { lat: lat, lon: lon }
}


export async function getWeather(input) {
  const isDOM = el => el instanceof Element
  try {
    if (isDOM(input)) {
      console.log('has value property')
      const geoLocation = await getGeoCode(input)
      const weatherResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${geoLocation.lat}&lon=${geoLocation.lon}&units=metric&appid=fdc03d483993fc606c94afc7b9d4a3d6`, { mode: 'cors' })
      const weatherData = await weatherResponse.json()
      const cityName = input.value.charAt(0).toUpperCase().concat('', input.value.slice(1))
      const { main: { temp, temp_max, temp_min, humidity, feels_like }, sys: { country }, weather: [{ main, description }] } = weatherData
      return {
        city: cityName,
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
      console.log('no property called value')
      const weatherResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${input.lat}&lon=${input.lon}&units=metric&appid=fdc03d483993fc606c94afc7b9d4a3d6`, { mode: 'cors' })
      const weatherData = await weatherResponse.json()
      const { main: { temp, temp_max, temp_min, humidity, feels_like }, name, sys: { country }, weather: [{ main, description }] } = weatherData
      const cityName = name.charAt(0).toUpperCase().concat('', name.slice(1))
      return {
        city: cityName,
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

