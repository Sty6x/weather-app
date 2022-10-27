import './style.css'
import * as Weather from './weather-data.js'
import * as Display from './display-weather.js'

const userInput = document.querySelector('input')

userInput.addEventListener('keypress', e => {
  if (e.key == 'Enter') {
    Display.displayWeather(Weather.getWeather, userInput)
  }
})


window.onload = function() {
  Weather.userCurrentWeather(Display)
}
// if ('geolocation' in navigator) {
// } else {
//   console.log('denied geolocation')
// }

