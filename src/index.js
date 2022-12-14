import './style.css'
import * as Weather from './weather-data.js'
import * as Display from './display-weather.js'
import * as HourlyChart from './hourly-chart-display.js'
import PubSub from 'pubsub-js'

const userInput = document.querySelector('input')
const main = document.querySelector('main')
const temperatureHead = document.getElementById('temperature')
const loadingIcon = document.getElementById('load-icon')

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


function defaultNoAccessUserLoc(err) {
  console.warn(`ERROR(${err.code}): ${err.message}`);
  Display.displayWeather(Weather.getCurrentWeather, { lat: 40.730610, lon: -73.935242 })
  Display.displayDailyForecast(Weather.getDailyForecast, { lat: 40.730610, lon: -73.935242 })
  HourlyChart.displayHourlyForecast(Weather.getHourlyForecast, { lat: 40.730610, lon: -73.935242 })
}

function userCurrentWeather() {
  return navigator.geolocation.getCurrentPosition(function(pos) {
    const position = pos.coords
    const { latitude, longitude } = position
    Display.displayWeather(Weather.getCurrentWeather, { lat: latitude, lon: longitude })
    Display.displayDailyForecast(Weather.getDailyForecast, { lat: latitude, lon: longitude })
    HourlyChart.displayHourlyForecast(Weather.getHourlyForecast, { lat: latitude, lon: longitude })
  }, err => {
    defaultNoAccessUserLoc(err)
  })
}


window.onload = function() {
  userCurrentWeather(Display)
}

function sendDataAccross(e) {
  return new Promise((resolve) => {
    if (e.key == 'Enter') {
      resolve(userInput)
    }
  })
}


userInput.addEventListener('keypress', e => {
  sendDataAccross(e).then((response) => {
    temperatureHead.setAttribute('class', 'isC')
    PubSub.publish('userInput', userInput)
    userInput.checkValidity()
    userInput.setCustomValidity('')
    return response
  }).catch(er => console.log(er))
})

PubSub.subscribe('userInput', async (mess, data) => {
  console.log('Loading...')
  loadingIcon.classList.remove()
  loadingIcon.setAttribute('class', 'is-loading')
  Promise.all([
    Weather.getDailyForecast(data),
    Display.displayWeather(Weather.getCurrentWeather, data),
    Display.displayDailyForecast(Weather.getDailyForecast, data),
    HourlyChart.displayHourlyForecast(Weather.getHourlyForecast, data)
  ]).then(() => {
    console.log('Loading Complete')
    loadingIcon.classList.remove()
    loadingIcon.setAttribute('class', 'is-complete')
  }).catch(e => {
    console.log(e)
    loadingIcon.classList.remove()
    loadingIcon.setAttribute('class', 'is-complete')
    if (userInput == '') {
      userInput.setCustomValidity('Please Type In a City')
    } else {
      userInput.setCustomValidity('City Does Not Exist')
    }
    userInput.reportValidity()
  })
})


