const submitBtn = document.querySelector('button.submit')
const ratings = document.querySelectorAll('[class^=rating-]')
const ratingCard = document.querySelector('.rating-state')
const thanksCard = document.querySelector('.thanks-state')
const selectedRating = document.querySelector('.rating-value')

submitBtn.addEventListener('click', (e) => {
  e.preventDefault()
  if (getSelectedRating() === -1) {
    return
  }
  submitBtn.classList.add('clicked-status')
  selectedRating.textContent = getSelectedRating()
  setTimeout(function () {
    ratingCard.classList.remove('active')
    thanksCard.classList.add('active')
  }, 1000)
})

ratings.forEach((rating) => {
  rating.addEventListener('click', (e) => {
    clearSelectedRating()
    e.target.classList.add('clicked-status')
  })
})

function clearSelectedRating() {
  ratings.forEach((rating) => {
    rating.classList.remove('clicked-status')
  })
}

function getSelectedRating() {
  const ratingElems = document.querySelectorAll('div.clicked-status')
  if (ratingElems.length === 0) {
    console.log('there are no selected ratings')
    return -1
  }
  console.log('the selected rating is', parseInt(ratingElems[0]) || -1)
  return parseInt(ratingElems[0].textContent) || -1
}
