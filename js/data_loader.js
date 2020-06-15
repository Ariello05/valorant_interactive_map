import { champion_names, errors } from './consts.js'
import { overlay_transition_controller, turn_on_overlay } from './overlay.js'

const update_images = (srcs) => {
  if (srcs.length === 1) {
    overlay_transition_controller.overlay_images.push([srcs])
  } else {
    overlay_transition_controller.overlay_images.push([...srcs])
  }
}

const setup_group = (index) => {
  return d3
    .select('#map_content')
    .append('g')
    .on('click', () => {
      turn_on_overlay(index)
    })
    .attr('class', 'clickable')
}

const sage_item_adder = (new_group, item) => {
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
}

const load = (groups, loader) => {
  let index = -1

  groups.forEach((group) => {
    index += 1
    const srcs = group.source
    const items = group.items

    update_images(srcs)
    const new_group = setup_group(index)

    items.forEach((item) => {
      loader(new_group, item)
    })
  })
}

const get_data_processor = () => {
  let last_used = {}

  const process_data = (data, filterBy) => {
    last_used = data
    if (last_used == null) {
      // TODO: Can delete?
      return
    }
    overlay_transition_controller.overlay_images = []
    switch (filterBy) {
      case champion_names.SAGE:
        load(data.sage, sage_item_adder)
        break

      case champion_names.SOVA:
        //groups = data.sova TODO
        break

      case champion_names.BRIMSTONE:
        //groups = data.brimstone TODO
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
const { process_data, refresh_with_data } = get_data_processor()

export { process_data, refresh_with_data }
