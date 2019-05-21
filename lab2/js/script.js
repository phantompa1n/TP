"use strict";
//Вариант 4

//First task *
//Функция должна принимать другую функцию (F) и некоторое количество дополнительных аргументов
//Функция должна привязать переданные аргументы к функции F и вернуть получившуюся функцию

function bindFunction(callback, args) {
  callback.apply(this, args);
}

function eat(food1, food2) {
  console.log("I like to eat " + food1 + " and " + food2);
}

bindFunction(eat, ["pickles", "sadasd", "peanut butter"]);

//Second task
// Напишите аналог встроенного метода slice для работы с массивами
function slice(array, fn, begin, end) {
  let i, cloned = [], size, len = array.length, start, upTo;
  end = (typeof end !== 'undefined') ? end : array.length;
  start = begin || 0;
  start = (start >= 0) ? start : Math.max(0, len + start);
  upTo = (typeof end == 'number') ? Math.min(end, len) : len;

  if (end < 0) {
    upTo = len + end;
  }

  size = upTo - start;

  if (size > 0) {
    cloned = new Array(size);
    if (array.charAt) {
      for (i = 0; i < size; i++) {
        cloned[i] = array.charAt(start + i);
      }
    } else {
      for (i = 0; i < size; i++) {
        cloned[i] = array[start + i];
      }
    }
  }

  return cloned;
}

function fn() {
}

let arr = [1, 2, 3];
console.log(arr);
console.log(slice(arr, fn, 1, 2));

//Task3
// Функция должна перебрать все свойства объекта,
// преобразовать их имена в верхний регистра и вернуть в виде массива

let user = {
  name: "Вася",
  surname: "Петров"
};

user.age = 12;

function upperProps(obj) {
  let keyArray = [];
  for (let key in obj) {
    keyArray.push(key.toUpperCase());
  }
  return keyArray;
}

console.log(upperProps(user));

//Task3 *
// Функция принимает объект и должна вернуть Proxy для этого объекта.
// Proxy должен перехватывать все попытки записи значений свойств и возводить это значение в квадрат

let numberObject = {};

let raisingNumToPow = {
  set: function (obj, prop, value) {
    if (!Number.isInteger(value)) {
      throw new TypeError('The value is not an integer');
    } else {
      value = value * value;
    }
    obj[prop] = value;
    return true;
  }
};

function createProxy(obj) {
  return new Proxy(obj, raisingNumToPow);
}

let newObj = createProxy(numberObject);

newObj.num1 = 2;
console.log(newObj.num1);

newObj.num2 = 4;
console.log(newObj.num2);