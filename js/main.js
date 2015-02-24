var parallax;
var scaleText = function() {
  // 1330px wide == 22pt
  var minSize = 15;
  var maxSize = 22;

  var width = window.getWidth();
  var newSize = Math.min(Math.max(minSize, width / 75), maxSize);
  document.body.style.fontSize = newSize + 'pt';
};

var slideTo = function(e) {

};

window.addEvent('domready', function(){

  window.addEvent('resize', scaleText);
  scaleText();

  var smoothScroll = new Fx.Scroll(window, {
    duration: 500,
    transition: Fx.Transitions.Quad.easeOut,
    offset: {
      x: 0,
      y: 70
    }
  });

  var navToggle = $$('.nav-toggle').pick();
  var nav = $$('.nav').pick();
  var body = $$('body').pick();
  var header = $$('.header').pick();
  var scrollArrow = $$('.scroll-down').pick();

  navToggle.addEvent('click', function(e) {
    if (!nav.hasClass('show-nav')) {
      header.removeClass('hidden');
    } else if (nav.hasClass('show-nav') &&
        window.scrollY < 200 && body.hasClass('home')) {
      header.addClass('hidden');
    }
    nav.toggleClass('show-nav');
    navToggle.toggleClass('nav-close');
  });

  document.addEvent('scroll', function(e) {
    if (window.scrollY > 200) {
      header.removeClass('hidden');
    } else {
      header.addClass('hidden');
      nav.removeClass('show-nav');
      navToggle.removeClass('nav-close');
    }
  });

  if (scrollArrow) {
    scrollArrow.addEvent('click', function(e) {
      var parent = e.target.getParent('section');
      var nextSlide = parent.getSiblings()[0];
      var anchor = nextSlide.getElement('.anchor');
      smoothScroll.start(0, anchor.getOffsets().y);
    });
  }

  var isTouchDevice = 'ontouchstart' in document.documentElement;

  if (!isTouchDevice) {
    parallax = skrollr.init({
      forceHeight: false
    });
  } else {
    document.body.addClass('touch-device');
  }

  var userAgent = window.navigator.userAgent;
  if (userAgent.match(/iPad/i) || userAgent.match(/iPhone/i)) {
    $$('.scroll-down').pick().style.bottom = '70px';
  }

});
