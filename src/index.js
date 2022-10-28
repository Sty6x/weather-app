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
    // need to reset or else converts it from celcius to celcius
    temperatureHead.setAttribute('class', 'isC')
    PubSub.publish('userInput', userInput)
  }
})

window.onload = function() {
  Weather.userCurrentWeather(Display)
}


PubSub.subscribe('userInput', async (mes, data) => {
  console.log(mes)
  Display.displayWeather(Weather.getCurrentWeather, data)
  Promise.all([Display.logObj(Weather.getExtHourlyForecast, data),
  Display.logObj(Weather.getExtDailyForecast, data)]).then(response => {
    console.log(response)
  })
})
