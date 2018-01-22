/*!
 * CHILLSPACE v1.0.0
 * Copyright ***
 * Licensed under ***
 */

// sticky header
$(document).on('scroll', function () {
  if($(document).scrollTop() > 600) {
    $('.main-nav').addClass('nav-sticky-top');
  } else {
    $('.main-nav').removeClass('nav-sticky-top');
  }
});

$(document).ready(function() {
  // props filter
  $('#props-filter').scrollToFixed({ marginTop: 100 });

  // flatpickr
  $(".date-picker").flatpickr({
    inline: true
  });

  // aos animation
  AOS.init({
    duration: 600,
    easing: 'ease-in-out-sine',
    delay: 100
  });

  // google map
  // var myLatlng = new google.maps.LatLng(25.051094, 121.5928083);
  // var mapOptions = {
  //   zoom: 17,
  //   center: myLatlng,
  // }
  // var map = new google.maps.Map(document.getElementById("map"), mapOptions);
  // var marker = new google.maps.Marker({
  //     position: myLatlng,
  //     title:"EUREKARE"
  // });
  // To add the marker to the map, call setMap();
  // marker.setMap(map);

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
