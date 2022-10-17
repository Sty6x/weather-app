import './style.css'


const mainItem = document.getElementById('main-item');
const rudder = document.getElementById('rudder-item-list')

mainItem.addEventListener('click', (e) => {
  if (!rudder.classList.contains('rudder-inactive')) {
    rudder.removeAttribute('class', 'rudder-active')
    rudder.classList.add('rudder-inactive')
    for (let i = 0; i < rudder.children.length; i++) {
      console.log('ha')
      if (rudder.children[i].id == 'main-item') {
        console.log(rudder.children[i])
        rudder.children[i].setAttribute('style', 'display:flex;')
      } else {
        rudder.children[i].setAttribute('style', 'display:none;')
      }
    }
  } else if (rudder.classList.contains('rudder-inactive')) {
    rudder.removeAttribute('class', 'rudder-inactive')
    rudder.classList.add('rudder-active')
    for (let i = 0; i < rudder.children.length; i++) {
      rudder.children[i].setAttribute('style', 'display:flex;')
    }
  }
})
