'use strict';

$(function () {
  function updateNavigation() {
    $('.section').each(function () {
      var activeSection = $('#dot-nav a[href="#' + $(this).attr('id') + '"]').data('number');
      var offsetTop = $(this).offset().top;
      var halfWindowHeight = $(window).height() / 2;
      var distanceFromTop = $(window).scrollTop();
      var cond1 = offsetTop - halfWindowHeight < distanceFromTop;
      var cond2 = offsetTop + $(this).height() - halfWindowHeight > distanceFromTop;

      if (cond1 && cond2) {
        $('#dot-nav a').eq(activeSection).addClass('is-selected');
      } else {
        $('#dot-nav a').eq(activeSection).removeClass('is-selected');
      }
    });
  }

  updateNavigation();
  window.addEventListener('scroll', updateNavigation);

  function smoothScroll(target) {
    $('body, html').animate({ 'scrollTop': target.offset().top + 50 }, 500);
  }

  $('.scroll-down').on('click', function (ev) {
    ev.preventDefault();
    smoothScroll($(this.hash));
  });

  $('#dot-nav a').on('click', function (ev) {
    ev.preventDefault();
    smoothScroll($(this.hash));
  });

  $('#overlay a').on('click', function (ev) {
    ev.preventDefault();
    smoothScroll($(this.hash));
    $('#toggle').click();
  });
});

var dotNav = document.querySelector('#dot-nav');
var about = document.querySelector('#about-section');
var hamburger = document.querySelector('#toggle');
var overlay = document.querySelector('#overlay');

function handleNavs() {
  var isDesktop = window.innerWidth > 768;
  var topOfAbout = about.offsetTop - about.offsetTop / 4;
  var isBelowIntro = window.scrollY > topOfAbout;
  var menuOpen = overlay.classList.contains('open');

  if (isDesktop && isBelowIntro) {
    dotNav.classList.add('active');
  } else if (isDesktop && menuOpen) {
    toggleMenu();
  } else {
    dotNav.classList.remove('active');
  }
}

window.addEventListener('scroll', handleNavs);
window.addEventListener('resize', handleNavs);

// Toggle mobile menu open and closed
function toggleMenu() {
  hamburger.classList.toggle('active');
  overlay.classList.toggle('open');
  document.body.classList.toggle('noScroll');
}

hamburger.addEventListener('click', toggleMenu);

var isMobile = {
  Android: function Android() {
    return navigator.userAgent.match(/Android/i);
  },
  BlackBerry: function BlackBerry() {
    return navigator.userAgent.match(/BlackBerry/i);
  },
  iOS: function iOS() {
    return navigator.userAgent.match(/iPhone|iPad|iPod/i);
  },
  Opera: function Opera() {
    return navigator.userAgent.match(/Opera Mini/i);
  },
  Windows: function Windows() {
    return navigator.userAgent.match(/IEMobile/i);
  },
  any: function any() {
    return isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows();
  }
};

// turn off parallax effect on mobile devices
if (!isMobile.any()) {
  skrollr.init({
    render: function render(data) {
      //Debugging - Log the current scroll position.
      // console.log(data.curTop);
    },
    smoothScrolling: false,
    forceHeight: false
  });
}

// toggle contact input classes on focus or blur
var contactInput = document.querySelectorAll('.contact-input');

function focusInput() {
  this.parentElement.classList.add('is-active', 'is-completed');
}
function blurInput() {
  this.parentElement.classList.remove('is-active', 'is-completed');
}

contactInput.forEach(function (input) {
  return input.addEventListener('focus', focusInput);
});
contactInput.forEach(function (input) {
  return input.addEventListener('blur', blurInput);
});

// dynamically expand textarea
var textarea = document.querySelector('#message');
var limit = 300;

function autoExpand() {
  textarea.style.height = "";
  textarea.style.height = Math.min(textarea.scrollHeight, limit) + 'px';
}

textarea.addEventListener('input', autoExpand);