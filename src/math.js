const string1 =
  "999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999";
const string2 =
  "999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999";

Object.assign(String.prototype, { multiply, plus, minus, divide });

console.log(string1.multiply(string2));
console.log(string1.plus(string2));
console.log(string1.minus(string2));
console.log(string1.divide(string2));
console.log(String.prototype);

function multiply(arg) {
  const result = parseInt(this) * parseInt(arg);
  return result.toString();
}

function plus(arg) {
  const result = parseInt(this) + parseInt(arg);
  return result.toString();
}

function minus(arg) {
  const result = parseInt(this) - parseInt(arg);
  return result.toString();
}

function divide(arg) {
  const result = parseInt(this) / parseInt(arg);
  return result.toString();
}
