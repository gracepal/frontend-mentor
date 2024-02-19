const formEl = document.querySelector('form')
const calculateBtnEl = document.querySelector('.calculate')
const yearsDisplayEl = document.querySelector('.outputs .years .value')
const monthsDisplayEl = document.querySelector('.outputs .months .value')
const daysDisplayEl = document.querySelector('.outputs .days .value')
const LOG_LEVEL = 'DEBUG' // INFO, DEBUG, NONE

function addLog(message, logLevel, addMark) {
  logLevel = logLevel ?? LOG_LEVEL
  addMark = addMark ?? false
  if (logLevel.toUpperCase() == LOG_LEVEL.toUpperCase()) {
    console.log(`${logLevel.toUpperCase()}: ${message} ${addMark ? '--- ATTN!!! ---' : ''}`)
  }
}

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

function calculateOutputs(birthdate, todayDate) {
  // select closest months start, from birthdate-next month 1st, from today-prev month 1st
  // count years by divide-ing months count by 12
  // count months by modulo-ing months after counting years
  // count days by the logic
  //   a) if days are the same, then add +1 month, return 0 days
  //   b) if today-day > birthdate-day, then return difference today - birthdate days
  //   c) if today-day < birthdate-day, then return sum of birthdate-to-end + today-to-beg
  const today = todayDate ?? getDate()
  let beforeToday
  let afterBirthdate
  // -- get the closest preceding month of today
  if (today.getMonth() == 0) {
    // 0-indexed, so "0" is checking if january
    // set next closest month to today, normalized to the 1st
    beforeToday = new Date(today.getFullYear() - 1, 11, 1)
  } else {
    beforeToday = new Date(today.getFullYear(), today.getMonth() - 1, 1)
  }
  // -- get the closest next month from birth day
  if (birthdate.getMonth() == 11) {
    // 0-indexed, so "11" is checking if december
    // set prev closest month to birthdate, also normalized
    afterBirthdate = new Date(birthdate.getFullYear() + 1, 0, 1)
  } else {
    afterBirthdate = new Date(birthdate.getFullYear(), birthdate.getMonth() + 1, 1)
  }
  addLog(`birthdate ${birthdate.toLocaleDateString()}, after ${afterBirthdate.toLocaleDateString()}`, 'debug')
  addLog(`today ${today.toLocaleDateString()}, before ${beforeToday.toLocaleDateString()}`, 'debug')
  let totalYears = afterBirthdate.getFullYear() == beforeToday.getFullYear() ? 0 : beforeToday.getFullYear() - afterBirthdate.getFullYear() - 1

  addLog(`total years ${totalYears}`, 'DEBUG', true)
  debugger

  let totalMonths = 12 - afterBirthdate.getMonth() + totalYears * 12 + (beforeToday.getMonth() + 1)
  let totalDays
  addLog(`BEFORE calc, totalYears=${totalYears} totalMonths=${totalMonths} totalDays=${totalDays || 'tbd'}`)
  if (birthdate.getDate() == today.getDate()) {
    // same day
    totalMonths += 1
    totalDays = 0
    totalYears = totalMonths / 12
    totalMonths = totalMonths % 12
  } else if (birthdate.getDate() < today.getDate()) {
    // birthday-day before today-day
    totalMonths += 1
    totalYears = totalMonths / 12
    totalMonths = totalMonths % 12
    totalDays = today.getDate() - birthdate.getDate()
  } else {
    // birthday-day after today-day
    totalYears = totalMonths / 12
    totalMonths = totalMonths % 12
    // calculate last day of birth month by taking next month and grabbing 0th day -> which is previous month day
    const lastDay = new Date(birthdate.getFullYear(), afterBirthdate.getMonth(), 0).getDate()
    totalDays = lastDay - birthdate.getDate() + today.getDate()
  }

  totalYears = Math.floor(totalYears)
  return { days: totalDays, months: totalMonths, years: totalYears }
}

function renderOutputs({ days, months, years }) {
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
    const birthdate = getDate(dayInputStr, monthInputStr, yearInputStr)
    const calculatedData = calculateOutputs(birthdate)
    renderOutputs(calculatedData)
  }
})

// Reset Styles

resetStyles()

/** For Testing
 *
 * new Date(year, monthIndex, day)
 */
let count = 1
function isMatching(actual, expected) {
  return JSON.stringify(actual) == JSON.stringify(expected)
}
function runTest(testBirthdate, testToday, scenario, expected) {
  const testOutcome = calculateOutputs(testBirthdate, testToday)
  let matching = isMatching(testOutcome, expected)
  console.log(`Scenario: ${scenario} ${matching ? '✅' : '❌'}`)
  console.log(`Birthdate: ${testBirthdate.toLocaleDateString()}`)
  console.log(`Today: ${testToday.toLocaleDateString()}`)
  console.log(`Actual: ${JSON.stringify(testOutcome)}`)
  if (!matching) {
    console.log(`Expected: ${JSON.stringify(expected)}`)
  }
  console.log(`-------------------------- ${count}`)
  count++
}
console.log('**************************')
// runTest(getDate(19, 2, 2020), getDate(19, 2, 2024), 'Same day', { days: 0, months: 0, years: 4 })
// runTest(getDate(19, 2, 2023), getDate(19, 2, 2024), '1 year less', { days: 0, months: 0, years: 1 })
// runTest(getDate(18, 2, 2023), getDate(19, 2, 2024), '1 day less', { days: 1, months: 0, years: 1 })
// runTest(getDate(20, 2, 2023), getDate(19, 2, 2024), '1 day more', { days: 27, months: 11, years: 0 })
// runTest(getDate(27, 2, 2020), getDate(2, 3, 2024), 'leap year', { days: 4, months: 0, years: 4 })
// runTest(getDate(30, 12, 2023), getDate(30, 1, 2024), '1 month less', { days: 0, months: 1, years: 0 })
runTest(getDate(30, 12, 2022), getDate(30, 1, 2024), '1 month more', { days: 0, months: 1, years: 1 })
// runTest(getDate(31, 12, 2020), getDate(19, 2, 2024), 'test', { days: 19, months: 1, years: 3 })

console.log('**************************')
