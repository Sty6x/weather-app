import './style.css';
import * as DropDown from './dropDown'

const body = document.querySelector('body')
const nav = document.querySelector('nav')
const main = document.querySelector('main')
const btn = document.createElement('button')

btn.textContent = 'Trigger'
btn.setAttribute('id', 'trigger-finger')
nav.appendChild(btn);

body.addEventListener('click', e => {
  const target = e.target
  DropDown.dropDown(target, 'drop-down-list', '#drop-down-title')
})

