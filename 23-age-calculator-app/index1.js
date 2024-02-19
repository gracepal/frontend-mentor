console.log('hi')
// let birthDate = new Date(1988, 7, 10)
// let today = new Date()
let birthDate = new Date(2020, 1, 27)
let today = new Date(2024, 2, 2) // 4y 0m 4d
today.setHours(0, 0, 0, 0)
console.log(birthDate)
console.log(today)

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

console.log(birthDateNextMonth)
console.log(previousTodayMonth)

let yearDiff = previousTodayMonth.getFullYear() == birthDateNextMonth.getFullYear() ? 0 : previousTodayMonth.getFullYear() - birthDateNextMonth.getFullYear() - 1
numMonths = 12 - birthDateNextMonth.getMonth() + yearDiff * 12 + (previousTodayMonth.getMonth() + 1)

if (birthDate.getDate() == today.getDate()) {
  numMonths += 1
  numDays = 0
  numYears = numMonths / 12
  numMonths = numMonths % 12
} else if (birthDate.getDate() < today.getDate()) {
  console.log(numMonths)
  numMonths += 1
  numYears = numMonths / 12
  numMonths = numMonths % 12
  numDays = today.getDate() - birthDate.getDate()
} else {
  numYears = numMonths / 12
  numMonths = numMonths % 12
  numDays = today.getDate()
  numDays += new Date(birthDate.getFullYear(), birthDate.getMonth() + 1, 0).getDate() - birthDate.getDate()
}

console.log(Math.floor(numYears))
console.log(numMonths)
console.log(numDays)
// } else {
//   let months = 11 - birthDate.getMonth()
// }
/**
birthDate's day > today's day -> special calculation of days
birthDate's day == today's day -> 0 days
birthDate's day < today's day -> today's day - birthDate's day
*/
