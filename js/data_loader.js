let imagesArray = []

const errors = {
  argumentError: 'Invalid argument in a function call',
  notImplementedError: "This functionality wasnt't implemented"
}

const champion_names = {
  SAGE: 'sage',
  SOVA: 'sova',
  BRIMSTONE: 'brimstone'
}

const select_image = (id, index) => {
  const imagesSize = imagesArray[id].length
  $('#overlay_container').children('#image_container').children('.card').empty()
  $('#overlay_container')
    .children('#image_container')
    .children('.card')
    .append(`<img src= resource/image/${imagesArray[id][index]} />`)

  if (index === 0) {
    $('#arrow_right')
      .css('visibility', 'visible')
      .off('click')
      .click((ev) => {
        select_image(id, index + 1)
      })
    $('#arrow_left').css('visibility', 'hidden')
  } else if (index === imagesSize - 1) {
    $('#arrow_left')
      .css('visibility', 'visible')
      .off('click')
      .click((ev) => {
        select_image(id, index - 1)
      })
    $('#arrow_right').css('visibility', 'hidden')
  } else {
    $('#arrow_right')
      .css('visibility', 'visible')
      .off('click')
      .click((ev) => {
        select_image(id, index + 1)
      })
    $('#arrow_left')
      .css('visibility', 'visible')
      .off('click')
      .click((ev) => {
        select_image(id, index - 1)
      })
  }
}

const turn_on_overlay = (images_id) => {
  const finish = () => {
    $('#arrow_left').css('visibility', 'hidden')
    if (imagesArray[images_id].length > 1) {
      $('#arrow_right')
        .css('visibility', 'visible')
        .off('click')
        .click((ev) => {
          select_image(images_id, 1)
        })
    } else {
      $('#arrow_right').css('visibility', 'hidden')
    }
  }

  $('#overlay').fadeIn(200)
  $('#image_container')
    .children('.card')
    .append(
      $('<img>', {
        id: 'overlay_image',
        src: `resource/image/${imagesArray[images_id][0]}`,
        onload: finish
      })
    )
}

const turn_off_overlay = (delay = 200) => {
  $('#overlay').fadeOut(delay, () => {
    $('#image_container').children('.card').empty()
  })
}

const load_sage = (groups) => {
  let index = -1
  imagesArray = []

  groups.forEach((group) => {
    index += 1
    const srcs = group.source
    const items = group.items

    if (srcs.length === 1) {
      imagesArray.push([srcs])
    } else {
      imagesArray.push([...srcs])
    }

    // eslint-disable-next-line no-undef
    const new_group = d3
      .select('#map_svg')
      .append('g')
      .on('click', () => {
        turn_on_overlay(index)
      })
      .attr('class', 'clickable')

    items.forEach((item) => {
      if (item.type === 'sageBarrier') {
        new_group.attr(
          'transform',
          `rotate(${item.rotate} ${item.x + 25} ${item.y + 23})`
        )

        new_group
          .append('image')
          .attr('x', `${item.x}`)
          .attr('y', `${item.y}`)
          .attr('width', 50)
          .attr('height', 56)
          .attr('xlink:href', 'resource/image/sage_barrier.png')

        new_group
          .append('rect')
          .attr('x', `${item.x - 4}`)
          .attr('y', `${item.y + 5}`)
          .attr('rx', 5)
          .attr('ry', 5)
          .attr('width', 58)
          .attr('height', 45)
          .attr('class', `${item.class}`)
      }
    })
  })
}

const get_data_processor = () => {
  let last_used = {}

  const process_data = (data, filterBy) => {
    last_used = data
    if (last_used == null) {
      return
    }

    switch (filterBy) {
      case champion_names.SAGE:
        load_sage(data.sage)
        break

      case champion_names.SOVA:
        groups = data.sova
        break

      case champion_names.BRIMSTONE:
        groups = data.brimstone
        break

      default:
        throw new Error(errors.notImplementedError)
    }
  }
  const refresh_with_data = (filterBy) => {
    if (!$.isEmptyObject(last_used)) {
      process_data(last_used, filterBy)
    }
  }
  return { process_data, refresh_with_data }
}
export {
  get_data_processor,
  turn_off_overlay,
  turn_on_overlay,
  champion_names,
  errors
}
