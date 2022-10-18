import './style.css'


const mainItem = document.getElementById('main-item');
const rudder = document.getElementById('rudder-item-list')
const leftRud = document.getElementById('left-rud-item');
const rightRud = document.getElementById('right-rud-item');


rudder.addEventListener('click', (e) => {
  const target = e.target;
  rudderAnimation(target)
})

function rudderAnimation(target) {
  if (target.matches('li')) {
    if (!rudder.classList.contains('rudder-inactive')) {

      rudder.removeAttribute('class', 'rudder-active')
      rudder.classList.add('rudder-inactive')

      rightRud.classList.remove('right-rud-active')
      leftRud.classList.remove('left-rud-active')
      rightRud.classList.add('right-rud-inactive')
      leftRud.classList.add('left-rud-inactive')

    } else if (rudder.classList.contains('rudder-inactive')) {

      rudder.removeAttribute('class', 'rudder-inactive')
      rudder.classList.add('rudder-active')

      rightRud.classList.remove('right-rud-inactive')
      leftRud.classList.remove('left-rud-inactive')
      rightRud.classList.add('right-rud-active')
      leftRud.classList.add('left-rud-active')

    }
  }
}
