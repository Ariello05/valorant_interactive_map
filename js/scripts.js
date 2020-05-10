/* eslint-disable camelcase */
var activeButton = $('#map_list_item_bind')

const errors = {
  argumentError: 'Invalid argument in a function call',
  notImplementedError: "This functionality wasnt't implemented"
}

const map_names = {
  BIND: 'bind',
  SPLIT: 'split',
  HAVEN: 'haven'
}

const map_fetches = {
  BIND: 'https://api.jsonbin.io/b/5ea03eb55fa47104cea5096d/2',
  SPLIT: '',
  HAVEN: ''
}

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

const turn_on_overlay = (image_to_show_id) => {
  console.log(image_to_show_id)

  $('#overlay').children().append(
    ` <div class="card">
    <img src="resource/${image_to_show_id}"/>
    </div>`
  )

  $('#overlay').fadeIn(200)
}
const turn_off_overlay = (delay = 200) => {
  $('#overlay').fadeOut(delay)
  $('#overlay').children().empty()
}

const put_render_loading_title = () => {
  /* $('#interactive_space').append(
    '<span>Loading...</span>'
  ) */
}

const clear_render_loading_title = () => {
  /*
  $('#interactive_space').empty('span')
  */
}

const handle_data_fetch = (map_name) => {
  fade_start(120, put_render_loading_title)
  return fetch(get_url_for_map(map_name), {
    headers: {
      'secret-key':
        '$2b$10$aXNzpfHDCiVx1j0lTjE1dOqb36FnbSk5HDs2/zh26C/o0Xuolp8La'
    }
  })
    .then((response) => response.json())
    .then((result) => {
      // $('#map_svg').empty()
      process_data(result)
      fade_end(120, map_names.BIND, clear_render_loading_title)
      return result
    })
}

/**
 * Memoized fetcher
 */
function get_fetcher() {
  let bind_data = {}
  // let split_data = {}
  // let heaven_data = {}

  function data_fetch(map_name) {
    switch (map_name) {
      case map_names.BIND:
        if ($.isEmptyObject(bind_data)) {
          handle_data_fetch(map_name, bind_data).then((result) => {
            bind_data = result
          })
        } else {
          fade_start(120, () => {
            process_data(bind_data)
            fade_end(120, map_names.BIND)
          })
        }

        break
      case map_names.SPLIT:
        fade_start(120, () => {
          fade_end(120, map_names.SPLIT)
        })
        break
      case map_names.HAVEN:
        fade_start(120, () => {
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

function fade_start(time, on_finished = null) {
  clear_interactive_map()
  $('#interactive_space').fadeOut(time, on_finished)
}

function fade_end(time, map) {
  $('#map_image').attr('src', `resource/${map}.png`)
  activeButton.removeClass('active_item')
  activeButton = $(`#map_list_item_${map}`)
  activeButton.addClass('active_item')
  $('#interactive_space').fadeIn(time)
}

const process_data = (data) => {
  const groups = data.groups
  groups.forEach((group) => {
    const src = group.source

    // eslint-disable-next-line no-undef
    const new_group = d3
      .select('#map_svg')
      .append('g')
      .on('click', () => {
        turn_on_overlay(src)
      })
      .attr('class', 'clickable')

    const items = group.items
    items.forEach((item) => {
      if (item.type === 'circle') {
        new_group
          .append('circle')
          .attr('cx', `${item.cx}`)
          .attr('cy', `${item.cy}`)
          .attr('r', `${item.r}`)
          .attr('class', `${item.class}`)
      }
    })
  })
}

$(document).ready(() => {
  $('#map_list_item_split').click((ev) => {
    update_map('split')
  })
  $('#map_list_item_bind').click((ev) => {
    update_map('bind')
  })
  $('#map_list_item_haven').click((ev) => {
    update_map('haven')
  })
  $('#overlay').click((ev) => {
    turn_off_overlay()
  })
})

/* LIST LOGIC
  $("#hero_button").click((ev) => {
    let list = $("#hero_list");
    if (list.is(":visible")) {
      $("#hero_list").slideUp(300);
      $("#hero_button")
        .children(".arrow")
        .css({ transform: "rotate(-90deg)", top: "4px", left: "3px" });
    } else {
      $("#hero_list").slideDown(300);
      $("#hero_button")
        .children(".arrow")
        .css({ transform: "rotate(0deg)", top: "0px", left: "0px" });
    }
  }); */
