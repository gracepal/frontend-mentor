const buttonEl = document.querySelector('button')
const adviceIdEl = document.querySelector('.id')
const quoteEl = document.querySelector('.quote')
const apiUrl = 'https://api.adviceslip.com/advice'

buttonEl.addEventListener('click', function (e) {
  e.preventDefault()

  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      console.log(data.slip)
      const { id: idVal, advice: adviceVal } = data.slip
      adviceIdEl.textContent = idVal
      quoteEl.textContent = adviceVal
    })
    .catch((error) => console.log(error))
})
