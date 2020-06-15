var block = false

const is_blocked = () => {
  // why? needed to fix bug, where user hovers on currently slidingUp object, making it move into slide Up/Down cycle
  if (block === true) {
    return true
  } else {
    block = true
    return false
  }
}

const open_filter = () => {
  if (is_blocked()) return

  $('#open_filter')
    .children('.dropdown_content')
    .slideDown(150, () => {
      block = false
    })
}

const close_filter = () => {
  if (is_blocked()) return

  $('#open_filter')
    .children('.dropdown_content')
    .slideUp(150, () => {
      block = false
    })
}

export { open_filter, close_filter }
