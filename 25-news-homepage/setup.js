function setupNavbar() {
  // Setup logo
  const logoDivEl = document.querySelector('.navbar div')
  const imgEl = document.createElement('img')
  imgEl.src = data.data.images.logo
  imgEl.alt = 'logo'
  logoDivEl.appendChild(imgEl)

  // Setup navlinks
  const navbarUlEl = document.querySelector('.navbar ul')
  const navmenuUlEl = document.querySelector('.navmenu.mobile ul')
  const { navlinks } = data.data
  for (const [name, source] of Object.entries(navlinks)) {
    // Setup top menu
    const liEl = document.createElement('li')
    const aEl = document.createElement('a')
    aEl.textContent = name
    aEl.href = source
    liEl.appendChild(aEl)
    navbarUlEl.appendChild(liEl)

    // Setup mobile  menu
    const liElMobile = document.createElement('li')
    const aElMobile = document.createElement('a')
    aElMobile.textContent = name
    aElMobile.href = source
    liElMobile.appendChild(aElMobile)
    navmenuUlEl.appendChild(liElMobile)
  }
}

function setupMainSection() {
  const titleEl = document.querySelector('.title')
  const descEl = document.querySelector('.intro p')
  const btnEl = document.querySelector('.intro p + button')

  // Setup title
  const titleText = data.data.main.title
  titleEl.textContent = titleText

  // Setup intro description
  const introDescText = data.data.main.description
  descEl.textContent = introDescText

  // Setup intro description CTA button
  const ctaBtnText = data.data.main.button
  btnEl.textContent = ctaBtnText
}

function setupNewSection() {
  // Setup section title
  const newSectionTitleEl = document.querySelector('section.new h2')
  const newSectionTitle = data.data.new.title
  newSectionTitleEl.textContent = newSectionTitle

  // Setup section articles
  const newSectionUlEl = document.querySelector('section.new ul')
  const newArticles = data.data.new.articles

  for (let i = 0; i < newArticles.length; i++) {
    const articleEl = document.createElement('li')
    const articleTitleEl = document.createElement('h3')
    articleTitleEl.textContent = newArticles[i].title
    const articleLineEl = document.createElement('p')
    articleLineEl.textContent = newArticles[i].line
    articleEl.className = 'article'
    articleEl.appendChild(articleTitleEl)
    articleEl.appendChild(articleLineEl)
    newSectionUlEl.appendChild(articleEl)
    if (i < newArticles.length - 1) {
      newSectionUlEl.appendChild(document.createElement('hr'))
    }
  }
}

function setupArticlesSection() {
  const articlesSectionEl = document.querySelector('.articles')
  const articlesList = data.data.topics

  for (let i = 0; i < articlesList.length; i++) {
    const articleEl = document.createElement('div')
    const imageEl = document.createElement('img')
    const rankEl = document.createElement('span')
    const titleEl = document.createElement('h3')
    const lineEl = document.createElement('p')

    imageEl.src = articlesList[i].image
    imageEl.alt = articlesList[i].title
    rankEl.textContent = articlesList[i].id
    titleEl.textContent = articlesList[i].title
    lineEl.textContent = articlesList[i].line

    articleEl.className = 'article'
    articleEl.appendChild(imageEl)
    articleEl.appendChild(rankEl)
    articleEl.appendChild(titleEl)
    articleEl.appendChild(lineEl)
    articlesSectionEl.appendChild(articleEl)
  }
}

setupNavbar()
setupMainSection()
setupNewSection()
setupArticlesSection()
