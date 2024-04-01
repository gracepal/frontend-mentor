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
  // Section Title
  const sectionTitleEl = getElement({ tagName: 'h2', text: sectionData.title })
  infraEl.appendChild(sectionTitleEl)
  // Content
  const blockEl = getElement({ tagName: 'p', classes: ['block'], text: sectionData.items[0][1] })
  infraEl.appendChild(blockEl)
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

async function setupPage() {
  console.log('FUNC: setupPage()')
  await loadData()
  setupHeader()
  setupSectionDesigned()
  setupSectionInfra()
  setupSectionFeatures()
  setupFooter()
}
