$(document).ready(function () {
  lazy();
  reviews();
  nav();
  home();
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
    scrollTop = $(window).scrollTop();


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
//clients
function home() {
  var $slider = $('.home .banner'),
      prevArrow = $slider.parents('.slider').find('.slider-button_prev'),
      nextArrow = $slider.parents('.slider').find('.slider-button_next');

  $slider.on('init reInit afterChange', function(){
    lazy();
  })

  $slider.slick({
    infinite: true,
    dots: false,
    arrows: true,
    fade: true,
    speed: 400,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: prevArrow,
    nextArrow: nextArrow
  });
}
//reviews
function reviews() {
  var $slider = $('.reviews__slider'),
      prevArrow = $slider.parents('.slider').find('.slider-button_prev'),
      nextArrow = $slider.parents('.slider').find('.slider-button_next');

  $slider.on('init reInit afterChange', function(){
    lazy();
  })

  $slider.slick({
    infinite: true,
    dots: false,
    arrows: true,
    speed: 400,
    slidesToShow: 2,
    slidesToScroll: 2,
    prevArrow: prevArrow,
    nextArrow: nextArrow,
    responsive: [
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
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