import {
  setup_arrow,
  can_show_left_arrow,
  can_show_right_arrow
} from './overlay_utility.js'

let overlay_transition_controller = {
  overlay_images: [],
  current_images: [],
  set_image_holder: function (image_holder) {
    this.image_holder = image_holder
  },
  set_left_arrow_holder: function (left_arrow) {
    this.left_arrow = left_arrow
  },
  set_right_arrow_holder: function (right_arrow) {
    this.right_arrow = right_arrow
  },
  select_group: function (id) {
    this.current_images = this.overlay_images[id]
  },
  update_arrows: function (index) {
    if (can_show_left_arrow(index)) {
      console.log('SHOW LEFT')
      setup_arrow(this.left_arrow, () => {
        this.select_image(index - 1)
      })
    } else {
      this.left_arrow.css('visibility', 'hidden')
    }

    const length = this.current_images.length
    if (can_show_right_arrow(index, length)) {
      console.log('SHOW RIGHT')
      setup_arrow(this.right_arrow, () => {
        this.select_image(index + 1)
      })
    } else {
      this.right_arrow.css('visibility', 'hidden')
    }
  },
  select_image: function (index) {
    if (index < 0 || index >= this.current_images.length) {
      throw Error('Access out of bounds')
    }
    this.image_holder.empty()
    this.image_holder.append(
      $('<img>', {
        id: 'overlay_image',
        src: `resource/image/${this.current_images[index]}`,
        onload: () => {
          this.update_arrows(index)
        }
      })
    )
  }
}

const turn_on_overlay = (images_id) => {
  $('#overlay_container').children('.arrow').css('visibility', 'hidden')
  $('#overlay').fadeIn(200)
  overlay_transition_controller.select_group(images_id)
  overlay_transition_controller.select_image(0)
}

const turn_off_overlay = (delay = 200) => {
  $('#overlay').fadeOut(delay, () => {
    $('#image_container').children('.card').empty()
  })
}

export { overlay_transition_controller, turn_on_overlay, turn_off_overlay }
