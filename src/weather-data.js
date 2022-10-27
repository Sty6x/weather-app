
async function getGeoCode(input) {
  const geoCodeResponse = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${input.value}&limit=1&appid=fdc03d483993fc606c94afc7b9d4a3d6`, { mode: 'cors' })
  const geoCodeData = await geoCodeResponse.json()
  const { lat, lon } = geoCodeData[0];
  return { lat: lat, lon: lon }
}


export async function getWeather(input) {
  try {
    const geoLocation = await getGeoCode(input)
    const weatherRespoonse = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${geoLocation.lat}&lon=${geoLocation.lon}&appid=fdc03d483993fc606c94afc7b9d4a3d6`, { mode: 'cors' })
    const weatherData = await weatherRespoonse.json()
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
  } catch (e) {
    console.log('City Doesnt Exist')
  }
}

