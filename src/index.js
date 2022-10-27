import './style.css'
import * as Weather from './weather-data.js'
import * as Display from './display-weather.js'

const userInput = document.querySelector('input')
const main = document.querySelector('main')

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
    Display.displayWeather(Weather.getWeather, userInput)
  }
})


window.onload = function() {
  Weather.userCurrentWeather(Display)
}
