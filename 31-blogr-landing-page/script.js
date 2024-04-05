// Event Listeners
setupPage()
  .then(() => {
    setupHamburger()

    // Event listener on dropdown buttons
    document.querySelectorAll('.dropdown button').forEach((btn) => {
      btn.addEventListener('click', function (e) {
        const dropdownContent = e.target.nextElementSibling
        dropdownContent.classList.toggle('hidden')
      })
    })
  })
  .catch((err) => {
    console.log(err)
  })
