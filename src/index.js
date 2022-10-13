import './style.css';
import * as DropDown from './dropDown'

const body = document.querySelector('body')
const nav = document.querySelector('nav')
const main = document.querySelector('main')
const btn = document.createElement('button')

btn.textContent = 'Trigger'
btn.setAttribute('id', 'trigger-finger')
nav.appendChild(btn);


const menuList = document.getElementById('drop-down-list')

DropDown.setDDClass(menuList)

body.addEventListener('click', e => {
  const target = e.target
  DropDown.dropDown(target, menuList, '#drop-down-title')
})

