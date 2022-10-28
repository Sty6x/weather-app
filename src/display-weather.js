
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
  dailyData.forEach(day => {
    const dayCont = document.createElement('li')
    const date = document.createElement('h3')
    const temp = document.createElement('p')
    const icon = document.createElement('div')
    date.textContent = `${day.time}`
    temp.textContent = `${day.temp}°`
    // if(day.weather == '  ')
    icon.setAttribute('class', 'is-raining')
    dayCont.append(date, temp, icon)
    dailyCont.appendChild(dayCont)

  });

}
