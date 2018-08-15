export function setDefaultDate () {
  let dateNow = new Date()
  let dd = dateNow.getDate()
  let mm = dateNow.getMonth() + 1
  let yyyy = dateNow.getFullYear()
  if (dd < 10) {
    dd = '0' + dd
  }
  if (mm < 10) {
    mm = '0' + mm
  }
  let today = yyyy + '-' + mm + '-' + dd
  // Start Week Ago
  let dateWeekAgo = new Date()
  let weekInMilliseconds = 7 * 24 * 60 * 60 * 1000
  dateWeekAgo.setTime(dateWeekAgo.getTime() - weekInMilliseconds)
  let ddWeek = dateWeekAgo.getDate()
  let mmWeek = dateWeekAgo.getMonth() + 1
  let yyyyWeek = dateWeekAgo.getFullYear()
  if (ddWeek < 10) {
    ddWeek = '0' + ddWeek
  }
  if (mmWeek < 10) {
    mmWeek = '0' + mmWeek
  }
  dateWeekAgo = yyyyWeek + '-' + mmWeek + '-' + ddWeek
  // 1 day Ago
  let dateOneDayAgo = new Date()
  let oneInMilliseconds = 1 * 24 * 60 * 60 * 1000
  dateOneDayAgo.setTime(dateOneDayAgo.getTime() - oneInMilliseconds)
  let ddOne = dateOneDayAgo.getDate()
  let mmOne = dateOneDayAgo.getMonth() + 1
  let yyyyOne = dateOneDayAgo.getFullYear()
  if (ddOne < 10) {
    ddOne = '0' + ddOne
  }
  if (mmOne < 10) {
    mmOne = '0' + mmOne
  }
  dateOneDayAgo = yyyyOne + '-' + mmOne + '-' + ddOne
  // Set Local Storage
  localStorage.setItem('from', dateWeekAgo)
  localStorage.setItem('to', today)
  localStorage.setItem('date', dateOneDayAgo)
  return {
    from: dateWeekAgo,
    to: today,
    date: dateOneDayAgo
  }
}
