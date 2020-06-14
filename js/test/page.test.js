import { eraser } from '../utility.js'
const puppeteer = require('puppeteer')

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
/*
describe('Puppeteer checks', () => {
  test('Initial State', async () => {
    const browser = await puppeteer.launch({
      headless: true
      // slowMo: 0
    })
    const page = await browser.newPage()
    await page.goto('http://localhost:8080/')
    const isHidden = await page.$('#overlay')
    console.log(isHidden)
    //expect(isHidden).toBe(true)
  }, 10000)
})
*/
