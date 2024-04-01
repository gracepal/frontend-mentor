let data = {}
const containerEl = document.querySelector('.container')
const headerEl = document.querySelector('.header')
const designedEl = document.querySelector('.designed')
const infraEl = document.querySelector('.infra')
const featuresEl = document.querySelector('.features')
const footerEl = document.querySelector('.footer')

async function loadData() {
  console.log('FUNC: loadData()')
  await fetch('./data.json')
    .then((response) => response.json())
    .then((json) => {
      data = json[0]
      return data
    })
}

function getElement({ tagName, text = '', classes = [], id = null, name = null, alt = null, src = null, value = null }) {
  const el = document.createElement(tagName)
  el.textContent = text
  classes.forEach((className) => {
    el.classList.add(className)
  })
  if (id) el.id = id
  if (name) el.name = name
  if (alt) el.alt = alt
  if (src) el.src = src
  if (value) el.value = value
  return el
}

function setupHeader() {
  console.log('FUNC: setupHeader()')
  const navEl = getElement({ tagName: 'nav', classes: ['nav'] })
  // Logo container
  const logoContainerEl = getElement({ tagName: 'div', classes: ['logo-container'] })
  const logoImgEl = getElement({ tagName: 'img', alt: 'logo', src: './images/logo.svg' })
  logoContainerEl.appendChild(logoImgEl)
  // Links container
  const linksContainerEl = getElement({ tagName: 'div', classes: ['links-container'] })
  for (const linkData of data.links) {
    const dropdownVal = linkData[0]
    const optionVals = linkData[1]
    const selectEl = getElement({ tagName: 'select', classes: [`select${dropdownVal}`], id: `select${dropdownVal}`, name: `select${dropdownVal}` })
    for (const optionVal of optionVals) {
      const optionEl = getElement({ tagName: 'option', value: optionVal.toLowerCase(), text: optionVal })
      selectEl.appendChild(optionEl)
    }
    linksContainerEl.appendChild(selectEl)
  }
  // Buttons container
  const buttonsContainerEl = getElement({ tagName: 'div', classes: ['buttons-container'] })
  const loginBtnEl = getElement({ tagName: 'button', text: data.buttons.login, classes: ['btn-login'] })
  const signupBtnEl = getElement({ tagName: 'button', text: data.buttons.signup, classes: ['btn-signup'] })
  buttonsContainerEl.appendChild(loginBtnEl)
  buttonsContainerEl.appendChild(signupBtnEl)
  // Assemble
  navEl.appendChild(logoContainerEl)
  navEl.appendChild(linksContainerEl)
  navEl.appendChild(buttonsContainerEl)
  headerEl.appendChild(navEl)
}

function setupFooter() {
  console.log('FUNC: setupFooter()')
}

async function setupPage() {
  console.log('FUNC: setupPage()')
  await loadData()
  setupHeader()
  setupFooter()
}