const city = document.getElementById('city')
const temp = document.getElementById('temperature')
const desc = document.getElementById('description')
const minTemp = document.getElementById('min-temp')
const maxTemp = document.getElementById('max-temp')

export async function displayWeather(dataObj, input) {
  try {
    const weatherData = await dataObj(input)
    // console.log(weatherData.temperature)
    // convertTemp(weatherData.temperature)
    city.textContent = weatherData.city;
    temp.textContent = weatherData.temperature;
    desc.textContent = weatherData.desc;
    minTemp.textContent = weatherData.minTemp;
    maxTemp.textContent = weatherData.maxTemp;

  } catch (error) {
    console.log(error)
    console.log('City Doesnt Exist')
  }
}
// triggers if either to celcius ot ro farenheit is active
function convertTemp(temp) {
  if (convert.classList.contans('to-f')) {
    const f = (temp * 1.8) + 32;
    return f
  } else {
    const c = (temp - 32) * .5 / 9
    return c
  }
}
