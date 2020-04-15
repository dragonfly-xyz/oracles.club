(function($) {
  "use strict"; // Start of use strict

  // Toggle the side navigation
  $("#sidebarToggle, #sidebarToggleTop").on('click', function(e) {
    $("body").toggleClass("sidebar-toggled");
    $(".sidebar").toggleClass("toggled");
    if ($(".sidebar").hasClass("toggled")) {
      $('.sidebar .collapse').collapse('hide');
    };
  });

  // Close any open menu accordions when window is resized below 768px
  $(window).resize(function() {
    if ($(window).width() < 768) {
      $('.sidebar .collapse').collapse('hide');
    };
  });

  // Prevent the content wrapper from scrolling when the fixed side navigation hovered over
  $('body.fixed-nav .sidebar').on('mousewheel DOMMouseScroll wheel', function(e) {
    if ($(window).width() > 768) {
      var e0 = e.originalEvent,
        delta = e0.wheelDelta || -e0.detail;
      this.scrollTop += (delta < 0 ? 1 : -1) * 30;
      e.preventDefault();
    }
  });

  // Scroll to top button appear
  $(document).on('scroll', function() {
    var scrollDistance = $(this).scrollTop();
    if (scrollDistance > 100) {
      $('.scroll-to-top').fadeIn();
    } else {
      $('.scroll-to-top').fadeOut();
    }
  });

  // Smooth scrolling using jQuery easing
  $(document).on('click', 'a.scroll-to-top', function(e) {
    var $anchor = $(this);
    $('html, body').stop().animate({
      scrollTop: ($($anchor.attr('href')).offset().top)
    }, 1000, 'easeInOutExpo');
    e.preventDefault();
  });

  var ws;

  $(document).ready(function(e) {
    ws = new WebSocket('ws://54.215.119.135:5678');
    ws.onmessage = function(e) {
      console.log(e);
      var update = JSON.parse(e.data);
      var bodySelector = '#price-table-body';
      // $("#price-feed-body").empty();
      for(var entry in update) {
        var rowSelector = `${entry}-price-feed`
        var lastUpdatedDate = new Date(update[entry].last_updated * 1000);
        if($(`#${rowSelector}-row`).length === 0) {
          var elem = $(`<tr id=\'${rowSelector}-row\'>`)
            .append($(`<td id=\'${rowSelector}-title\'>`).text(entry))
            .append($(`<td id=\'${rowSelector}-cur-price\'>`))
            .append($(`<td id=\'${rowSelector}-last-updated\'>`))
            .append($(`<td id=\'${rowSelector}-prev-price\'>`))
          $(bodySelector).append(elem)
        }

        $(`#${rowSelector}-cur-price`).text(update[entry].cur_price.toFixed(2));
        $(`#${rowSelector}-last-updated`).text(lastUpdatedDate.toUTCString());
        $(`#${rowSelector}-prev-price`).text((update[entry].prev_price.toFixed(2)));
      }
        
    };
    ws.onopen = function(e) {
      console.log("open");
      console.log(e);
    }
  });

})(jQuery); // End of use strict
