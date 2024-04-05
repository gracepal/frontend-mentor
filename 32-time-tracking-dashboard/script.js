const btnDaily = document.querySelector('.profile .links a:nth-of-type(1)')
const btnWeekly = document.querySelector('.profile .links a:nth-of-type(2)')
const btnMonthly = document.querySelector('.profile .links a:nth-of-type(3)')
let dashboardData = null

btnDaily.addEventListener('click', function () {
  console.log('Clicked button: Daily')
})

btnWeekly.addEventListener('click', function () {
  console.log('Clicked button: Weekly')
})

btnMonthly.addEventListener('click', function () {
  console.log('Clicked button: Monthly')
})

async function loadData() {
  await fetch('./data.json')
    .then((response) => response.json())
    .then((data) => {
      dashboardData = data
      for (const dataObj of dashboardData) {
        console.log(dataObj)
      }
    })
    .catch((error) => console.log(error))
  return dashboardData
}

document.addEventListener('DOMContentLoaded', loadData)
