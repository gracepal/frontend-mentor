function setupNavbar() {
  // Setup logo
  const logoDivEl = document.querySelector('.navbar div')
  const imgEl = document.createElement('img')
  imgEl.src = './assets/images/logo.svg'
  imgEl.alt = 'logo'
  logoDivEl.appendChild(imgEl)

  // Setup navlinks
  const navbarUlEl = document.querySelector('.navbar ul')
  const { navlinks } = data.data
  for (const [name, source] of Object.entries(navlinks)) {
    const liEl = document.createElement('li')
    const aEl = document.createElement('a')
    aEl.textContent = name
    aEl.href = source
    liEl.appendChild(aEl)
    navbarUlEl.appendChild(liEl)
  }
}

setupNavbar()
