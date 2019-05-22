$(document).ready(function () {
  lazy();
  nav();
  scrollInit();
  map();
  $(".input_phone").mask("(999) 999-99-99");
});
$(window).resize(function () {
  innerWidth = $('body').innerWidth();
});
$(window).on('scroll', function() {
  scrollTop = $(window).scrollTop();
})



//global variables
var innerWidth = $('body').innerWidth(),
    scrollbarWidth,
    scrollTop = $(window).scrollTop(),
    //scroll-styling
    cursorcolorVar = "#cccccc",
    cursorwidthVar = "7px",
    cursorborderVar = "0",
    cursorborderradiusVar = "0",
    zindexVar = [100],
    bouncescrollVar = false;


//
function scrollInit() {
  $('.scroll-area').niceScroll({
    cursorcolor: cursorcolorVar,
    cursorwidth: cursorwidthVar,
    cursorborder: cursorborderVar,
    cursorborderradius: cursorborderradiusVar,
    zindex: zindexVar,
    bouncescroll: bouncescrollVar,
    autohidemode: false
  });
};
//
function compensateScrollbar() { 
  var div = $('<div style="width:50px;height:50px;overflow:hidden;position:absolute;top:-200px;left:-200px;"><div style="height:100px;"></div>'); 
  $('body').append(div); 
  var w1 = $('div', div).innerWidth(); 
  div.css('overflow-y', 'scroll'); 
  var w2 = $('div', div).innerWidth(); 
  $(div).remove(); 
  scrollbarWidth = w1 - w2;
}

//nav
function nav() {
  var $navOpen = $('.nav-button'),
    $navClose = $('.nav-close'),
    $nav = $('.nav'),
    $overlay = $('.overlay');

  $navOpen.on('click', function (e) {
    e.preventDefault();
    $nav.toggleClass('nav_active');
    navState();
  })
  $navClose.on('click', function (e) {
    e.preventDefault();
    $nav.removeClass('nav_active');
    navState();
  })
  $overlay.on('click touchstart', function () {
    $nav.removeClass('nav_active');
    navState();
  })
  
  function navState() {
    if ($nav.hasClass('nav_active')) {
      compensateScrollbar();
      $(".compensate-scrollbar").css('padding-right', scrollbarWidth);
      $('.scroll-area').getNiceScroll().resize();
      $('.header').addClass('active');
      scrollLock.hide($("body"));
      $overlay.fadeIn(300);
      if(innerWidth <= 1530) {
        $('.nav-button').addClass('active');
      }
    } else {
      $(".compensate-scrollbar").css('padding-right', '0');
      scrollLock.show($("body"));
      $('.header').removeClass('active');
      $('.nav-button').removeClass('active');
      $overlay.fadeOut(300);
    }
  }
  if (scrollTop>20) {
    $('.header, .nav').addClass('scrolled');
  } else {
    $('.header, .nav').removeClass('scrolled');
  }
  $(window).on('scroll', function() {
    if (scrollTop>20) {
      $('.header, .nav').addClass('scrolled');
    } else {
      $('.header, .nav').removeClass('scrolled');
    }
  })

}

//lazy
function lazy() {
  $(".lazy").Lazy({
    visibleOnly: false,
    threshold: '500',
    effect: 'fadeIn',
    effectTime: '300'
  });
}

function map() {
  var $region = $('*[data-item]'),
  flag,
  attr;

  $(document).on('click mousemove touchstart', function (e) {
    if (!$region.is(e.target) && $region.has(e.target).length === 0) {
      $region.removeClass('active');
    } else if ($region.is(e.target)) {
      $region.removeClass('active');
      attr = $(e.target).data('item');
      $(`*[data-item='${attr}']`).addClass('active');
    }
  });
}