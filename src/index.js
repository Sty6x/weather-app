import './style.css'

const form = document.querySelector('form')
const userInput = document.querySelector('input')
const cityData = {}
const btn = document.querySelector('button')

btn.addEventListener('click', () => {
  setInterval(() => {
    fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${userInput.value}&limit=1&appid=fdc03d483993fc606c94afc7b9d4a3d6`, { mode: 'cors' })
      .then(response => {
        return response.json()
      }).then(jsonResponse => {
        delete jsonResponse[0]['local_names']
        delete jsonResponse[0]['state']
        return jsonResponse[0]
      }).then(weatherData => {
        for (let data in weatherData) {
          cityData[data] = weatherData[data]
        }
        return cityData
      }).then(cityLocation => {
        console.log(cityLocation)
        return fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${cityLocation.lat}&lon=${cityLocation.lon}&appid=fdc03d483993fc606c94afc7b9d4a3d6`, { mode: 'cors' })
      }).then(weatherDataRes => {
        return weatherDataRes.json()
      }).then(weatherData => {
        console.log(weatherData.main.temp)
      })
  }, 2000)
})


async function getGeoCode(input) {
  const geoCodeResponse = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${input}&limit=1&appid=fdc03d483993fc606c94afc7b9d4a3d6`, { mode: 'cors' })
  const geoCodeData = await geoCodeResponse.json()
  const { lat, lon } = geoCodeData[0];
  return { lat: lat, lon: lon }
}


async function getWeather(geo, input) {
  const geoLocation = await geo(input)
  const weatherRespoonse = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${geoLocation.lat}&lon=${geoLocation.lon}&appid=fdc03d483993fc606c94afc7b9d4a3d6`, { mode: 'cors' })
  const weatherData = await weatherRespoonse.json()
  const { main: { temp, temp_max, temp_min, humidity, feels_like }, name, sys: { country }, weather: [{ main, description }] } = weatherData
  return {
    city: input,
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
const weather = getWeather(getGeoCode, 'dubai').then(response => {
  console.log(response)
})
form.addEventListener('submit', e => {
  e.preventDefault()
})
