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

export function changeInactive(list) {
  if (list.classlist.contains('active-menu')) {
    list.classList.remove('inactive-menu')
    list.setattribute('class', 'inactive-menu')
  }
}
export function changeActive(list) {
  if (list.classlist.contains('active-menu')) {
    list.classList.remove('active-menu')
    list.setattribute('class', 'inactive-menu')
  }
}

export function dropDown(target, list, trigger) {
  const menuList = document.getElementById(list)
  menuList.setAttribute('class', 'inactive-menu')
  if (target.matches('li')) {
    target.setAttribute('style', 'background-color:blue;')
  }
  if (target.matches(trigger)) {
    if (menuList.classList.contains('menu-inactive')) {
      menuList.classList.remove('menu-inactive')
      menuList.classList.add('menu-active')
    } else if (menuList.classList.contains('menu-active')) {
      menuList.classList.remove('menu-active')
      menuList.classList.add('menu-inactive')
    }
  }

}
