// Debug
let test = 'empty'
let debugMode = false

// Data
srcPlusIcon = './assets/images/icon-plus.svg'
srcMinusIcon = './assets/images/icon-minus.svg'

// Elements
content = document.querySelector('#content')
toggleIcons = null

// Functions
function logMessage(mssg, elem) {
  if (debugMode) {
    if (elem != null) {
      console.log(`LOG: ${mssg},`, elem)
    } else {
      console.log(`LOG: ${mssg}`)
    }
  }
}

async function fetchFAQData() {
  logMessage(`fetchFAQData()`)
  const response = await fetch('./faqs.json')
  const data = await response.json()
  return data.faqs
}

function createFaqElement(q, a) {
  logMessage(`createFaqElement(q, a)`)
  const article = document.createElement('article')
  article.innerHTML = `
    <div class="question" tabindex="0">
        <span>${q}</span>
        <img src="./assets/images/icon-plus.svg" alt="plus sign">
    </div>
    <div class="answer hidden"  tabindex="0">
        <span>${a}</span>
    </div>
  `
  content.appendChild(article)
}

function resetAnswers(onlyIcon) {
  logMessage(`resetAnswers(${onlyIcon})`)
  document.querySelectorAll('img[alt*="minus"]').forEach((icon) => {
    if (!icon.isSameNode(onlyIcon)) {
      icon.src = srcPlusIcon
      icon.alt = 'plus icon'
      icon.parentNode.nextElementSibling.classList.add('hidden')
    }
  })
}

function toggleAnswer(icon) {
  logMessage(`toggleAnswer(icon), ${icon}`)

  resetAnswers(icon)
  if (icon.src.includes('icon-plus')) {
    icon.src = srcMinusIcon
    icon.alt = 'minus icon'
    icon.parentNode.nextElementSibling.classList.remove('hidden')
  } else if (icon.src.includes('icon-minus')) {
    icon.src = srcPlusIcon
    icon.alt = 'plus icon'
    icon.parentNode.nextElementSibling.classList.add('hidden')
  }
}

// Load Data
fetchFAQData().then((data) => {
  data.forEach(({ q, a }) => {
    createFaqElement(q, a)
    content.appendChild(document.createElement('hr'))
  })
  toggleIcons = document.querySelectorAll('.question img')
})

// Event Listeners
// note: https://stackoverflow.com/questions/34896106/attach-event-to-dynamic-elements-in-javascript
// Triggered when question's (+) or (-) icon buttons are clicked
document.addEventListener('click', function (e) {
  const target = e.target.closest('.question img')
  if (target) {
    logMessage(`triggered event listener on CLICK ICON`)
    toggleAnswer(target)
  }
})

// Triggered when question's text content is clicked
document.addEventListener('click', function (e) {
  const target = e.target.closest('.question span')
  if (target) {
    const icon = target.nextElementSibling
    logMessage(`triggered event listener on CLICK QUESTION`)
    logMessage(`target:`, target)
    logMessage(`icon:`, icon)
    toggleAnswer(icon)
  }
})

// Triggered when key pressed while focus on question element
document.addEventListener('keydown', function (e) {
  const target = e.target.closest('.question')
  if (target) {
    logMessage(`triggered event listener on KEYPRESS while FOCUSED on question`)
    const icon = target.children[1]
    toggleAnswer(icon)
  }
})

// Triggered when key pressed while focus on answer element
document.addEventListener('keydown', function (e) {
  const target = e.target.closest('.answer')
  if (target) {
    logMessage(`triggered event listener on KEYPRESS while FOCUSED on answer`)
    const icon = target.previousElementSibling.children[1]
    toggleAnswer(icon)
  }
})
