/**
 * Given 2 Date() objects, 1 representing the birthday of the user,
 *  and the other representing current date, goal is to return the
 *  total number of years, months, days between the 2 dates
 */

// const userDate = Date(2023, 2-1, 18) // 2-18-2023
// const currDate = Date(2024, 2-1, 19) // 2-19-2024 -> 1y 0m 1d

function playground(userDate, currDate) {
  console.log('')
  console.log('userDate -> ', userDate.toLocaleDateString())
  console.log('currDate -> ', currDate.toLocaleDateString())
  console.log('')
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
    let lastDayDate = new Date(currDate.getFullYear(), currDate.getMonth(), 0)
    let lastDayDay = lastDayDate.getDate()
    let daysFromUser = lastDayDay - userDate.getDate()
    let daysToCurr = currDate.getDate()
    totalDays = daysFromUser + daysToCurr
    totalMonths -= 1
  }
  let totalYears = Math.floor(totalMonths / 12)
  totalMonths = totalMonths % 12

  console.log('totalYears', totalYears)
  console.log('totalMonths', totalMonths)
  console.log('totalDays', totalDays)
}

const testInputs = [
  [new Date(2023, 2 - 1, 18), new Date(2024, 2 - 1, 19)], // 1y 0m 1d
  [new Date(2023, 2 - 1, 18), new Date(2024, 1 - 1, 19)], // 0y 11m 1d
  [new Date(2020, 3 - 1, 3), new Date(2024, 5 - 1, 3)], // 4y 2m 0d
  [new Date(2020, 3 - 1, 3), new Date(2024, 5 - 1, 1)], // 4y 1m 28d
  [new Date(2020, 2 - 1, 19), new Date(2024, 2 - 1, 19)], // 4y 0m 0d - same day
  [new Date(2023, 2 - 1, 19), new Date(2024, 2 - 1, 19)], // 1y 0m 0d - 1 year less
  [new Date(2023, 2 - 1, 18), new Date(2024, 2 - 1, 19)], // 1y 0m 1d - 1 day less
  [new Date(2023, 2 - 1, 20), new Date(2024, 2 - 1, 19)], // 0y 11m 27d - 1 day more TBD 0y 11m 30d !!
]

playground(testInputs[0][0], testInputs[0][1])
playground(testInputs[1][0], testInputs[1][1])
playground(testInputs[2][0], testInputs[2][1])
playground(testInputs[3][0], testInputs[3][1])

for (let i = 0; i < testInputs.length; i++) {
  playground(testInputs[i][0], testInputs[i][1])
}
