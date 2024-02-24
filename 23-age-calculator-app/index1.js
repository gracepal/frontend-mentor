console.log('hi')
// let birthDate = new Date(1988, 7, 10)
// let today = new Date()

// let birthDate = new Date(2020, 1, 27)
// let today = new Date(2024, 2, 2) // 4y 0m 4d :leap year

// let birthDate = new Date(2020, 1, 27)
// let today = new Date(2021, 1, 27) // 1y 0m 0d :same day

// let birthDate = new Date(2020, 7, 27) // AGAIN 0-indexed, this is august, with 30 days in month
// let today = new Date(2021, 7, 26) // 0y 11m 30d :more by 1 day

// let birthDate = new Date(2020, 7, 25) // AGAIN 0-indexed, this is august, with 30 days in month
// let today = new Date(2021, 7, 26) // 1y 0m 1d :less by 1 day

// let birthDate = new Date(2021, 11, 30) // AGAIN 0-indexed, this is december
// let today = new Date(2022, 0, 30) // 0y 1m 0d :less by 1 month

// let birthDate = new Date(2023, 1, 20) //
// let today = new Date(2024, 1, 19) // 0y 1m 27d :feb

// let birthDate = new Date(2022, 1, 20) //
// let today = new Date(2023, 1, 19) // 0y 1m 27d :feb

// let birthDate = new Date(2020, 0, 31)
// let today = new Date()

let birthDate = new Date(2022, 11, 30)
let today = new Date(2024, 0, 30)

today.setHours(0, 0, 0, 0)
console.log('birthDate', birthDate.toLocaleDateString())
console.log('today', today.toLocaleDateString())

let numYears
let numMonths
let numDays
// if (birthDate.getDate() == today.getDate()) {
numDays = 0

let nextMonth = birthDate.getMonth() == 11 ? 0 : birthDate.getMonth() + 1
let nextYear = birthDate.getMonth() == 11 ? birthDate.getFullYear() + 1 : birthDate.getFullYear()
let birthDateNextMonth = new Date(nextYear, nextMonth, 1)

let prevMonth = today.getMonth() == 0 ? 11 : today.getMonth() - 1
let prevYear = today.getMonth() == 0 ? today.getFullYear() - 1 : today.getFullYear()
let previousTodayMonth = new Date(prevYear, prevMonth, 1)

console.log('birthDateNextMonth', birthDateNextMonth.toLocaleDateString())
console.log('previousTodayMonth', previousTodayMonth.toLocaleDateString())

// Calculate total years is 0 if same, else the difference
let yearDiff = previousTodayMonth.getFullYear() == birthDateNextMonth.getFullYear() ? 0 : previousTodayMonth.getFullYear() - birthDateNextMonth.getFullYear() - 1
// Calculate total months is sum of [monthsFromBirthToEndOfYear] + [totalYears] + [monthsFromStartToToday]
numMonths = 12 - birthDateNextMonth.getMonth() + yearDiff * 12 + (previousTodayMonth.getMonth() + 1)

// If same days, then increment month and set days to 0
if (birthDate.getDate() == today.getDate()) {
  numMonths += 1
  numDays = 0
  numYears = numMonths / 12
  numMonths = numMonths % 12
}
// If birth day is before today's day, then also increment month and set days to their difference
else if (birthDate.getDate() < today.getDate()) {
  console.log('numMonths', numMonths)
  numMonths += 1
  numYears = numMonths / 12
  numMonths = numMonths % 12
  numDays = today.getDate() - birthDate.getDate()
}
// If birth day is AFTER today's day, then DONT increment month and set the days to the following
// from end of month of birthday
// to beginning of month of today
else {
  numYears = numMonths / 12
  numMonths = numMonths % 12
  numDays = today.getDate()
  numDays += new Date(birthDate.getFullYear(), birthDate.getMonth() + 1, 0).getDate() - birthDate.getDate()
}

console.log('Math.floor(numYears)', Math.floor(numYears))
console.log('numMonths', numMonths)
console.log('numDays', numDays)
// } else {
//   let months = 11 - birthDate.getMonth()
// }
/**
birthDate's day > today's day -> special calculation of days
birthDate's day == today's day -> 0 days
birthDate's day < today's day -> today's day - birthDate's day
*/
