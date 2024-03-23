// Elements
radioBtns = document.querySelectorAll('input[type="radio"]')
customBtn = document.querySelector('#tip-option-custom')
billInputContainer = document.querySelector('.bill-container .input-container')
billInput = document.querySelector('input#bill')
splitInputContainer = document.querySelector('.persons-count-container .input-container')
splitInput = document.querySelector('input#persons-count')
tipOptionsContainer = document.querySelector('.tip-options-container')
resetBtn = document.querySelector('.btn-reset')
tipAmountPerPersonDisplay = document.querySelector('.tip-amount-per-person')
totalAmountPerPersonDisplay = document.querySelector('.total-amount-per-person')

// Helper Functions

function getSelectedOption() {
  const customPct = customBtn.value
  const selectedPct = document.querySelector('[type=radio]:checked') ? document.querySelector('[type=radio]:checked').value : null
  const option = customPct || selectedPct
  return option ? parseFloat(option) : 0.0
}

function getBillAmount() {
  const billAmount = billInput.value
  return billAmount ? parseFloat(billAmount) : 0.0
}

function getNumPeople() {
  const numPeople = splitInput.value
  return numPeople ? parseFloat(numPeople) : 0
}

function noErrors() {
  return !document.querySelector('.error')
}

function getDollarAmount(num) {
  return `$${num.toFixed(2)}`
}

// Main Functions

function validateForm() {
  console.log(`INFO: validateForm()`)
  if (getBillAmount() === 0) {
    billInputContainer.classList.add('error')
  }
  if (getNumPeople() === 0) {
    splitInputContainer.classList.add('error')
  }
  if (getSelectedOption() === 0) {
    tipOptionsContainer.classList.add('error')
  }
}

function calculateResults() {
  console.log(`INFO: calculateResults()`)
  const billAmount = getBillAmount()
  const numPeople = getNumPeople()
  const tipOption = getSelectedOption()

  const billAmountPerPerson = billAmount / numPeople
  const tipAmountPerPerson = tipOption / numPeople
  const totalAmountPerPerson = billAmountPerPerson + tipAmountPerPerson

  tipAmountPerPersonDisplay.textContent = getDollarAmount(tipAmountPerPerson)
  totalAmountPerPersonDisplay.textContent = getDollarAmount(totalAmountPerPerson)
}

function resetForm() {
  console.log(`INFO: resetForm()`)
  billInputContainer.classList.remove('error')
  splitInputContainer.classList.remove('error')
  tipOptionsContainer.classList.remove('error')
  radioBtns.forEach((radio) => {
    radio.checked = false
  })
  customBtn.value = ''
  resetBtn.setAttribute('disabled', true)
}

function submitForm() {
  console.log(`INFO: submitForm()`)
  resetBtn.removeAttribute('disabled')
  validateForm()
  if (noErrors) {
    calculateResults()
  }
}

/*****************
  Event Listeners
 *****************/

// Tip option radio selection - Submit form when radio option is selected AND last input added
radioBtns.forEach((radio) =>
  radio.addEventListener('click', function (e) {
    // NOTE: since we normally go top to bottom, only submit if last field added
    if (getNumPeople() > 0) {
      submitForm()
    }
  })
)

// Tip option custom selection - Toggle other radios off when custom input is selected
customBtn.addEventListener('click', function () {
  radioBtns.forEach((radio) => {
    radio.checked = false
  })
})

// Tip option custom selection - Submit form when ENTER pressed AND last input added
customBtn.addEventListener('keydown', function (e) {
  if (e.keyCode === 13) {
    if (getNumPeople() > 0) {
      submitForm()
    }
  }
})

// Submit form when ENTER keypress from "Number of People" input
splitInput.addEventListener('keydown', function (e) {
  if (e.keyCode === 13) {
    submitForm()
  }
})

// Reset button - Reset form if eligible
document.querySelector('.btn-reset').addEventListener('click', function () {
  if (!resetBtn.hasAttribute('disabled')) {
    resetForm()
  }
})

// For debugging only - Display click x, y positions and their target elements
document.addEventListener('click', function (e) {
  //   console.log(`INFO: click on (x=${e.clientX}, y=${e.clientY}) target=`, e.target)
  // console.log(`INFO: **click on (x=${e.clientX}, y=${e.clientY})**`)
})
