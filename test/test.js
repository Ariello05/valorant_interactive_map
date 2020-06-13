import { eraser } from './utility.js'

Array.prototype.duplicate = function () {
  this.forEach((element) => {
    this.push(element)
  })
  return this
}

test('Array, duplicate eraser', () => {
  const tab = [2, 4, 5, 3, 4, 5, 1, 2, 1, 6]
  expect(eraser(tab)).toEqual([2, 4, 5, 3, 1, 6])
})

test('Array, duplicate prototype function', () => {
  expect([1, 2, 3].duplicate()).toEqual([1, 2, 3, 1, 2, 3])
})
