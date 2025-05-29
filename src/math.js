const string1 = "2";
const string2 =
  "999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999";

Object.assign(String.prototype, { multiply, minus, divide, plus });

console.log(string1.multiply(string2), "multiply");
console.log(string1.minus(string2), "minus");
console.log(string1.divide(string2), "divide");
console.log(string1.plus(string2), "plus");

function multiply(arg) {
  if (this == 0 || arg == 0) {
    return "0";
  }

  let result = Array(this.length + arg.length).fill(0);

  for (let i = this.length - 1; i >= 0; i--) {
    for (let j = arg.length - 1; j >= 0; j--) {
      let mul = parseInt(this[i]) * parseInt(arg[j]);
      let p1 = i + j,
        p2 = i + j + 1;
      let sum = mul + result[p2];

      result[p2] = sum % 10;
      result[p1] += Math.floor(sum / 10);
    }
  }

  return result.join("").replace(/^0+/, "") || "0";
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
  if (this === arg) return "0";

  let res = "";
  let borrow = 0;
  let firstStringArray = this.replace(/^0+/, "") || "0";
  let secondStringArray = arg.replace(/^0+/, "") || "0";
  let negative = false;
  let arrRest = firstStringArray.length - secondStringArray.length;

  if (arrRest < 0 || (arrRest === 0 && firstStringArray < secondStringArray)) {
    arrRest = arrRest * -1;
    firstStringArray = arg.split("").reverse();
    secondStringArray = this.split("")
      .reverse()
      .concat(new Array(arrRest).fill(0));
    negative = true;
  } else {
    firstStringArray = this.split("").reverse();
    secondStringArray = arg
      .split("")
      .reverse()
      .concat(new Array(arrRest).fill(0));
  }

  for (let i = 0; i < firstStringArray.length; i++) {
    let digitA = parseInt(firstStringArray[i]);
    let digitB = parseInt(secondStringArray[i]);

    digitA -= borrow;

    if (digitA < digitB) {
      digitA += 10;
      borrow = 1;
    } else {
      borrow = 0;
    }

    res = digitA - digitB + res;
  }

  res = res.replace(/^0+/, "") || "0";
  return negative ? "-" + res : res;
}

function divide(arg, precision = 100) {
  const dividend = this.replace(/^0+/, "") || "0";
  const divisor = arg.replace(/^0+/, "") || "0";
  if (divisor === "0") throw new Error("Division by zero");
  if (dividend === "0") return "0";

  // Compare two numbers as strings
  function compare(a, b) {
    a = a.replace(/^0+/, "") || "0";
    b = b.replace(/^0+/, "") || "0";
    if (a.length !== b.length) return a.length - b.length;
    return a.localeCompare(b);
  }

  // Multiply string a by single digit (0–9)
  function multiplyDigit(a, digit) {
    if (digit === 0) return "0";
    let res = "";
    let carry = 0;
    a = a.split("").map(Number).reverse();
    for (let i = 0; i < a.length; i++) {
      let prod = a[i] * digit + carry;
      res = (prod % 10) + res;
      carry = Math.floor(prod / 10);
    }
    if (carry > 0) res = carry + res;
    return res.replace(/^0+/, "") || "0";
  }

  let result = "";
  let remainder = "";
  let idx = 0;
  let decimalStarted = false;
  let decimalCount = 0;

  while (
    idx < dividend.length ||
    (remainder !== "0" && decimalCount < precision)
  ) {
    if (idx < dividend.length) {
      remainder += dividend[idx++];
    } else {
      if (!decimalStarted) {
        result += ".";
        decimalStarted = true;
      }
      remainder += "0";
      decimalCount++;
    }

    remainder = remainder.replace(/^0+/, "") || "0";

    // Find the largest digit x such that divisor * x <= remainder
    let x = 0;
    let low = 0,
      high = 9;
    while (low <= high) {
      let mid = Math.floor((low + high) / 2);
      let prod = multiplyDigit(divisor, mid);
      if (compare(prod, remainder) <= 0) {
        x = mid;
        low = mid + 1;
      } else {
        high = mid - 1;
      }
    }

    result += x;
    remainder = remainder.minus(multiplyDigit(divisor, x));
  }

  result = result.replace(/^0+/, "") || "0";
  result = result.replace(/\.$/, ""); // Remove trailing dot
  return result;
}
