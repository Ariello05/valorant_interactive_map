/* eslint-disable camelcase */
import {
  get_data_processor,
  turn_off_overlay,
  turn_on_overlay,
  champion_names,
  errors
} from './data_loader.js'

const map_names = {
  BIND: 'bind',
  SPLIT: 'split',
  HAVEN: 'haven'
}

const map_fetches = {
  BIND: 'https://api.jsonbin.io/b/5ea03eb55fa47104cea5096d/15',
  SPLIT: '',
  HAVEN: ''
}

let activeMapButton = $('#map_list_item_bind')
let activeFilter = $('#filter_li_sage')
let filterBy = champion_names.SAGE

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

const clear_interactive_map = () => {
  $('#map_svg').empty()
}

const toogle_modal = () => {
  $('#pick_form').toggle(50)
  $('#modal').toggle(200)
}

const turn_off_modal = () => {
  $('#pick_form').fadeOut(50)
  $('#modal').fadeOut(200)
}

const { process_data, refresh_with_data } = get_data_processor()

const put_render_loading_title = () => {
  // $('#interactive_space').append('<span>Loading...</span>')
}

const clear_render_loading_title = () => {
  // $('#interactive_space').empty('span')
}

const handle_data_fetch = (map_name) => {
  fade_start(120, put_render_loading_title)
  // IDC what you do with this key anyway...
  return fetch(get_url_for_map(map_name), {
    headers: {
      'secret-key':
        '$2b$10$aXNzpfHDCiVx1j0lTjE1dOqb36FnbSk5HDs2/zh26C/o0Xuolp8La'
    }
  })
    .then((response) => response.json())
    .then((result) => {
      process_data(result, filterBy)
      fade_end(120, map_names.BIND, clear_render_loading_title)
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

  const data_fetch = (map_name) => {
    switch (map_name) {
      case map_names.BIND:
        if ($.isEmptyObject(bind_data)) {
          handle_data_fetch(map_name, bind_data).then((result) => {
            bind_data = result
          })
        } else {
          fade_start(120, () => {
            process_data(bind_data, filterBy)
            fade_end(120, map_names.BIND)
          })
        }

        break
      case map_names.SPLIT:
        fade_start(120, () => {
          process_data(null, filterBy)
          fade_end(120, map_names.SPLIT)
        })
        break
      case map_names.HAVEN:
        fade_start(120, () => {
          process_data(null, filterBy)
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
  $('#map_image').attr('src', `resource/image/${map}.png`)
  activeMapButton.removeClass('active_item')
  activeMapButton = $(`#map_list_item_${map}`)
  activeMapButton.addClass('active_item')
  $('#interactive_space').fadeIn(time)
}

$(document).ready(() => {
  update_map('bind')
  $('#overlay').click((ev) => {
    if (ev.target.nodeName !== 'IMG') {
      turn_off_overlay()
    }
  })
  $('#map_list_item_split').click((ev) => {
    update_map('split')
  })
  $('#map_list_item_bind').click((ev) => {
    update_map('bind')
  })
  $('#map_list_item_haven').click((ev) => {
    update_map('haven')
  })
  $('#open_filter').click((ev) => {
    toogle_modal()
  })
  $('#attacker_toggle_item').click(() => {
    $('#attacker_toggle_item').removeClass('toggle_off')
    $('#attacker_toggle_item').addClass('toggle_on')
    $('#defender_toggle_item').removeClass('toggle_on')
    $('#defender_toggle_item').addClass('toggle_off')
  })
  $('#defender_toggle_item').click(() => {
    $('#defender_toggle_item').removeClass('toggle_off')
    $('#defender_toggle_item').addClass('toggle_on')
    $('#attacker_toggle_item').removeClass('toggle_on')
    $('#attacker_toggle_item').addClass('toggle_off')
  })

  $('#filter_li_sage').click((ev) => {
    activeFilter.removeClass('active_item')
    activeFilter = $('#filter_li_sage')
    activeFilter.addClass('active_item')
    filterBy = champion_names.SAGE
    clear_interactive_map()
    refresh_with_data(filterBy)
  })
  $('#filter_li_sova').click((ev) => {
    activeFilter.removeClass('active_item')
    activeFilter = $('#filter_li_sova')
    activeFilter.addClass('active_item')
    filterBy = champion_names.SOVA
    clear_interactive_map()
    refresh_with_data(filterBy)
  })
  $('#filter_li_brimstone').click((ev) => {
    activeFilter.removeClass('active_item')
    activeFilter = $('#filter_li_brimstone')
    activeFilter.addClass('active_item')
    filterBy = champion_names.BRIMSTONE
    clear_interactive_map()
    refresh_with_data(filterBy)
  })
})
