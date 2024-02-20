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

/**
 * Calculate the total years, months, and days between input birthday and today
 * @param {Date} birthdate - Input birthday as Date() object
 * @param {Date} todayDate - "Today" as Date() object, this may be defaulted to today
 *  if none is explicitly passed in, else user may pass in test values
 * @returns dictionary of { days: totalDays, months: totalMonths, years: totalYears }
 *
 *      |------------------------------|
 *    birth                          today
 *
 * totalYears: difference in years, decremented if same year and birth month < today month
 * totalMonths:
 * totalDays:
 */
function calculateOutputs(userDate, todayDate) {
  const currDate = todayDate ?? getDate()

  // Find years and months
  let totalMonths = (currDate.getFullYear() - userDate.getFullYear()) * 12
  if (currDate.getMonth() > userDate.getMonth()) {
    totalMonths += currDate.getMonth() - userDate.getMonth()
  } else if (currDate.getMonth() < userDate.getMonth()) {
    let spanningMonths = 12 - 1 - userDate.getMonth() + (currDate.getMonth() + 1) // NOTE: months are 0-indexed!
    let subtractMonths = 12 - spanningMonths
    totalMonths -= subtractMonths
  }
  // Find days
  // if userDate is 3-3-2020 and currDate is 5-1-2024 month-day-year
  // then count the days from 4-3-2024 -> from the userDate's day, but in the month preceding currDate
  // from Date(year, monthZeroIndexed, 0) <= the "0" day means previous month day
  let totalDays
  if (currDate.getDate() > userDate.getDate()) {
    totalDays = currDate.getDate() - userDate.getDate()
  } else if (currDate.getDate() == userDate.getDate()) {
    totalDays = 0
  } else {
    let lastDayDate_prevMonth = new Date(currDate.getFullYear(), currDate.getMonth(), 0)
    let lastDayDay_prevMonth = lastDayDate_prevMonth.getDate()
    let daysFromUser = lastDayDay_prevMonth - userDate.getDate()
    let daysToCurr = currDate.getDate()
    totalDays = daysFromUser + daysToCurr // brought back for scenarios "test" and "leap year"

    // commented out to re-pass scenarios "test" and "leap year"
    // update for scenarios so that (< month days) should be (< curr month) as well
    // ex. birth 2/19/2023, today 2/18/2023, that's (0 years, 11 months, -1 days)
    // original calculation returns Actual: {"days":30,"months":11,"years":0}
    // which is confusing because (days 30) is (> curr month days)
    // NOTE now calculation returns {"days":28,"months":11,"years":0} BECAUSE 2024 is a leap year and has 29 days
    // let diffDays = userDate.getDate() - currDate.getDate()
    // let nextMonthToCurrMonth = currDate.getMonth() == 12 - 1 ? 0 : currDate.getMonth() + 1
    // let lastDayDate_currMonth = new Date(currDate.getFullYear(), nextMonthToCurrMonth, 0)
    // let lastDayDay_currMonth = lastDayDate_currMonth.getDate()
    // totalDays = lastDayDay_currMonth - diffDays

    totalMonths -= 1
  }
  let totalYears = Math.floor(totalMonths / 12)
  totalMonths = totalMonths % 12

  console.log('1) Test curr date', currDate.toLocaleDateString())
  console.log('2) Test birth date', userDate.toLocaleDateString())
  console.log('3) totalYears', totalYears)
  console.log('4) totalMonths', totalMonths)
  console.log('5) totalDays', totalDays)

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
runTest(getDate(19, 2, 2020), getDate(19, 2, 2024), 'Same day', { days: 0, months: 0, years: 4 })
runTest(getDate(19, 2, 2023), getDate(19, 2, 2024), '1 year less', { days: 0, months: 0, years: 1 })
runTest(getDate(18, 2, 2023), getDate(19, 2, 2024), '1 day less', { days: 1, months: 0, years: 1 })
runTest(getDate(27, 2, 2020), getDate(2, 3, 2024), 'leap year', { days: 4, months: 0, years: 4 })
runTest(getDate(30, 12, 2023), getDate(30, 1, 2024), '1 month less', { days: 0, months: 1, years: 0 })
runTest(getDate(30, 12, 2022), getDate(30, 1, 2024), '1 month more', { days: 0, months: 1, years: 1 })
runTest(getDate(31, 12, 2020), getDate(19, 2, 2024), 'test', { days: 19, months: 1, years: 3 })
runTest(getDate(20, 8, 2023), getDate(19, 8, 2024), '1 day more normal month', { days: 30, months: 11, years: 0 }) // Augusts have 31 days

// version 1 - currently passing, reading totalDays when userDate > currDate, as
//             daysFromUserDateToEndOfMonth + daysFromBegMonthToCurrDate as "totalDays"
// so in below example, the "totalDays" is "30" for both, because it is based on previous month days
// and previous month January has 31 days, so 31-1 (userDate.getDate() - currDate.getDate()) is 30
runTest(getDate(20, 2, 2023), getDate(19, 2, 2024), '1 day more, curr IS LEAP year', { days: 30, months: 11, years: 0 })
runTest(getDate(20, 2, 2024), getDate(19, 2, 2025), '1 day more, curr NOT LEAP year', { days: 30, months: 11, years: 0 })

// version 2 - currently commented out, where attempted to get diff in days and instead
//              subtract diff from the endOfCurrMonth
// runTest(getDate(20, 2, 2023), getDate(19, 2, 2024), '1 day more, curr IS LEAP year', { days: 28, months: 11, years: 0 })
// runTest(getDate(20, 2, 2024), getDate(19, 2, 2025), '1 day more, curr NOT LEAP year', { days: 27, months: 11, years: 0 })
console.log('**************************')
