/* eslint-disable camelcase */
var activeButton = $('#map_list_item_bind')

// eslint-disable-next-line no-unused-vars
const turn_on_overlay = (image_to_show_id) => {
  console.log(image_to_show_id)

  $('#overlay').children().append(
    ` <div class="card">
    <img src="resource/${image_to_show_id}"/>
    </div>`
  )

  $('#overlay').fadeIn(200)
}

// eslint-disable-next-line no-unused-vars
const turn_off_overlay = (delay = 200) => {
  $('#overlay').fadeOut(delay)
  $('#overlay').children().empty()
}

function fade_map(time, map) {
  $('#interactive_space').fadeOut(time, () => {
    $('#map_image').attr('src', `resource/${map}.png`)
    activeButton.removeClass('active_item')
    activeButton = $(`#map_list_item_${map}`)
    activeButton.addClass('active_item')
    $('#interactive_space').fadeIn(time)
  })
}

const processData = (data) => {
  const groups = data.groups
  groups.forEach((group) => {
    console.log(group)
    const src = group.source
    // let new_html_group = `<g onclick="turn_on_overlay(${src})" class="clickable"></g>`
    // new_html_group = $(new_html_group).appendTo('#map_svg')

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
        // new_group.append(
        //  `<circle cx=${item.cx} cy=${item.cy} r=${item.r} class=${item.class}  />`
        // )
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
    fade_map(120, 'split')
  })
  $('#map_list_item_bind').click((ev) => {
    fetch('https://api.jsonbin.io/b/5ea03eb55fa47104cea5096d/2', {
      headers: {
        'secret-key':
          '$2b$10$aXNzpfHDCiVx1j0lTjE1dOqb36FnbSk5HDs2/zh26C/o0Xuolp8La'
      }
    })
      .then((response) => response.json())
      .then((result) => {
        $('#map_svg').empty()
        processData(result)
      })
    fade_map(120, 'bind')
  })
  $('#map_list_item_haven').click((ev) => {
    fade_map(120, 'haven')
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
