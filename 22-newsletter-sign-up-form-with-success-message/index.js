const signupCard = document.querySelector('.card.signup')
const successCard = document.querySelector('.card.success')
const signupBtnEl = document.querySelector('.signup button')
const dismissBtnEl = document.querySelector('.success button')
const emailForm = document.querySelector('form.email')
const emailLabel = document.querySelector('label')
const emailInput = document.querySelector('input')

function isValidEmail(email) {
  // Source: https://stackoverflow.com/a/46181
  return String(email)
    .toLowerCase()
    .match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
}

emailForm.addEventListener('submit', function (e) {
  e.preventDefault()

  const formData = new FormData(emailForm)
  let emailVal = ''
  for (const [k, v] of formData.entries()) {
    emailVal = v.trim()
  }

  if (emailVal.length > 0 && isValidEmail(emailVal)) {
    signupCard.classList.add('hidden')
    successCard.classList.remove('hidden')
    dismissBtnEl.focus()
  } else {
    emailLabel.classList.add('invalid')
  }
})

successCard.addEventListener('click', function (e) {
  e.preventDefault()

  successCard.classList.add('hidden')
  signupCard.classList.remove('hidden')
})

document.addEventListener('click', function (e) {
  // clear invalid styles onclick outside input and button area
  const emailInputLoc = emailInput.getBoundingClientRect()
  const signupBtnLoc = signupBtnEl.getBoundingClientRect()

  if (e.clientX >= emailInputLoc.top && e.clientX <= signupBtnLoc.bottom && e.clientY >= emailInputLoc.left && e.clientY <= emailInputLoc.right) {
    return
  }
  emailLabel.classList.remove('invalid')
})
