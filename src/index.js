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
  const { country, lat, lon, name } = geoCodeData[0];
  return { country: country, lat: lat, lon: lon, name: name }
}


async function getWeather(geo, input) {
  const geoLocation = await geo(input)
  const weatherRespoonse = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${geoLocation.lat}&lon=${geoLocation.lon}&appid=fdc03d483993fc606c94afc7b9d4a3d6`, { mode: 'cors' })
  const weatherData = await weatherRespoonse.json()
  const { main: { temp } } = weatherData
  console.log(geoLocation)
  console.log(weatherData)
  console.log(temp)
}
getWeather(getGeoCode, 'bacolod')

form.addEventListener('submit', e => {
  e.preventDefault()
})
