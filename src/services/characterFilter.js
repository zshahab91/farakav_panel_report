export function filteringWord (str) {
  str = str.replace(/_/g, ' ').split(' ')
  for (var i = 0; i < str.length; i++) {
    str[i] = str[i].split('')
    str[i][0] = str[i][0].toUpperCase()
    str[i] = str[i].join('')
  }
  return str.join(' ')
}
