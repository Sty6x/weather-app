// import * as Weather from './weather-data'
// import PubSub from 'pubsub-js'
import { formatISO9075 } from 'date-fns'
import Chart from 'chart.js/auto';
const currHourlyChart = document.getElementById('current-hourly-chart')

// PubSub.subscribe('userInput', (mes, input) => {
//   console.log('hourly forecast sent', mes)
//   displayHourlyForecast(Weather.getHourlyForecast, input)
// })


async function extTempTime(obj, type) {
  console.log(obj)
  const arb = []
  if (type == 'temp') {
    for (let i = 0; i < obj.length; i++) {
      arb.push(obj[i].temp);
    }
    return arb
  } else if (type == 'time') {
    for (let i = 0; i < obj.length; i++) {
      let formattedTime = formatISO9075(new Date(obj[i].time), { representation: 'time' })
      console.log(formattedTime)
      let newTime = formattedTime.slice(0, 5)
      arb.push(newTime);
    }
    return arb
  }
}


export async function displayHourlyForecast(obj, input) {
  const hourlyObj = await obj(input)
  const hourlyTemp = await extTempTime(hourlyObj, 'temp')
  const hourlyTime = await extTempTime(hourlyObj, 'time')

  Promise.all([hourlyObj, hourlyTime]).then(() => {
    const canvas = document.getElementById('myChart')
    // const ctx = canvas.getContext('2d')
    if (canvas) {
      canvas.remove()
    }
    const xcanvas = document.createElement('canvas')
    console.log(xcanvas)
    xcanvas.setAttribute('id', 'myChart')
    currHourlyChart.appendChild(xcanvas)
    const ctx2 = xcanvas.getContext('2d')

    const myChart = new Chart(ctx2, {
      type: 'line',
      data: {
        labels: hourlyTime,
        datasets: [{
          label: 'Temp in Celcius',
          data: hourlyTemp,
          // borderRadius: 10,
          borderWidth: 1,
          // barThickness: 10,
          fill: true,
          backgroundColor: 'rgba(255,255,245, .2)',

          pointRadius: 10,
          pointBackgroundColor: [

            'rgba(255, 99, 132, .4)',
            'rgba(54, 162, 235, .4)',
            'rgba(255, 206, 86, .4)',
            'rgba(75, 192, 192, .4)',
            'rgba(153, 102, 255, .4)',
            'rgba(255, 159, 64, .4)'
          ],

          // backgroundColor: [
          //   'rgba(255, 99, 132, )',
          //   'rgba(54, 162, 235, )',
          //   'rgba(255, 206, 86, )',
          //   'rgba(75, 192, 192, )',
          //   'rgba(153, 102, 255,)',
          //   'rgba(255, 159, 64, )'
          // ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
        }]
      },
      options: {

        plugins: {
          legend: {
            labels: {
              color: 'white',
              font: {
              }
            }
          }
        },
        layout: {
          padding: {
            right: 50,
            left: 30
          }
        },
        scales: {
          y: {
            ticks: {
              color: 'white',
            },
            beginAtZero: true
          },
          x: {

            ticks: {
              color: 'white',
            },
          }
        }
      }
    });
    Chart.defaults.font.size = 16;
  }).catch(err => {
    console.log(err)
  })

}

