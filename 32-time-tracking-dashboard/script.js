const btnDaily = document.querySelector('.profile .links a:nth-of-type(1)')
const btnWeekly = document.querySelector('.profile .links a:nth-of-type(2)')
const btnMonthly = document.querySelector('.profile .links a:nth-of-type(3)')
let dashboardData = null
let dashboardTimeframe = 'weekly'

btnDaily.addEventListener('click', function () {
  document.querySelectorAll('.links a').forEach((alink) => {
    alink.classList.remove('active')
  })
  btnDaily.classList.add('active')
  udpateDashboard('daily')
})

btnWeekly.addEventListener('click', function () {
  document.querySelectorAll('.links a').forEach((alink) => {
    alink.classList.remove('active')
  })
  btnWeekly.classList.add('active')
  udpateDashboard('weekly')
})

btnMonthly.addEventListener('click', function () {
  document.querySelectorAll('.links a').forEach((alink) => {
    alink.classList.remove('active')
  })
  btnMonthly.classList.add('active')
  udpateDashboard('monthly')
})

function udpateDashboard(timeframe) {
  for (const { title, timeframes } of dashboardData) {
    const contentKey = title.replace(/\s/g, '').toLowerCase()
    const contentEl = document.querySelector(`.card.${contentKey}`)
    const currentHrsEl = contentEl.children[0].children[2]
    const previousTypeEl = contentEl.children[0].children[3].children[0]
    const previousHrsEl = contentEl.children[0].children[3].children[1]

    const currentHrsVal = timeframes[timeframe].current
    const previousHrsVal = timeframes[timeframe].previous
    currentHrsEl.textContent = `${currentHrsVal}${currentHrsVal == '1' ? 'hr' : 'hrs'}`
    previousTypeEl.textContent = ['weekly', 'monthly'].includes(timeframe) ? timeframe.slice(0, -2) : 'day'
    previousHrsEl.textContent = `${previousHrsVal}${previousHrsVal == '1' ? 'hr' : 'hrs'}`
  }
}

async function loadData() {
  await fetch('./data.json')
    .then((response) => response.json())
    .then((data) => {
      dashboardData = data
      for (const { title, timeframes } of dashboardData) {
        const contentKey = title.replace(/\s/g, '').toLowerCase()
        const contentEl = document.querySelector(`.card.${contentKey}`)
        const currentHrsEl = contentEl.children[0].children[2]
        const previousTypeEl = contentEl.children[0].children[3].children[0]
        const previousHrsEl = contentEl.children[0].children[3].children[1]
        currentHrsEl.textContent = `${timeframes[dashboardTimeframe].current}hrs`
        previousTypeEl.textContent = ['weekly', 'monthly'].includes(dashboardTimeframe) ? dashboardTimeframe.slice(0, -2) : 'day'
        previousHrsEl.textContent = `${timeframes[dashboardTimeframe].previous}hrs`
      }
    })
    .catch((error) => console.log(error))
  return dashboardData
}

document.addEventListener('DOMContentLoaded', loadData)
