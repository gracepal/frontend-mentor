const formEl = document.querySelector('form')
const calculateBtnEl = document.querySelector('.calculate')
const yearsDisplayEl = document.querySelector('.outputs .years .value')
const monthsDisplayEl = document.querySelector('.outputs .months .value')
const daysDisplayEl = document.querySelector('.outputs .days .value')

function resetStyles() {
  yearsDisplayEl.textContent = '- -'
  monthsDisplayEl.textContent = '- -'
  daysDisplayEl.textContent = '- -'

  let dayLabelEl = document.querySelector('label[for=day]')
  let monthLabelEl = document.querySelector('label[for=month]')
  let yearLabelEl = document.querySelector('label[for=year]')

  dayLabelEl.classList.remove('error')
  monthLabelEl.classList.remove('error')
  yearLabelEl.classList.remove('error')
}

function isLeapYear(year) {
  if (year % 400 == 0) return true
  else if (year % 100 == 0) return false
  else if (year % 4 == 0) return true
  else return false
}

function getDate(day = null, month = null, year = null) {
  day = day ? Number(typeof day == 'string' ? day.trim() : day) : new Date().getDate()
  month = month ? Number(typeof month == 'string' ? month.trim() : month) - 1 : new Date().getMonth()
  year = year ? Number(typeof year == 'string' ? year.trim() : year) : new Date().getFullYear()
  return new Date(year, month, day)
}

function isValidDay(day) {
  // return that input is not empty and its value is within 1-31 inclusive
  const labelEl = document.querySelector('label[for=day]')
  const mssgEl = labelEl.querySelector('p.error')
  day = day.trim()
  if (day === '') {
    labelEl.classList.add('error')
    mssgEl.textContent = 'This field is required'
    return false
  }
  if (isNaN(day)) {
    labelEl.classList.add('error')
    mssgEl.textContent = 'Must be a valid day'
    return false
  }
  day = Number(day)
  if (day < 1 || day > 31) {
    labelEl.classList.add('error')
    mssgEl.textContent = 'Must be a valid day'
    return false
  }
  labelEl.classList.remove('error')
  mssgEl.textContent = ''
  return true
}

function isValidMonth(month) {
  // return that input is not empty and its value is within 1-12 inclusive
  const labelEl = document.querySelector('label[for=month]')
  const mssgEl = labelEl.querySelector('p.error')
  month = month.trim()
  if (month === '') {
    labelEl.classList.add('error')
    mssgEl.textContent = 'This field is required'
    return false
  }
  if (isNaN(month)) {
    labelEl.classList.add('error')
    mssgEl.textContent = 'Must be a valid month'
    return false
  }
  month = Number(month)
  if (month < 1 || month > 12) {
    labelEl.classList.add('error')
    mssgEl.textContent = 'Must be a valid month'
    return false
  }
  labelEl.classList.remove('error')
  mssgEl.textContent = ''
  return true
}

function isValidYear(year) {
  // return that input is not empty and its value is previous to current year
  const labelEl = document.querySelector('label[for=year]')
  const mssgEl = labelEl.querySelector('p.error')
  year = year.trim()

  if (year === '') {
    labelEl.classList.add('error')
    mssgEl.textContent = 'This field is required'
    return false
  }
  if (isNaN(year) || year.length != 4) {
    labelEl.classList.add('error')
    mssgEl.textContent = 'Must be a valid year'
    return false
  }
  year = Number(year)
  if (year >= new Date().getFullYear()) {
    labelEl.classList.add('error')
    mssgEl.textContent = 'Must be in the past'
    return false
  }
  labelEl.classList.remove('error')
  mssgEl.textContent = ''
  return true
}

function isValidDate(day, month, year) {
  // NOTE: when forming date object, month needs to be 0-indexed, where January is 0
  // return whether input is valid
  const expectedDate = getDate(day, month, year)
  const dayMatches = day == expectedDate.getDate()
  const monthMatches = month - 1 == expectedDate.getMonth() // Date() month is 0-indexed
  const yearMatches = year == expectedDate.getFullYear()
  return dayMatches && monthMatches && yearMatches
}

