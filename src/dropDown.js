console.log('drop down initialize');
const style = document.createElement('style');
const head = document.querySelector('head')
const styleSheetKeyFrames = '\
@keyframes menu-fade-out{ \
  0%{\
    opacity:1; \
   }\
  50%{\
    opacity:.5;\
   }\
  100%{\
    opacity:0;\
   }\
  }\
  \
  @keyframes menu-fade-in{\
  0%{\
    opacity:0;\
   }\
  25%{\
    opacity:.3;\
   }\
  50%{\
    opacity:.5;\
   }\
  75%{\
    opacity:.7;\
   }\
  100%{\
    opacity:1;\
   }\
  }\
'
head.after(head.children[head.children.length -1 ], style)
style.innerHTML = styleSheetKeyFrames;

// first argument will be the event target 
// second argument should be the menu list or the list that the user
// wants to animate
// third argument is the trigger, it needs to be specific,
// this will need a query selector

const activeMenu = {
  position: 'relative',
  transform: 'translate(0, 15%)',
  transition: 'transform 200ms ease',
  animation: '300ms menu-fade-in ease'
}

const inactiveMenu = {
  transform: 'translate(0, -30%)',
  transition: 'transform 200ms ease',
  animation: '100ms menu-fade-out ease',
  opacity: '0'
}

function appendStyles(node, obj) {
  Object.assign(node.style, obj)
}

function removeStyles(node, obj) {
  for (let key in obj) {
    node.removeAttribute('style', `${key}:${obj[key]}`)
  }
}
export function setDDClass(list) {
  list.classList.add('inactive-menu')
  appendStyles(list, inactiveMenu)
}

function changeInactive(list) {
  if (list.classList.contains('active-menu')) {
    list.classList.remove('active-menu')
    list.setAttribute('class', 'inactive-menu')
    removeStyles(list, activeMenu)
    appendStyles(list, inactiveMenu)
  }

}
function changeActive(list) {
  if (list.classList.contains('inactive-menu')) {
    list.classList.remove('inactive-menu')
    list.setAttribute('class', 'active-menu')
    removeStyles(list, inactiveMenu)
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
