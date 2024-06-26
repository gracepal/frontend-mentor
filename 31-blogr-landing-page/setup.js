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

function getElement({ tagName, text = '', classes = [], id = null, name = null, alt = null, src = null, value = null, forVal = null }) {
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
  if (forVal) el.for = forVal
  return el
}

function setupHeader() {
  console.log('FUNC: setupHeader()')
  // Nav Part
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
    const dropdownEl = getElement({ tagName: 'div', classes: ['dropdown'] })
    const dropdownContentEl = getElement({ tagName: 'div', classes: ['dropdown-content', 'hidden'] })
    const labelEl = getElement({ tagName: 'button', text: dropdownVal })
    const iconElement = document.createElement('i')
    iconElement.classList.add('fa-solid', 'fa-angle-down')
    labelEl.appendChild(iconElement)
    for (const optionVal of optionVals) {
      const optionEl = getElement({ tagName: 'a', href: '#', text: optionVal })
      dropdownContentEl.appendChild(optionEl)
    }
    dropdownEl.appendChild(labelEl)
    dropdownEl.appendChild(dropdownContentEl)
    linksContainerEl.appendChild(dropdownEl)
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
  // Header Part
  const headerContentEl = getElement({ tagName: 'div', classes: ['header-content'] })
  const mainTitleEl = getElement({ tagName: 'h1', text: data.title })
  headerContentEl.appendChild(mainTitleEl)
  const subtitleEl = getElement({ tagName: 'h2', text: data.subtitle })
  headerContentEl.appendChild(subtitleEl)
  const nextButtonsContainerEl = getElement({ tagName: 'div', classes: ['buttons-container'] })
  const startButtonEl = getElement({ tagName: 'button', text: data.buttons.start })
  const moreButtonEl = getElement({ tagName: 'button', text: data.buttons.more })
  nextButtonsContainerEl.appendChild(startButtonEl)
  nextButtonsContainerEl.appendChild(moreButtonEl)
  headerContentEl.appendChild(nextButtonsContainerEl)
  headerEl.appendChild(headerContentEl)
}

// function setupHamburger() {
//   const hamburgerEl = getElement({ tagName: 'div', id: 'hamburger' })
// }

function setupSectionDesigned() {
  console.log('FUNC: setupSectionDesigned()')
  const sectionData = data.sections[0]
  // Section Title
  const sectionTitleEl = getElement({ tagName: 'h2', text: sectionData.title })
  designedEl.appendChild(sectionTitleEl)
  // Content
  const contentEl = getElement({ tagName: 'div', classes: ['content'] })
  const blocksEl = getElement({ tagName: 'div', classes: ['blocks'] })
  for (const itemData of sectionData.items) {
    const blockEl = getElement({ tagName: 'div', classes: ['block'] })
    const partTitleEl = getElement({ tagName: 'h3', text: itemData[0] })
    const partContentEl = getElement({ tagName: 'p', text: itemData[1] })
    blockEl.appendChild(partTitleEl)
    blockEl.appendChild(partContentEl)
    blocksEl.appendChild(blockEl)
  }
  contentEl.appendChild(blocksEl)
  designedEl.appendChild(contentEl)
}

function setupSectionInfra() {
  console.log('FUNC: setupSectionInfra()')
  const sectionData = data.sections[1]
  const contentEl = getElement({ tagName: 'div', classes: ['content'] })
  // Section Title
  const sectionTitleEl = getElement({ tagName: 'h2', text: sectionData.title })
  contentEl.appendChild(sectionTitleEl)
  // Content
  const blockEl = getElement({ tagName: 'p', classes: ['block'], text: sectionData.items[0][1] })
  contentEl.appendChild(blockEl)
  infraEl.appendChild(contentEl)
}

function setupSectionFeatures() {
  console.log('FUNC: setupSectionFeatures()')
  const sectionItems = data.sections[2].items
  // Content
  const blocksEl = getElement({ tagName: 'div', classes: ['blocks'] })
  for (const itemData of sectionItems) {
    const blockEl = getElement({ tagName: 'div', classes: ['block'] })
    const partTitleEl = getElement({ tagName: 'h3', text: itemData[0] })
    const partContentEl = getElement({ tagName: 'p', text: itemData[1] })
    blockEl.appendChild(partTitleEl)
    blockEl.appendChild(partContentEl)
    blocksEl.appendChild(blockEl)
  }
  featuresEl.appendChild(blocksEl)
}

