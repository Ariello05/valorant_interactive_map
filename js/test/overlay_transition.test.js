import {
  setup_arrow,
  can_show_left_arrow,
  can_show_right_arrow
} from '../overlay_utility.js'

describe('Show overlay arrows?', () => {
  test('Left, show for index 0', () => {
    expect(can_show_left_arrow(0)).toBe(false)
  })
  test('Left, show for index 1', () => {
    expect(can_show_left_arrow(1)).toBe(true)
  })
  test('Right, show for index 0, length 2', () => {
    expect(can_show_right_arrow(0, 2)).toBe(true)
  })
  test('Right, show for index 1, length 2', () => {
    expect(can_show_right_arrow(1, 2)).toBe(false)
  })
  test('Right, show for index 2, length 2', () => {
    expect(can_show_right_arrow(2, 2)).toBe(false)
  })
})
