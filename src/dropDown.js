console.log('drop down initialize');

// first argument will be the event target provided by the user
// second argument should be the menu list or the list that the use
// wants to animate
// third argument is the trigger, it needs to be specific,
// this will need a query selector

export function dropDown(target, list, trigger) {
  const menuList = document.getElementById(list)
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
