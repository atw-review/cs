/*!
 * CHILLSPACE v1.0.1
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

jQuery(document).ready(function($) {
  // aos animation
  AOS.init({
    duration: 600,
    easing: 'ease-in-out-sine',
    delay: 100,
    disable: 'mobile'
  });

  // toggle nav change bgcolor
  $('.navbar-collapse').on('show.bs.collapse', function() {
    $('.navbar').addClass('nav-bg-dark');
  }).on('hidden.bs.collapse', function() {
    $('.navbar').removeClass('nav-bg-dark');
  });

  // collapse nav after click
  $('.navbar-nav>li>a').on('click', function() {
    $('.navbar-collapse').collapse('hide');
  });

  // google map
  var myLatlng = new google.maps.LatLng(25.051094, 121.5928083);
  var mapOptions = {
    zoom: 17,
    center: myLatlng,
  }
  var map = new google.maps.Map(document.getElementById("map"), mapOptions);
  var marker = new google.maps.Marker({
      position: myLatlng,
      title:"CHILLSPACE"
  });
  // To add the marker to the map, call setMap();
  marker.setMap(map);
});
