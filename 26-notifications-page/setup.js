// Helper funtion to setup individual activity
function generateRow({ id, user, avatar, activity, taggedImage, target, past, message, unread }) {
  const feedEl = document.createElement('div')
  feedEl.className = 'item'
  if (unread) feedEl.className += ' unread'
  const leftEl = document.createElement('div')
  leftEl.className = 'left'
  const rightEl = document.createElement('div')
  rightEl.className = 'right'

  // Setup left side - avatar
  const avatarEl = document.createElement('img')
  avatarEl.src = avatar
  leftEl.appendChild(avatarEl)

  // Setup right side - 1st row: user, reaction, target
  const row1El = document.createElement('div')
  row1El.className = 'row row1'
  const nameEl = document.createElement('span')
  nameEl.className = 'name'
  nameEl.textContent = user
  const activityEl = document.createElement('span')
  activityEl.className = 'reaction'
  activityEl.textContent = activity
  const targetEl = document.createElement('span')
  targetEl.className = 'target'
  if (target) {
    targetEl.textContent = target
    activityEl.appendChild(targetEl)
  }
  row1El.appendChild(nameEl)
  row1El.appendChild(activityEl)

  // Setup right side - 2nd row: past
  const row2El = document.createElement('div')
  row2El.className = 'row row2'
  const pastEl = document.createElement('span')
  pastEl.className = 'past'
  pastEl.textContent = past
  row2El.appendChild(pastEl)

  // Setup right side - 3rd row: message if any
  let row3El = document.createElement('div')
  if (message) {
    row3El.className = 'row row3'
    const messageEl = document.createElement('p')
    messageEl.className = 'message'
    messageEl.textContent = message
    row3El.appendChild(messageEl)
  }

  // Assemble high level
  feedEl.appendChild(leftEl)
  rightEl.appendChild(row1El)
  rightEl.appendChild(row2El)
  if (row1El) rightEl.appendChild(row3El)
  feedEl.appendChild(rightEl)

  // Setup tagged image if any
  if (taggedImage) {
    const taggedImageEl = document.createElement('img')
    taggedImageEl.className = 'tagged-image'
    taggedImageEl.src = taggedImage
    feedEl.appendChild(taggedImageEl)
  }

  return feedEl
}

// Setup activities
function setupFeed() {
  const feedsEl = document.querySelector('.feed .activities')

  const activities = data.notifications

  // Setup new notifications
  for (const activity of activities.unread) {
    activity.unread = true
    const activityRow = generateRow(activity)
    feedsEl.appendChild(activityRow)
  }

  // Setup read notifications
  for (const activity of activities.read) {
    activity.unread = false
    const activityRow = generateRow(activity)
    feedsEl.appendChild(activityRow)
  }
}

// Setup notifications count
function setupNotificationsCount() {
  const countSpan = document.querySelector('.notifications-count span')
  const countVal = data.notifications.unread.length
  countSpan.textContent = countVal
}

setupNotificationsCount()
setupFeed()
