import './style.css'


const image = document.querySelector('img')
const main = document.querySelector('main')
const btn = document.createElement('button')
const search = document.createElement('input')
search.setAttribute('type', 'text')
btn.textContent = 'Get Image'
main.append(btn, search)


async function getImg() {
  try {
    const grabImage = await fetch(`https://api.giphy.com/v1/gifs/translate?api_key=6C6Bv7RmIvF06uPUz6RVMaQgiWxSQiKd&s=${search.value}`, { mode: 'cors' })
    const extractBody = await grabImage.json()
    image.src = extractBody.data.images.original.url
  }
  catch (e) {
    console.log(e)
    const grabErrImage = await fetch(`https://api.giphy.com/v1/gifs/translate?api_key=6C6Bv7RmIvF06uPUz6RVMaQgiWxSQiKd&s=nothing`, { mode: 'cors' })
    const extractErrBody = await grabErrImage.json()
    image.src = extractErrBody.data.images.original.url
  }
}

btn.addEventListener('click', getImg)
