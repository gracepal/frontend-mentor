const btnDaily = document.querySelector('.profile .links a:nth-of-type(1)')
const btnWeekly = document.querySelector('.profile .links a:nth-of-type(2)')
const btnMonthly = document.querySelector('.profile .links a:nth-of-type(3)')
let dashboardData = null
let dashboardTimeframe = 'weekly'

btnDaily.addEventListener('click', function () {
  console.log('Clicked button: Daily')
})

btnWeekly.addEventListener('click', function () {
  console.log('Clicked button: Weekly')
})

btnMonthly.addEventListener('click', function () {
  console.log('Clicked button: Monthly')
})

function udpateDashboard(timeframe) {}

async function loadData() {
  await fetch('./data.json')
    .then((response) => response.json())
    .then((data) => {
      dashboardData = data
      for (const { title, timeframes } of dashboardData) {
        console.log(title, timeframes)
        const contentKey = title.replace(/\s/g, '').toLowerCase()
        const contentEl = document.querySelector(`.card.${contentKey}`)
        const currentHrsEl = contentEl.children[0].children[2]
        const previousTypeEl = contentEl.children[0].children[3].children[0]
        const previousHrsEl = contentEl.children[0].children[3].children[1]
        currentHrsEl.textContent = `${timeframes[dashboardTimeframe].current}hrs`
        previousTypeEl.textContent = ['weekly', 'monthly'].includes(dashboardTimeframe) ? dashboardTimeframe.slice(0, -2) : 'day'
        previousHrsEl.textContent = `${timeframes[dashboardTimeframe].previous}hrs`
        console.log('hhh', previousTypeEl)
      }
    })
    .catch((error) => console.log(error))
  return dashboardData
}

document.addEventListener('DOMContentLoaded', loadData)
