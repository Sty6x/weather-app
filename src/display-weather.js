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
    spd.textContent = weatherData.windSpd
    // spdName.textContent = `Speed:`
    deg.textContent = `${weatherData.windDeg}°`;
    // degName.textContent = `Degrees:`

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
