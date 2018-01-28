/*!
 * CHILLSPACE v1.0.1
 * Copyright ***
 * Licensed under ***
 */

$(document).ready(function() {
  // flatpickr
  $(".date-picker").flatpickr({
    inline: true
  });

  // weekly schedule
  var settings = {
    days: ["1/7 (日)", "1/8 (一)", "1/9 (二)", "1/10 (三)", "1/11 (四)", "1/12 (五)", "1/13 (六)"],
    hours: "00:00AM-11:00PM",
    // triggerMethod: "click-click"
  }
  $('#mySchedule').weekly_schedule(settings);
  // append text to schedule
  $('.schedule .hour').append("◯");
  // replace text
  $('.hour-header-item').text(function(index, text) {
    return text.replace("PM", " PM").replace("AM", " AM");
  });
  $('.hour-header-item').text(function(i, val) {
    return $.trim(val).length === 7 ? '0' + val : val;
  });
  $('.schedule').on('selectionmade', function() {
    console.log("Selection Made");
    $('.hour').on('click', function(event) {
      $(event.target).text(function(index, text) {
        return text.replace("◯", "V");
      });
    });
  }).on('selectionremoved', function() {
    console.log("Selection Removed");
    $('.hour').on('click', function(event) {
      $(event.target).text(function(index, text) {
        return text.replace("V", "◯");
      });
    });
  });
});