function getTotalYears(inputDate, todayDate) {
  let totalYears = todayDate.getFullYear() - inputDate.getFullYear()
  let diffMonths = todayDate.getMonth() - inputDate.getMonth()
  let diffDays = todayDate.getDate() - inputDate.getDate()
  // 1 year younger if birth month hasn't past
  if (diffMonths < 0) totalYears--
  // 1 year younger if on birth month but date hasn't reached
  else if (diffMonths == 0 && diffDays < 0) totalYears--
  return totalYears
}

function getTotalMonths(inputDate, todayDate) {
  // given today=aug, input=sep
  // calc 8-0=8 + 12-9=3, 8+3=11
  const todayMonth = todayDate.getMonth() + 1 // 0-indexed
  const inputMonth = inputDate.getMonth() + 1
  const monthsThisYear = todayMonth - 0
  const monthsLastYear = 12 - inputMonth

  return (monthsThisYear + monthsLastYear) % 12
}

function getTotalDays(inputDate, todayDate) {
  const totalDaysPerMonth = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
  const currMonth = todayDate.getMonth() + 1
  const prevMonth = currMonth == 1 ? 12 : currMonth - 1

  // actually only today's date matters, as any # > 1 month is added to months
  if ([2, 3].includes(currMonth)) {
    // only if month is relevant
    if (isLeapYear(todayDate.getFullYear())) {
      // only if leap year
      totalDaysPerMonth[2]++ // add leap day
    }
  }

  // handle feb 28,29 separately
  if (todayDate.getMonth() + 1 == 2 && [28, 29].includes(todayDate.getDate())) {
    return todayDate.getDate()
  }

  if (todayDate.getDate() >= inputDate.getDate()) {
    return todayDate.getDate() - inputDate.getDate()
  } else {
    const currMonthDays = todayDate.getDate() - 0
    const prevMonthDays = totalDaysPerMonth[prevMonth] - inputDate.getDate()
    console.log('currMonthDays', currMonthDays)
    console.log('prevMonthDays', prevMonthDays)
    console.log('combined', currMonthDays + prevMonthDays)
    console.log('===', totalDaysPerMonth[prevMonth], inputDate.getDate())
    return currMonthDays + prevMonthDays
  }
}

function calculateOutputs(day, month, year, today) {
  const todayDate = today ?? getDate()
  const inputDate = getDate(day, month, year)

  let totalYears = getTotalYears(inputDate, todayDate)
  let totalMonths = getTotalMonths(inputDate, todayDate)
  let totalDays = getTotalDays(inputDate, todayDate)

  return { days: totalDays, months: totalMonths, years: totalYears }
}

function renderOutputs(days, months, years) {
  yearsDisplayEl.textContent = years
  monthsDisplayEl.textContent = months
  daysDisplayEl.textContent = days
}

// Event Listeners

formEl.addEventListener('submit', function (e) {
  e.preventDefault()

  const formData = new FormData(formEl)
  const dayInputStr = formData.get('day')
  const monthInputStr = formData.get('month')
  const yearInputStr = formData.get('year')

  const validDay = isValidDay(dayInputStr)
  const validMonth = isValidMonth(monthInputStr)
  const validYear = isValidYear(yearInputStr)
  const validDate = isValidDate(dayInputStr, monthInputStr, yearInputStr)
  const doCalculate = validDay && validMonth && validYear && validDate

  if (doCalculate) {
    const { days, months, years } = calculateOutputs(dayInputStr, monthInputStr, yearInputStr)
    renderOutputs(days, months, years)
  }
})

// Reset Styles

resetStyles()

/** For Testing
 *
 * new Date(year, monthIndex, day)
 */
console.log('**************************')

let { days, months, years } = calculateOutputs('2', '18', '2023', new Date(2024, 2 - 1, 18))
console.log(days, months, years)

console.log('**************************')
