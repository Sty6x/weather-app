import './style.css'
import * as Weather from './weather-data.js'
import * as Display from './display-weather.js'

const userInput = document.querySelector('input')
const btn = document.getElementById('search')
const triggers = ['click', 'keypress']


userInput.addEventListener('keypress', e => {
  if (e.key == 'Enter') {
    Display.displayWeather(Weather.getWeather, userInput)
  }
})
