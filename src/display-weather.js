import { format } from 'date-fns'
const city = document.getElementById('city')
const temp = document.getElementById('temperature')
const desc = document.getElementById('description')
const minTemp = document.getElementById('min-temp')
const maxTemp = document.getElementById('max-temp')
const press = document.getElementById('inf-0')
const humid = document.getElementById('inf-1')
const feelsLike = document.getElementById('inf-2')
const deg = document.getElementById('low-inf-0-val')
const spd = document.getElementById('low-inf-1-val')
const dailyCont = document.getElementById('daily-list-cont')
const temps = [temp, maxTemp, minTemp]
const thunderStormCD = [200, 201, 202, 230, 231, 232, 233]
const lightDrizzleCD = [300, 301, 302]
const rainCD = [500, 501, 502, 511, 520, 522]
const snowCD = [600, 601, 602, 610]
const sleetsCD = [611, 612]
const snowShowerCD = [621, 622]
const fogsCD = [700, 711, 721, 731, 741, 751]
const clearSkyCD = 800
const fewClouds = [801, 802, 803]
const OCCD = 804

const days = 7
function createDailyCards(num) {
  const d = []
  for (let i = 0; i < num; i++) {
    let dayCont = document.createElement('li')
    d.push(dayCont)
    dailyCont.append(d[i])
    d[i].setAttribute('class', 'daily-cards')
  }
}

createDailyCards(days)
const dcNodeList = document.querySelectorAll('.daily-cards')
const dailyCards = Array.from(dcNodeList)
dailyCards.forEach(day => {
  const time = document.createElement('h4')
  const dayTemp = document.createElement('p')
  const icon = document.createElement('div')
  day.append(time, dayTemp, icon)

})
export async function displayWeather(dataObj, input) {
  try {
    const weatherData = await dataObj(input)
    city.textContent = `${weatherData.city}, ${weatherData.country}`;
    desc.textContent = weatherData.desc;
    temp.textContent = `${Math.round(weatherData.temperature)}°`;
    maxTemp.textContent = `${Math.round(weatherData.maxTemp)}°`;
    minTemp.textContent = `${Math.round(weatherData.minTemp)}°`;
    press.textContent = `Pressure: ${weatherData.pressure} hPa`
    humid.textContent = `Humidity: ${weatherData.humidity}%`
    feelsLike.textContent = `Feels Like: ${Math.round(weatherData.feelsLike)}°`
    spd.textContent = `${weatherData.windSpd}km/h`;
    deg.textContent = `${weatherData.windDeg}°`;
  } catch (error) {
    console.log(error)
    console.log('City Doesnt Exist')
  }
}
// triggers if either to celcius or to farenheit is active
// triggers on class change
export function convertTemp(target) {
  temps.forEach(temp => {
    let t;
    const nSymbol = temp.textContent.slice(0, temp.textContent.length - 1)
    if (!target.classList.contains('isC')) {
      t = nSymbol * (9 / 5) + 32
      temp.textContent = Math.round(t) + '°'
    } else {
      t = 5 / 9 * (nSymbol - 32)
      temp.textContent = Math.round(t) + '°'
    }
  });
}

export async function logObj(obj, input) {
  return await obj(input)
}


export async function displayDailyForecast(dataObj, input) {
  const dailyData = await dataObj(input)
  dailyData.shift(0)
  for (let i = 0; i < dailyData.length; i++) {
    dailyCards[i].children[2].setAttribute('id', `${dailyData[i].weatherCode}`)
    const date = format(new Date(dailyData[i].time), 'E')
    dailyCards[i].firstElementChild.textContent = `${date}`
    dailyCards[i].children[1].textContent = `${Math.round(dailyData[i].temp)}°`
  }
  dailyCardsWeatherCD()
}

async function dailyCardsWeatherCD() {
  dailyCards.forEach(day => {
    console.log(day.children[2].id)
    const iconImg = day.children[2];
    for (let i = 0; i < 35; i++) {
      if (iconImg.id == clearSkyCD) {
        iconImg.classList.remove()
        iconImg.setAttribute('class', 'is-clear-sky')
      }
      if (iconImg.id == thunderStormCD[i]) {
        iconImg.classList.remove()
        iconImg.setAttribute('class', 'is-thunder-storm')
      }
      if (iconImg.id == OCCD) {
        iconImg.classList.remove()
        iconImg.setAttribute('class', 'is-overcast-clouds')
      }
      if (iconImg.id == fewClouds[i]) {
        iconImg.classList.remove()
        iconImg.setAttribute('class', 'is-few-clouds')
      }
      if (iconImg.id == rainCD[i]) {
        iconImg.classList.remove()
        iconImg.setAttribute('class', 'is-raining')
      }
      if (iconImg.id == snowCD[i]) {
        iconImg.classList.remove()
        iconImg.setAttribute('class', 'is-snowing')
      }
      if (iconImg.id == snowShowerCD[i]) {
        iconImg.classList.remove()
        iconImg.setAttribute('class', 'is-snow-shower')
      }
      if (iconImg.id == sleetsCD[i]) {
        iconImg.classList.remove()
        iconImg.setAttribute('class', 'is-sleet')
      }
      if (iconImg.id == fogsCD[i]) {
        iconImg.classList.remove()
        iconImg.setAttribute('class', 'is-fog')
      }
      if (iconImg.id == lightDrizzleCD[i]) {
        iconImg.classList.remove()
        iconImg.setAttribute('class', 'is-light-drizzle')
      }

    }
  })
}


