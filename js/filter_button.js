let block = false

const open_filter = () => {
  if (block) {
    return
  }

  $('#open_filter')
    .children('.dropdown_content')
    .slideDown(150, () => {
      block = false
    })
}

const close_filter = () => {
  if (block) {
    // why? needed to fix bug, where user hovers on currently slidingUp object, making it move into slide Up/Down cycle
    return
  }

  block = true
  $('#open_filter')
    .children('.dropdown_content')
    .slideUp(150, () => {
      block = false
    })
}

export { open_filter, close_filter }
