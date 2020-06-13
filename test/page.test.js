import { eraser } from './utility.js'
var html = require('fs').readFileSync('./index.html').toString()
jest.dontMock('jquery')
var $ = require('jquery')
document.documentElement.innerHTML = html

// jest.dontMock('js')
console.log($('#overlay'))
test('Initial State', () => {
  expect(
    $('#overlay').css('display') == 'none' ||
      $('#overlay').css('visibility') == 'hidden'
  ).toBe(true)
})

test('Array, duplicate eraser', () => {
  Array.prototype.duplicate = function () {
    this.forEach((element) => {
      this.push(element)
    })
    return this
  }
  const tab = [2, 4, 5, 3, 4, 5, 1, 2, 1, 6]

  expect(eraser(tab)).toEqual([2, 4, 5, 3, 1, 6])
})

test('Array, duplicate prototype function', () => {
  expect([1, 2, 3].duplicate()).toEqual([1, 2, 3, 1, 2, 3])
})
