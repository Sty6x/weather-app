import './style.css'
import * as Weather from './weather-data.js'
import * as Display from './display-weather.js'
import PubSub from 'pubsub-js'

const userInput = document.querySelector('input')
const main = document.querySelector('main')
const temperatureHead = document.getElementById('temperature')

function changeTempClass(target) {
  if (target.classList.contains('isC')) {
    target.removeAttribute('class', 'isC')
    target.setAttribute('class', 'isF')
  } else {
    target.removeAttribute('class', 'isF')
    target.setAttribute('class', 'isC')
  }
}


main.addEventListener('click', e => {
  const target = e.target;
  if (target.matches('#temperature')) {
    changeTempClass(target)
    Display.convertTemp(target)
  }
})

userInput.addEventListener('keypress', e => {
  if (e.key == 'Enter') {
    temperatureHead.setAttribute('class', 'isC')
    PubSub.publish('userInput', userInput)
  }
})


function defaultErrorLoc(err) {
  console.warn(`ERROR(${err.code}): ${err.message}`);
  Display.displayWeather(Weather.getCurrentWeather, { lat: 40.730610, lon: -73.935242 })
}

function userCurrentWeather() {
  return navigator.geolocation.getCurrentPosition(function(pos) {
    const position = pos.coords
    const { latitude, longitude } = position
    console.log(latitude, longitude)
    Display.displayWeather(Weather.getCurrentWeather, { lat: latitude, lon: longitude })
  }, err => {
    defaultErrorLoc(err)
  })
}


window.onload = function() {
  userCurrentWeather(Display)
}


PubSub.subscribe('userInput', async (mes, data) => {
  console.log(mes)
  Display.displayWeather(Weather.getCurrentWeather, data)
  Promise.all([Display.logObj(Weather.getHourlyForecast, data),
  Display.displayDailyForecast(Weather.getDailyForecast, data)]).then(response => {
    console.log(response)
  })
})
