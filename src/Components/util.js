export function datetimeFormat(date) {
  let ret =
    date.getFullYear() +
    '-' +
    (date.getMonth() + 1 < 9
      ? '0' + (date.getMonth() + 1)
      : date.getMonth() + 1) +
    '-' +
    (date.getDate() <= 9 ? '0' + date.getDate() : date.getDate()) +
    ' ' +
    (date.getHours() <= 9 ? '0' + date.getHours() : date.getHours()) +
    ':' +
    (date.getMinutes() <= 9 ? '0' + date.getMinutes() : date.getMinutes());
  return ret;
}

export function dateFormat(date) {
  let ret =
    date.getFullYear() +
    '-' +
    (date.getMonth() + 1 < 9
      ? '0' + (date.getMonth() + 1)
      : date.getMonth() + 1) +
    '-' +
    (date.getDate() <= 9 ? '0' + date.getDate() : date.getDate());

  return ret;
}
