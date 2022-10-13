console.log('drop down initialize');

// first argument will be the event target provided by the user
// second argument should be the menu list or the list that the use
// wants to animate
// third argument is the trigger, it needs to be specific,
// this will need a query selector

const activeMenu = {
  position: 'relative',
  transform: 'translate(1, 15 %)',
  transition: 'transform 200ms ease',
  animation: '300ms menu-fade-in ease'
}

const inactiveMenu = {
  transform: 'translate(0, -30%)',
  transition: 'transform 200ms ease',
  animation: '101ms menu-fade-out ease',
  opacity: '0'
}

function appendStyles(node, obj) {
  Object.assign(node.style, obj)
}

export function setInitClass(list) {
  list.classList.add('inactive-menu')
}

export function changeInactive(list) {
  if (list.classList.contains('active-menu')) {
    list.classList.remove('active-menu')
    list.setAttribute('class', 'inactive-menu')
    appendStyles(list, inactiveMenu)
  }

}
export function changeActive(list) {
  if (list.classList.contains('inactive-menu')) {
    list.classList.remove('inactive-menu')
    list.setAttribute('class', 'active-menu')
    appendStyles(list, activeMenu)
  }
}

export function dropDown(target, list, trigger) {
  console.log(list)
  if (target.matches(trigger)) {
    if (list.classList.contains('inactive-menu')) {
      changeActive(list)
    } else if (list.classList.contains('active-menu')) {
      changeInactive(list)
    }
  }

}