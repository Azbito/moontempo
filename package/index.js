function getYearsPassed(dateCompared) {
  const today = new Date(Date.now())
  const other = new Date(dateCompared)
  const diff = today - other
  const currentYear = other.getFullYear()

  if (isNaN(other)) {
    throw new Error('Invalid date')
  }

  if (isLeapYear(currentYear)) {
    const years = Math.floor(diff / 1000 / 60 / 60 / 24 / 366)
    return years
  }

  const years = Math.floor(diff / 1000 / 60 / 60 / 24 / 365.2425)
  return years
}

function getMonthsPassed(dateCompared) {
  const today = new Date(Date.now())
  const other = new Date(dateCompared)
  const diff = today - other
  const currentYear = other.getFullYear()

  if (isNaN(other)) {
    throw new Error('Invalid date')
  }

  const leapYear =
    currentYear % 4 === 0 &&
    (currentYear % 100 !== 0 || currentYear % 400 === 0)
  const februaryDays = leapYear ? 29 : 28
  const monthsDays = [31, februaryDays, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

  let totalDays = Math.floor(diff / (1000 * 60 * 60 * 24))
  let months = 0

  for (let i = 0; i < monthsDays.length; i++) {
    if (totalDays >= monthsDays[i]) {
      totalDays -= monthsDays[i]
      months++
    } else {
      break
    }
  }

  const yearDiff = diff / (1000 * 60 * 60 * 24 * 365.25)
  const month = Math.trunc((yearDiff % 1) * 12)

  return { months: month === 12 ? 0 : month }
}

function getDaysPassed(dateCompared) {
  const today = new Date(Date.now())
  const other = new Date(dateCompared)
  const diff = Math.floor((today - other) / (1000 * 60 * 60 * 24))
  const currentYear = other.getFullYear()

  if (isNaN(other)) {
    throw new Error('Invalid date')
  }

  let februaryDays = 28

  const monthsDays = {
    january: 31,
    february: februaryDays,
    march: 31,
    april: 30,
    may: 31,
    june: 30,
    july: 31,
    august: 31,
    september: 30,
    october: 31,
    november: 30,
    december: 31
  }

  if (isLeapYear(currentYear)) {
    februaryDays = 29

    if (other.getMonth() === 1 && other.getDate() > 29) {
      throw new Error('Invalid date')
    }

    const yearDiff = diff / (1000 * 60 * 60 * 24 * 366)
    const month = Math.trunc((yearDiff % 1) * 12)
    const days = Math.trunc((diff / (1000 * 60 * 60 * 24)) % monthsDays[month])
    return days
  } else {
    februaryDays = 28
  }

  other.setDate(monthsDays[Object.keys(monthsDays)[other.getMonth()]])

  const days = diff % monthsDays[Object.keys(monthsDays)[other.getMonth()]]

  return days
}

function isLeapYear(year) {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0
}

module.exports = { getYearsPassed, getMonthsPassed, getDaysPassed, isLeapYear }
