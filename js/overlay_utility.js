const setup_arrow = (arrow, click_callback) => {
  arrow.css('visibility', 'visible').off('click').click(click_callback)
}

const can_show_left_arrow = (index) => {
  return index >= 1
}

const can_show_right_arrow = (index, length) => {
  return index + 1 < length && length > 1
}

export { setup_arrow, can_show_left_arrow, can_show_right_arrow }
