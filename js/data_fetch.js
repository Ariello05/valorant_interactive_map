import { errors, map_names, map_fetches } from './consts.js'
import { process_data } from './data_loader.js'
import { clear_interactive_map } from './interactive_map.js'

let activeMapButton = $('#map_list_item_bind')

const get_url_for_map = (map_name) => {
  switch (map_name) {
    case map_names.BIND:
      return map_fetches.BIND

    case map_names.SPLIT:
      return map_fetches.SPLIT

    case map_names.HAVEN:
      return map_fetches.HAVEN

    default:
      throw new Error(errors.notImplementedError)
  }
}

const handle_data_fetch = (map_name, champion_filter) => {
  fade_start(120)
  // IDC what you do with this key anyway...
  return fetch(get_url_for_map(map_name), {
    headers: {
      'secret-key':
        '$2b$10$aXNzpfHDCiVx1j0lTjE1dOqb36FnbSk5HDs2/zh26C/o0Xuolp8La'
    }
  })
    .then((response) => response.json())
    .then((result) => {
      process_data(result, champion_filter)
      fade_end(120, map_names.BIND)
      return result
    })
}

/**
 * Memoized fetcher
 */
const get_fetcher = () => {
  let bind_data = {}
  // let split_data = {}
  // let heaven_data = {}

  const data_fetch = (map_name, champion_filter) => {
    switch (map_name) {
      case map_names.BIND:
        if ($.isEmptyObject(bind_data)) {
          handle_data_fetch(map_name, champion_filter).then((result) => {
            bind_data = result
          })
        } else {
          fade_start(120, () => {
            process_data(bind_data, champion_filter)
            fade_end(120, map_names.BIND)
          })
        }

        break
      case map_names.SPLIT:
        fade_start(120, () => {
          process_data(null, champion_filter)
          fade_end(120, map_names.SPLIT)
        })
        break
      case map_names.HAVEN:
        fade_start(120, () => {
          process_data(null, champion_filter)
          fade_end(120, map_names.HAVEN)
        })
        break
      default:
        throw new Error(errors.argumentError)
    }
  }

  return data_fetch
}

const update_map = get_fetcher()

const fade_start = (time, on_finished = null) => {
  clear_interactive_map()
  $('#interactive_space').fadeOut(time, on_finished)
}

const fade_end = (time, map) => {
  $('#map_image').attr('xlink:href', `resource/image/${map}.png`)
  activeMapButton.removeClass('active_item')
  activeMapButton = $(`#map_list_item_${map}`)
  activeMapButton.addClass('active_item')
  $('#interactive_space').fadeIn(time)
}

export { update_map }
