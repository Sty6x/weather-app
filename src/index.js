import './style.css'
import * as Weather from './weather-data.js'
import * as Display from './display-weather.js'

const userInput = document.querySelector('input')

function defaultErrorLoc(err) {
  console.warn(`ERROR(${err.code}): ${err.message}`);
}

userInput.addEventListener('keypress', e => {
  if (e.key == 'Enter') {
    Display.displayWeather(Weather.getWeather, userInput)
  }
})
window.onload = function() {
  const currentLoc = {}
  navigator.geolocation.getCurrentPosition(async function(pos) {
    const position = pos.coords // geocode name passed into getWeather
    const { latitude, longitude } = position
    console.log(latitude, longitude)
    currentLoc['lat'] = latitude;
    currentLoc['lon'] = longitude;
    Display.displayWeather(Weather.getWeather, currentLoc)
  }, defaultErrorLoc)
}

