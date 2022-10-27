import './style.css'
import * as Weather from './weather-data.js'
import * as Display from './display-weather.js'

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

async function forecastHours(hours, input) {
  const forecastData = await Weather.getHoursForecast(input)
  const { temp, time } = forecastData;
  for (let i = 0; i < hours; i++) {
    console.log(time[i])
    console.log(temp[i])
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
    Display.displayWeather(Weather.getWeather, userInput)
    forecastHours(7, userInput)
  }
})


window.onload = function() {
  Weather.userCurrentWeather(Display)
}
