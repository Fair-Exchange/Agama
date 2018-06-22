export function isNumber(value) {
  return !isNaN(parseFloat(value)) && isFinite(value);
}

export function isPositiveNumber(value) {
  return isNumber(value) && (+value) > 0;
}