const markAllBtn = document.querySelector('.mark-all')

markAllBtn.addEventListener('click', function () {
  console.log('Clicked button to mark all')
})

// Everything below

markAllBtn.addEventListener('click', function () {
  // no access to source file using vanilla js
  // simulates marking all, without actually changing data
  // clears background and red notifications badge
  const unreadItems = document.querySelectorAll('.item.unread')
  for (const item of unreadItems) {
    item.classList.remove('unread')
  }
  // clears new notifications count to 0
  const countEl = document.querySelector('.notifications-count .count')
  countEl.textContent = '0'
})
