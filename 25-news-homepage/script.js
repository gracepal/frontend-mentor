const hamburgerEl = document.querySelector('.hamburger-btn')
const bar1 = document.querySelector('.hamburger-btn .bar:nth-of-type(1)')
const bar2 = document.querySelector('.hamburger-btn .bar:nth-of-type(2)')
const bar3 = document.querySelector('.hamburger-btn .bar:nth-of-type(3)')
const navmenuEl = document.querySelector('.navmenu.mobile')

hamburgerEl.addEventListener('click', () => {
  bar1.classList.toggle('animateBar1')
  bar2.classList.toggle('animateBar2')
  bar3.classList.toggle('animateBar3')
  navmenuEl.classList.toggle('open')
})
