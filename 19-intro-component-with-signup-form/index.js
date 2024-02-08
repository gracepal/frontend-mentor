const formEl = document.querySelector('form')
const allInputEls = document.querySelectorAll('input')
const allLabelEls = document.querySelectorAll('label')
const firstNameInputEl = document.querySelector('input[name=firstname]')
const lastNameInputEl = document.querySelector('input[name=lastname]')
const emailInputEl = document.querySelector('input[name=email]')
const passwordInputEl = document.querySelector('input[name=password]')

function getDigits(value) {
  // Return digits before any period from the input, or 0 if none or empty
  const source = value.toString()
  let digits = source.match(/\d+(?=\.)|\d+/)
  return digits ? parseInt(digits.join('')) : 0
}

function isValidEmail(email) {
  // Source: https://stackoverflow.com/a/46181
  return String(email)
    .toLowerCase()
    .match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
}

function removeAllFieldStyling() {
  console.log('+++ removing all styling +++')
  allLabelEls.forEach((el) => {
    el.classList.remove('notify-error')
    el.classList.remove('notify-success')
    el.classList.remove('field-empty')
    el.classList.remove('field-email-invalid')
    el.setAttribute('style', `margin-bottom: 0px`)
  })
}

function applyFieldStyling(targetEl, addStyles, setMarginBottom) {
  for (const currStyle of addStyles) {
    targetEl.classList.add(currStyle)
  }
  targetEl.setAttribute('style', `margin-bottom: ${setMarginBottom}px`)
}

formEl.addEventListener('submit', function (e) {
  // ! NOTE !: updating margin-bottom here means, need to ensure not setting it elsewhere
  // since the basis of whether or not to leave along or reset is based on if its current value is 0
  e.preventDefault()
  //   console.log('event', e)
  const formData = new FormData(formEl)
  for (const [k, v] of formData.entries()) {
    // console.log(k, `"${v}"`)
    const inputVal = v.trim()
    const labelEl = document.querySelector(`label[for=${k}]`)
    const labelElLoc = labelEl.getBoundingClientRect()
    const currLabelHeightHalf = getDigits(labelElLoc.height / 2) // because error message takes up 50% height currently
    const currLabelMarginBottom = getDigits(window.getComputedStyle(labelEl).marginBottom)
    const currFormGap = getDigits(window.getComputedStyle(formEl).gap)
    const newMarginBottom = currLabelMarginBottom == 0 ? currLabelMarginBottom + currFormGap + currLabelHeightHalf : 0

    if (k == 'email' && !isValidEmail(inputVal)) {
      applyFieldStyling(labelEl, ['notify-error', 'field-email-invalid'], newMarginBottom)
    } else if (inputVal == '') {
      applyFieldStyling(labelEl, ['notify-error', 'field-empty'], newMarginBottom)
    } else {
      applyFieldStyling(labelEl, ['notify-success'], 0)
    }
  }
})

// Upon first/re-attempting to input values, clear/reset all validation styling
allInputEls.forEach((inputEl) => {
  inputEl.addEventListener('focus', function (e) {
    removeAllFieldStyling()
  })
})
