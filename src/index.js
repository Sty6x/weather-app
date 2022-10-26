import './style.css'

const main = document.querySelector('main')
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



form.addEventListener('submit', e => {
  e.preventDefault()
})
