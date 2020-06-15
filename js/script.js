/* eslint-disable camelcase */
import { refresh_with_data } from './data_loader.js'
import { champion_names } from './consts.js'
import { overlay_transition_controller, turn_off_overlay } from './overlay.js'
import { open_filter, close_filter } from './filter_button.js'
import { update_map } from './data_fetch.js'
import { clear_interactive_map } from './interactive_map.js'

let activeFilter = $('#filter_li_sage')
let filterBy = champion_names.SAGE

$(document).ready(() => {
  overlay_transition_controller.set_image_holder(
    $('#overlay_container').children('#image_container').children('.card')
  )
  overlay_transition_controller.set_left_arrow_holder($('#arrow_left'))
  overlay_transition_controller.set_right_arrow_holder($('#arrow_right'))

  const group = d3.select('#top_map_group')
  d3.select('#map_svg').call(
    d3.zoom().on('zoom', function () {
      group.attr('transform', d3.event.transform)
    })
  )

  update_map('bind', filterBy)
  $('#overlay').click((ev) => {
    if (ev.target.nodeName !== 'IMG' || ev.target.id === 'close_button') {
      turn_off_overlay()
    }
  })
  $('#map_list_item_split').click(() => {
    update_map('split', filterBy)
  })
  $('#map_list_item_bind').click(() => {
    update_map('bind', filterBy)
  })
  $('#map_list_item_haven').click(() => {
    update_map('haven', filterBy)
  })
  $('#open_filter').hover(open_filter, close_filter)
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

  $('#filter_li_sage').click(() => {
    activeFilter.removeClass('active_item')
    activeFilter = $('#filter_li_sage')
    activeFilter.addClass('active_item')
    filterBy = champion_names.SAGE
    clear_interactive_map()
    refresh_with_data(filterBy)
  })
  $('#filter_li_sova').click(() => {
    activeFilter.removeClass('active_item')
    activeFilter = $('#filter_li_sova')
    activeFilter.addClass('active_item')
    filterBy = champion_names.SOVA
    clear_interactive_map()
    refresh_with_data(filterBy)
  })
  $('#filter_li_brimstone').click(() => {
    activeFilter.removeClass('active_item')
    activeFilter = $('#filter_li_brimstone')
    activeFilter.addClass('active_item')
    filterBy = champion_names.BRIMSTONE
    clear_interactive_map()
    refresh_with_data(filterBy)
  })
})
