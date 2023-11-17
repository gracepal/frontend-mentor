document.querySelector('.image').addEventListener('mouseenter', () => {
  console.log('over element')
  document.querySelector('.overlay').classList.remove('hidden')
  document.querySelector('.view').classList.remove('hidden')
})

document.querySelector('.image').addEventListener('mouseleave', () => {
  console.log('over element')
  document.querySelector('.overlay').classList.add('hidden')
  document.querySelector('.view').classList.add('hidden')
})
