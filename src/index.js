import './style.css'

const main = document.querySelector('nav')
const rudderContainer = document.createElement('div');
const rudderItemList = document.createElement('ul')
const leftRudItem = document.createElement('div')
const rightRudItem = document.createElement('div')
const locLi = document.createElement('li')
const msgLi = document.createElement('li')
const mainItmLi = document.createElement('li')
const userLi = document.createElement('li')
const settingsLi = document.createElement('li')



export function createNav(container) {
  leftRudItem.append(locLi, msgLi)
  rightRudItem.append(userLi, settingsLi)
  rudderItemList.append(leftRudItem, mainItmLi, rightRudItem)
  rudderContainer.appendChild(rudderItemList)
  container.appendChild(rudderContainer)
  console.log(container)
  applyIDClassAttr()
}


function setIDClass(element, id, cls) {
  const attributes = {
    id,
    class: cls
  }
  for (let key in attributes) {
    element.setAttribute(key, attributes[key])
  }
}

function applyIDClassAttr() {
  setIDClass(rudderContainer, 'rudder-container', '')
  setIDClass(rudderItemList, 'rudder-item-list', 'rudder-active')
  setIDClass(leftRudItem, 'left-rud-item', 'left-rud-active')
  setIDClass(rightRudItem, 'right-rud-item', 'right-rud-active')
  setIDClass(locLi, 'loc', '')
  setIDClass(msgLi, 'msg', '')
  setIDClass(mainItmLi, 'main-item', '')
  setIDClass(userLi, 'user', '')
  setIDClass(settingsLi, 'settings', '')
}

// fix this so that we can export this function
// module will provide the properties needed since
// the this module will create a rudder navigation once the
// create nav is invoked

function rudderAnimation(target) {
  if (target.matches('li')) {
    if (!rudderItemList.classList.contains('rudder-inactive')) {

      rudderItemList.removeAttribute('class', 'rudder-active')
      rudderItemList.classList.add('rudder-inactive')

      rightRudItem.classList.remove('right-rud-active')
      leftRudItem.classList.remove('left-rud-active')
      rightRudItem.classList.add('right-rud-inactive')
      leftRudItem.classList.add('left-rud-inactive')

    } else if (rudderItemList.classList.contains('rudder-inactive')) {

      rudderItemList.removeAttribute('class', 'rudder-inactive')
      rudderItemList.classList.add('rudder-active')

      rightRudItem.classList.remove('right-rud-inactive')
      leftRudItem.classList.remove('left-rud-inactive')
      rightRudItem.classList.add('right-rud-active')
      leftRudItem.classList.add('left-rud-active')
    }
  }
}

rudderContainer.addEventListener('click', (e) => {
  const target = e.target;
  rudderAnimation(target)
})

createNav(main)
