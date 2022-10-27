const city = document.getElementById('city')
const temp = document.getElementById('temperature')
const desc = document.getElementById('description')
const minTemp = document.getElementById('min-temp')
const maxTemp = document.getElementById('max-temp')

export async function displayWeather(dataObj, input) {
  try {
    const weatherData = await dataObj(input)
    city.textContent = weatherData.city;
    temp.textContent = `${weatherData.temperature}°`;
    desc.textContent = weatherData.desc;
    maxTemp.textContent = `${weatherData.maxTemp}°`;
    minTemp.textContent = `${weatherData.minTemp}°`;

  } catch (error) {
    console.log(error)
    console.log('City Doesnt Exist')
  }
}
// triggers if either to celcius or to farenheit is active
function convertTemp(temp) {
  if (convert.classList.contans('isF')) {
    const f = (temp * 1.8) + 32;
    return f
  } else {
    const c = (temp - 32) * .5 / 9
    return c
  }
}
