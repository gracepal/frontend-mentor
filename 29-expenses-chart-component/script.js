let data = null
const daysOfWeek = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat']
const today = new Date(2024, 2, 20) // test wednesday 3-20-2024

async function loadData() {
  await fetch('./data.json')
    .then((response) => response.json())
    .then((data) => {
      data = data
      for (let i = 0; i < data.length; i++) {
        const dayName = data[i].day
        const dayAmount = data[i].amount
        const dayChartAmount = (dayAmount * 2).toFixed(2)
        const dayEl = document.querySelector(`.day.${dayName}`)
        dayEl.style.height = `${dayChartAmount}%`
        const dayPopoverEl = document.querySelector(`.day.${dayName} .popover`)
        dayPopoverEl.textContent = `$${dayAmount}`
      }
      // Add class to today
      const todayEl = document.querySelector(`.day.${daysOfWeek[today.getDay()]}`)
      todayEl.classList.add('today')
    })
    .catch((error) => console.log(error))
  return data
}

document.addEventListener('DOMContentLoaded', loadData)
