const hamburgerBtn = document.querySelector('nav .hamburger')
const hamburgerMenu = document.querySelector('.hamburger-menu')

function setImageSources() {
  let screenWidth = window.innerWidth
  console.log('Screen width:', screenWidth)
  const mainHeaderImgEl = document.querySelector('img.main')
  const transformImgEl = document.querySelector('.card.transform.image img')
  const graphicDesignImgEl = document.querySelector('.card.graphic-design.combined')
  const photographyImgEl = document.querySelector('.card.photography.combined')
  const screenTypeDir = this.window.innerWidth < 715 ? 'mobile' : 'desktop'

  mainHeaderImgEl.src = `./images/${screenTypeDir}/image-header.jpg`
  transformImgEl.src = `./images/${screenTypeDir}/image-transform.jpg`
  graphicDesignImgEl.style.backgroundImage = `url(./images/${screenTypeDir}/image-graphic-design.jpg)`
  photographyImgEl.style.backgroundImage = `url(./images/${screenTypeDir}/image-photography.jpg)`
}

window.addEventListener('resize', function () {
  setImageSources()
})

hamburgerBtn.addEventListener('click', function () {
  hamburgerMenu.classList.toggle('hidden')
})

setImageSources()
