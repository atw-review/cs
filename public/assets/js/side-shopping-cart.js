jQuery(document).ready(function(n){var e=n("#main-nav"),i=n("#side-cart-trigger"),s=n("#cd-hamburger-menu"),o=n("#side-cart"),a=n("#side-cart-shadow-layer");s.on("click",function(i){i.preventDefault(),o.removeClass("speed-in"),toggle_panel_visibility(e,a,n("body"))}),i.on("click",function(i){i.preventDefault(),e.removeClass("speed-in"),toggle_panel_visibility(o,a,n("body"))}),a.on("click",function(){a.removeClass("is-visible"),o.hasClass("speed-in")?(o.removeClass("speed-in").on("webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend",function(){n("body").removeClass("overflow-hidden")}),e.removeClass("speed-in")):(e.removeClass("speed-in").on("webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend",function(){n("body").removeClass("overflow-hidden")}),o.removeClass("speed-in"))}),move_navigation(e,1200),n(window).on("resize",function(){move_navigation(e,1200),n(window).width()>=1200&&e.hasClass("speed-in")&&(e.removeClass("speed-in"),a.removeClass("is-visible"),n("body").removeClass("overflow-hidden"))})});function toggle_panel_visibility(n,e,i){n.hasClass("speed-in")?(n.removeClass("speed-in").one("webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend",function(){i.removeClass("overflow-hidden")}),e.removeClass("is-visible")):(n.addClass("speed-in").one("webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend",function(){i.addClass("overflow-hidden")}),e.addClass("is-visible"))}function move_navigation(n,e){$(window).width()>=e?(n.detach(),n.appendTo("header")):(n.detach(),n.insertAfter("header"))}