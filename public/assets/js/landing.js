$(document).on("scroll",function(){$(document).scrollTop()>600?$(".main-nav").addClass("nav-sticky-top"):$(".main-nav").removeClass("nav-sticky-top")}),$(document).ready(function(){AOS.init({duration:600,easing:"ease-in-out-sine",delay:100})});