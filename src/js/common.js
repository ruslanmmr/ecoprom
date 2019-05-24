$(document).ready(function () {
  lazy();
  nav();
  scrollInit();
  map();
  cover();
  $(".input_phone").mask("(999) 999-99-99");
  new WOW().init();
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
  var $navOpen = $('.nav-open'),
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
      $(".nav").css('margin-right', 0);
      $('.scroll-area').getNiceScroll().resize();
      $('.header').addClass('active');
      scrollLock.hide($("body"));
      $overlay.fadeIn(300);
    } else {
      $(".compensate-scrollbar").css('padding-right', '0');
      $(".nav").css('margin-right', -(scrollbarWidth));
      scrollLock.show($("body"));
      $('.header').removeClass('active');
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
    visibleOnly: true,
    effect: 'fadeIn',
    effectTime: '300',
    defaultImage: false,
    afterLoad: function() {
      cover();
    }
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
//js
function cover() {
  $('.cover-box').each(function () {
    //set size
    var th = $(this).height(), //box height
      tw = $(this).width(), //box width
      im = $(this).children('img'), //image
      ih = im.height(),
      iw = im.width();

    if ((tw / th) >= (iw / ih)) {
      im.addClass('ww').removeClass('wh');
    } else {
      im.addClass('wh').removeClass('ww');
    }
  });
}