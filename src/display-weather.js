
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
  const time = document.createElement('h3')
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
  for (let i = 0; i < dailyData.length; i++) {
    dailyCards[i].firstElementChild.textContent = `${dailyData[i].time}`
    dailyCards[i].children[1].textContent = `${dailyData[i].temp}`
    dailyCards[i].children[2].setAttribute('class', 'is-raining')
    dailyCards[i].children[2].textContent = `${dailyData[i].weather}`

  }

}
