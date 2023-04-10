const today = new Date(Date.now())
const other = new Date('2004-10-09')
const diff = today - other

console.log(
  'The difference between years is: ' +
    Math.trunc(diff / 1000 / 60 / 60 / 24 / 365.25) +
    'years.'
)