function setupFooter() {
  console.log('FUNC: setupFooter()')
  // Logo container
  const logoContainerEl = getElement({ tagName: 'div', classes: ['logo-container'] })
  const imgEl = getElement({ tagName: 'img', src: './images/logo.svg', alt: 'logo' })
  logoContainerEl.appendChild(imgEl)
  // Links container
  const linksContainerEl = getElement({ tagName: 'div', classes: ['links-container'] })
  for (const linkData of data.links) {
    const titleVal = linkData[0]
    const linkVals = linkData[1]
    const groupContainerEl = getElement({ tagName: 'div', classes: ['group-container', `group-${titleVal.toLowerCase()}`] })
    const titlEl = getElement({ tagName: 'div', text: titleVal })
    const ulEl = getElement({ tagName: 'ul', classes: [`group-${titleVal.toLowerCase()}`] })
    groupContainerEl.appendChild(titlEl)
    for (const linkVal of linkVals) {
      const linkEl = getElement({ tagName: 'li', value: linkVal.toLowerCase(), text: linkVal })
      ulEl.appendChild(linkEl)
    }
    groupContainerEl.appendChild(ulEl)
    linksContainerEl.appendChild(groupContainerEl)
  }
  footerEl.appendChild(logoContainerEl)
  footerEl.appendChild(linksContainerEl)
}

// Hamburger

function setupHamburger() {
  const hamburgerBtnContainer = document.querySelector('.hamburger-btn-container')
  const hamburgerBtn = document.querySelector('#btn-hamburger')
  const hamburgerMenuContainer = document.querySelector('.hamburger-menu')
  const hamburgerMenuProduct = document.querySelector('.hamburger-dropdown:nth-of-type(1)')
  const hamburgerMenuCompany = document.querySelector('.hamburger-dropdown:nth-of-type(2)')
  const hamburgerMenuConnect = document.querySelector('.hamburger-dropdown:nth-of-type(3)')

  if (this.window.innerWidth <= 880) {
    console.log('under')
    makeHamburgerOnline()
  } else {
    console.log('over')
  }

  this.window.addEventListener('resize', function () {
    if (this.window.innerWidth <= 880) {
      makeHamburgerOnline()
    } else {
    }
  })

  function makeHamburgerOnline() {
    hamburgerBtnContainer.classList.remove('offline')
  }

  hamburgerBtn.addEventListener('click', function (e) {
    const clickedBtn = e.target.closest('#btn-hamburger')
    if (clickedBtn.classList.contains('closed')) {
      clickedBtn.classList.remove('closed')
      clickedBtn.firstElementChild.src = './images/icon-close.svg'
      hamburgerMenuContainer.classList.remove('offline')
    } else {
      clickedBtn.classList.add('closed')
      clickedBtn.firstElementChild.src = './images/icon-hamburger.svg'
      hamburgerMenuContainer.classList.add('offline')
    }
  })

  hamburgerMenuProduct.addEventListener('click', function (e) {
    const clickedBtn = e.target.closest('.hamburger-dropdown')
    if (clickedBtn.classList.contains('closed')) {
      clickedBtn.classList.remove('closed')
    } else {
      clickedBtn.classList.add('closed')
    }
  })

  hamburgerMenuCompany.addEventListener('click', function (e) {
    const clickedBtn = e.target.closest('.hamburger-dropdown')
    if (clickedBtn.classList.contains('closed')) {
      clickedBtn.classList.remove('closed')
    } else {
      clickedBtn.classList.add('closed')
    }
  })

  hamburgerMenuConnect.addEventListener('click', function (e) {
    const clickedBtn = e.target.closest('.hamburger-dropdown')
    if (clickedBtn.classList.contains('closed')) {
      clickedBtn.classList.remove('closed')
    } else {
      clickedBtn.classList.add('closed')
    }
  })
}

async function setupPage() {
  console.log('FUNC: setupPage()')
  await loadData()
  setupHeader()
  setupSectionDesigned()
  setupSectionInfra()
  setupSectionFeatures()
  setupFooter()
}
