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

$(document).ready(function() {
  // props filter
  $('#props-filter, #account-sidebar').scrollToFixed({ marginTop: 100 });

  // aos animation
  AOS.init({
    duration: 600,
    easing: 'ease-in-out-sine',
    delay: 100,
    disable: 'mobile'
  });
});
