const string1 = "118";
const string2 = "8";

Object.assign(String.prototype, { multiply, minus, divide, plus });

console.log(string1.multiply(string2));
console.log(string1.minus(string2));
console.log(string1.divide(string2));
console.log(string1.plus(string2));

function multiply(arg) {
  const result = Number.parseInt(this) * Number.parseInt(arg);
  return result.toString();
}

function plus(arg) {
  let res = "";
  let carry = 0;

  let firstStringArray = this.split("").reverse();
  let secondStringArray = arg.split("").reverse();

  let arrRest = firstStringArray.length - secondStringArray.length;

  if (arrRest < 0) {
    arrRest = arrRest * -1;
    firstStringArray = firstStringArray.concat(new Array(arrRest).fill(0));
  } else {
    secondStringArray = secondStringArray.concat(new Array(arrRest).fill(0));
  }

  for (let i = 0; i < firstStringArray.length; i++) {
    let digitA = parseInt(firstStringArray[i]);
    let digitB = parseInt(secondStringArray[i]);

    let sum = digitA + digitB + carry;
    res = (sum % 10) + res;
    carry = Math.floor(sum / 10);
  }

  if (carry) res = carry + res;
  return res.replace(/^0+/, "") || "0";
}

function minus(arg) {
  const result = parseInt(this) - parseInt(arg);
  return result.toString();
}

function divide(arg) {
  const result = parseInt(this) / parseInt(arg);
  return result.toString();
}
