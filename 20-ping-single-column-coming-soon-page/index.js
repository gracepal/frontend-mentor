const signupBtnEl = document.querySelector('.signup button')
const formEl = document.querySelector('form')
const emailLabelEl = document.querySelector('label')
const emailInputEl = document.querySelector('input')

const classHasError = 'has-error'
const classNoError = 'no-error'
const classIsEmpty = 'is-empty'
const classIsInvalid = 'is-invalid'

const debugging = false

function isValidEmail(email) {
  // Source: https://stackoverflow.com/a/46181
  return String(email)
    .toLowerCase()
    .match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
}

function addStyleForMissingInput() {
  // Add class for missing input
  if (debugging) console.log('addStyleForMissingInput()')
  emailLabelEl.classList.add(classHasError)
  emailLabelEl.classList.add(classIsEmpty)
}

function addStyleForInvalidInput() {
  // Add stule for invalid input
  if (debugging) console.log('addStyleForInvalidInput()')
  emailLabelEl.classList.add(classHasError)
  emailLabelEl.classList.add(classIsInvalid)
}

function addStyleForAcceptedInput() {
  // Add style for accepted input
  if (debugging) console.log('addStyleForAcceptedInput()')
  emailLabelEl.classList.add(classNoError)
}

formEl.addEventListener('submit', function (e) {
  // Handle form submission - validate input and add styles accordingly
  e.preventDefault()
  const formData = new FormData(formEl)
  let userEmail = ''
  for (const [_, v] of formData.entries()) {
    userEmail = v.trim()
    break
  }
  if (userEmail === '') {
    addStyleForMissingInput()
  } else if (!isValidEmail(userEmail)) {
    addStyleForInvalidInput()
  } else {
    addStyleForAcceptedInput()
  }
})

document.addEventListener('click', function (e) {
  // Clear input validity styles onclick anywhere outside submit button area
  if (!signupBtnEl.contains(e.target)) {
    emailLabelEl.classList = []
  }
})
