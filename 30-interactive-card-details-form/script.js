// Locators
const formEl = document.querySelector('form')
const nameInput = document.querySelector('input#name')
const cardNumInput = document.querySelector('input#card-number')
const expMonthInput = document.querySelector('input#exp-date-mm')
const expYearInput = document.querySelector('input#exp-date-yy')
const cvcInput = document.querySelector('input#cvc')
const confirmBtn = document.querySelector('button.btn-confirm')
const cardNumDisplay = document.querySelector('.content .card-front .card-number')
const cardNameDisplay = document.querySelector('.content .card-front .name')
const cardExpDateDisplay = document.querySelector('.content .card-front .exp-date')
const cardCvcDisplay = document.querySelector('.content .card-back .cvc')
const confirmEl = document.querySelector('.confirmation')
const continueBtn = document.querySelector('.btn-continue')

// Error messages
const mssgErrorBlank = "Can't be blank"
const mssgErrorFormat = 'Wrong format, numbers only'
const mssgErrorShort = 'Wrong format, too short'

// Default values
const defaultCardNum = '0000 0000 0000 0000'
const defaultName = 'Jane Appleseed'
const defaultExpiry = '09/00'
const defaultCvc = '000'

function containsNonNumericChars(str) {
  return /\D/.test(str)
}

function validateName(formValues) {
  value = formValues['name']
  if (value === '') {
    nameInput.classList.add('error')
    nameInput.nextElementSibling.textContent = mssgErrorBlank
  }
}

function validateCardNumber(formValues) {
  value = formValues['card-number']
  if (value === '') {
    cardNumInput.classList.add('error')
    cardNumInput.nextElementSibling.textContent = mssgErrorBlank
    return
  }
  if (containsNonNumericChars(value)) {
    cardNumInput.classList.add('error')
    cardNumInput.nextElementSibling.textContent = mssgErrorFormat
    return
  }
  if (value.length < 16) {
    cardNumInput.classList.add('error')
    cardNumInput.nextElementSibling.textContent = mssgErrorShort
  }
}

function validateCardExpirationMonth(value) {
  if (value === '') {
    expMonthInput.classList.add('error')
    expMonthInput.parentElement.nextElementSibling.textContent = mssgErrorBlank
    return
  }
  if (containsNonNumericChars(value)) {
    expMonthInput.classList.add('error')
    expMonthInput.parentElement.nextElementSibling.textContent = mssgErrorFormat
  }
}

function validateCardExpirationYear(value) {
  if (value === '') {
    expYearInput.classList.add('error')
    expYearInput.parentElement.nextElementSibling.textContent = mssgErrorBlank
    return
  }
  if (containsNonNumericChars(value)) {
    expYearInput.classList.add('error')
    expYearInput.parentElement.nextElementSibling.textContent = 'Wrong format'
  }
}

function validateCardExpiration(formValues) {
  value = formValues['exp-date']
  validateCardExpirationMonth(formValues['exp-date-mm'])
  validateCardExpirationYear(formValues['exp-date-yy'])
}

function validateCardCvc(formValues) {
  value = formValues['cvc']
  if (value === '') {
    cvcInput.classList.add('error')
    cvcInput.nextElementSibling.textContent = mssgErrorBlank
    return
  }
  if (containsNonNumericChars(value) || value.length < 3) {
    cvcInput.classList.add('error')
    cvcInput.nextElementSibling.textContent = 'Wrong format'
  }
}

function validateForm(formValues) {
  validateName(formValues)
  validateCardNumber(formValues)
  validateCardExpiration(formValues)
  validateCardCvc(formValues)
}

function clearErrors() {
  document.querySelectorAll('.error').forEach((el) => {
    el.classList.remove('error')
  })
}

formEl.addEventListener('submit', function (e) {
  e.preventDefault()
  // Clear errors before each submission
  clearErrors()
  console.log('form submitted')

  const formData = new FormData(e.target)
  const formValues = {}
  formData.forEach((value, key) => {
    formValues[key] = value.trim()
  })
  var mm = formValues['exp-date-mm'].padStart(2, '0')
  var yy = formValues['exp-date-yy'].padStart(2, '0')
  formValues['exp-date'] = `${mm}/${yy}`
  formValues['card-number'] = cardNumInput.value.replace(/\s/g, '')
  validateForm(formValues)

  // If no errors, then display on the card front and back
  if (document.querySelectorAll('.error').length === 0) {
    console.log('---- GOOD ')
    updateDisplay(formValues)
    displayConfirmation()
  }
  console.log(formValues)
})

/**
 * NOTE: Card 4 number input feature!
 * inspired from https://codepen.io/elmagicabdulah/pen/RpoRgw
 */
cardNumInput.onkeydown = function (e) {
  const isBackspace = e.keyCode === 8
  //   console.log(`"${cardNumInput.value}"`, cardNumInput.value.length, e.keyCode)
  if (!isBackspace && cardNumInput.value.length > 0 && cardNumInput.value.length < 19) {
    if (cardNumInput.value.replace(/\s/g, '').length % 4 == 0) {
      cardNumInput.value += ' '
    }
  }
}

function getCardNumberFormatted(num) {
  return num.slice(0, 4) + ' ' + num.slice(4, 8) + ' ' + num.slice(8, 12) + ' ' + num.slice(12, 16)
}

function updateDisplay(formValues) {
  cardNumDisplay.textContent = getCardNumberFormatted(formValues['card-number'])
  cardNameDisplay.textContent = formValues['name']
  cardExpDateDisplay.textContent = formValues['exp-date']
  cardCvcDisplay.textContent = formValues['cvc']
}

function displayConfirmation() {
  formEl.classList.toggle('hidden')
  confirmEl.classList.toggle('hidden')
}

function resetForm() {
  // reset display
  cardNameDisplay.textContent = defaultName
  cardNumDisplay.textContent = defaultCardNum
  cardExpDateDisplay.textContent = defaultExpiry
  cardCvcDisplay.textContent = defaultCvc
  // reset form
  clearErrors()
  nameInput.value = ''
  cardNumInput.value = ''
  expMonthInput.value = ''
  expYearInput.value = ''
  cvcInput.value = ''
  // handle displays
  confirmEl.classList.add('hidden')
  formEl.classList.remove('hidden')
}

continueBtn.addEventListener('click', function () {
  console.log('-- clicked Continue')
  confirmEl.classList.add('hidden')
  formEl.classList.remove('hidden')
})

resetForm()
