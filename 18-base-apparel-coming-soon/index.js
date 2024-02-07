const bodyEl = document.querySelector('body')
const formEl = document.querySelector('form')
const getInputEl = () => document.querySelector('input')
const buttonEl = document.querySelector('button')
const errorMssg = document.querySelector('.mssg-error')

function validateEmail(email) {
  // Source: https://stackoverflow.com/a/46181
  return String(email)
    .toLowerCase()
    .match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
}

// input validation
formEl.addEventListener('submit', function (e) {
  e.preventDefault()
  const inputValue = getInputEl().value.trim()
  const isNotEmpty = inputValue != ''
  const isValidEmail = validateEmail(inputValue)
  const inputEl = formEl.querySelector('input')
  if (isNotEmpty && isValidEmail) {
    inputEl.classList.remove('invalid')
    inputEl.classList.add('valid')
    formEl.classList.remove('invalid')
    formEl.classList.add('valid')
    errorMssg.style.opacity = '0'
  } else {
    inputEl.classList.remove('valid')
    inputEl.classList.add('invalid')
    formEl.classList.add('invalid')
    formEl.classList.remove('valid')
    errorMssg.classList.remove('invisible')
    errorMssg.style.opacity = '1'
  }
})

// onclick outside input element reset in/valid class
bodyEl.addEventListener('click', function (e) {
  const inputEl = getInputEl()
  const inputLoc = inputEl.getBoundingClientRect()
  if (!(e.clientX >= inputLoc.left && e.clientX <= inputLoc.right && e.clientY >= inputLoc.top && e.clientY <= inputLoc.bottom)) {
    inputEl.classList.remove('invalid')
    inputEl.classList.remove('valid')
    formEl.classList.remove('invalid')
    formEl.classList.remove('valid')
    errorMssg.style.opacity = '0'
  }
})
