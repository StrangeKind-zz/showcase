$(document).ready(function () {

	(function($) {

	/**
	 * Copyright 2012, Digital Fusion
	 * Licensed under the MIT license.
	 * http://teamdf.com/jquery-plugins/license/
	 *
	 * @author Sam Sehnert
	 * @desc A small plugin that checks whether elements are within
	 *     the user visible viewport of a web browser.
	 *     only accounts for vertical position, not horizontal.
	 */

	$.fn.visible = function(partial) {

		var $t            = $(this),
			$w            = $(window),
			viewTop       = $w.scrollTop(),
			viewBottom    = viewTop + $w.height(),
			_top          = $t.offset().top,
			_bottom       = _top + $t.height(),
			compareTop    = partial === true ? _bottom : _top,
			compareBottom = partial === true ? _top : _bottom;

	  return ((compareBottom <= viewBottom) && (compareTop >= viewTop));

	};

	})(jQuery);

	$(window).scroll(function(event) {

	$(".plx").each(function(i, el) {
	  var el = $(el);
	  if (el.visible(true)) {
		el.addClass("fadeInUp");
	  }
	});

	$(".plx-1").each(function(i, el) {
	  var el = $(el);
	  if (el.visible(true)) {
		el.addClass("fadeIn");
	  }
	});

	});

		$('.pagepiling').pagepiling({
	        direction: 'vertical',
	        verticalCentered: false,
	        scrollingSpeed: 800,
	        easing: 'swing',
	        loopBottom: false,
	        loopTop: false,
	        css3: true,
	       	normalScrollElements: null,
	        normalScrollElementTouchThreshold: 5,
	        touchSensitivity: 5,
	        keyboardScrolling: true,
	        sectionSelector: '.section',
	        animateAnchor: false,
			navigation: false,

			//events
			onLeave: function(index, nextIndex, direction){
				$('.section').find('.overlay-loader').removeClass('slideOutRight');
				$('.section').find('.overlay-loader').addClass('slideInLeft');
				$('.pp-section.active').find('h1 span').addClass('fadeOutDown');
				$('.pp-section.active').find('h1 span').removeClass('fadeInUp');
				$('.pp-section.active').find('h1 span').removeClass('fadeOutDown');
			},
			afterLoad: function(anchorLink, index, direction){
				$('.pp-section.active').find('.overlay-loader').addClass('slideOutRight');
				$('.pp-section.active').find('h1 span').addClass('fadeInUp');
				$('.pp-section.active').find('.overlay-loader').removeClass('slideInLeft');

				if(index == 1){
					$('.pagination--current__1').addClass('fadeInUp');
					$('.pagination--current__2').removeClass('fadeOutDown');
					$('.pagination--current__2').removeClass('fadeInUp');
					$('.pagination--current__3').removeClass('fadeInUp');
					$('.pagination--current__4').removeClass('fadeInUp');
					$('.pagination--current__5').removeClass('fadeInUp');
				}
				if(index == 2){
					$('.pagination--current__2').addClass('fadeInUp');
					$('.pagination--current__2').removeClass('fadeOutDown');
					$('.pagination--current__1').removeClass('fadeInUp');
					$('.pagination--current__3').removeClass('fadeInUp');
					$('.pagination--current__4').removeClass('fadeInUp');
					$('.pagination--current__5').removeClass('fadeInUp');
				}
				if(index == 3){
					$('.pagination--current__3').addClass('fadeInUp');
					$('.pagination--current__3').removeClass('fadeOutDown');
					$('.pagination--current__1').removeClass('fadeInUp');
					$('.pagination--current__2').removeClass('fadeInUp');
					$('.pagination--current__4').removeClass('fadeInUp');
					$('.pagination--current__5').removeClass('fadeInUp');
				}
				if(index == 4){
					$('.pagination--current__4').addClass('fadeInUp');
					$('.pagination--current__4').removeClass('fadeOutDown');
					$('.pagination--current__1').removeClass('fadeInUp');
					$('.pagination--current__2').removeClass('fadeInUp');
					$('.pagination--current__3').removeClass('fadeInUp');
					$('.pagination--current__5').removeClass('fadeInUp');
				}
				if(index == 5.){
					$('.pagination--current__5').addClass('fadeInUp');
					$('.pagination--current__5').removeClass('fadeOutDown');
					$('.pagination--current__1').removeClass('fadeInUp');
					$('.pagination--current__2').removeClass('fadeInUp');
					$('.pagination--current__4').removeClass('fadeInUp');
					$('.pagination--current__3').removeClass('fadeInUp');
				}

			}

	})

	$(function() {

		Barba.Pjax.start();

		if (Barba.HistoryManager.currentStatus().namespace === "woodwork") {
			$.fn.pagepiling.setAllowScrolling(false);
			$.fn.pagepiling.setKeyboardScrolling(false);
			$.fn.pagepiling.moveTo(1);
			$.fn.pagepiling.setScrollingSpeed(0);
		}

		if (Barba.HistoryManager.currentStatus().namespace === "protest") {
			$.fn.pagepiling.setAllowScrolling(false);
			$.fn.pagepiling.setKeyboardScrolling(false);
			$.fn.pagepiling.moveTo(2);
			$.fn.pagepiling.setScrollingSpeed(0);
		}

		if (Barba.HistoryManager.currentStatus().namespace === "bpd") {
			$.fn.pagepiling.setAllowScrolling(false);
			$.fn.pagepiling.setKeyboardScrolling(false);
			$.fn.pagepiling.moveTo(3);
			$.fn.pagepiling.setScrollingSpeed(0);
		}

		if (Barba.HistoryManager.currentStatus().namespace === "alberta") {
			$.fn.pagepiling.setAllowScrolling(false);
			$.fn.pagepiling.setKeyboardScrolling(false);
			$.fn.pagepiling.moveTo(4);
			$.fn.pagepiling.setScrollingSpeed(0);
		}

		if (Barba.HistoryManager.currentStatus().namespace === "diversity") {
			$.fn.pagepiling.setAllowScrolling(false);
			$.fn.pagepiling.setKeyboardScrolling(false);
			$.fn.pagepiling.moveTo(5);
			$.fn.pagepiling.setScrollingSpeed(0);
		}

		if (Barba.HistoryManager.currentStatus().namespace === "about") {
			$('.about-link').removeClass('inactive-link');
			$('.project-link').addClass('inactive-link');
			$.fn.pagepiling.setAllowScrolling(false);
			$.fn.pagepiling.setKeyboardScrolling(false);
			$('.pagepiling').addClass('animated fadeOut');
			$('.about--container').addClass('fadeIn');
			$('.about--container__header h1').addClass('fadeInUp');
			$('.about--container__header h1').removeClass('fadeOut');
		}
		var FadeTransition = Barba.BaseTransition.extend({
		  start: function() {
		    Promise
		      .all([this.newContainerLoading, this.fadeOut()])
		      .then(this.fadeIn.bind(this));
		  },

		  fadeOut: function() {

		    return $(this.oldContainer).delay(1600).animate({ opacity: 0 }, 700).promise();
		  },

		  fadeIn: function() {

		    var _this = this;
		    var $el = $(this.newContainer);




		    $(this.oldContainer).hide().delay(4000);

		    $el.css({
		      visibility : 'visible',
		      opacity : 0
		    });

		    $el.delay(0).animate({ opacity: 1 }, 700, function() {

		      _this.done();
		    });
		  }
		});

		Barba.Pjax.getTransition = function() {

		  return FadeTransition;
		};

		var Homepage = Barba.BaseView.extend({
		  namespace: 'homepage',
		  onEnter: function() {
			  $('.project-trigger').removeClass('disappear').delay(1600);
			  $('.project-trigger').addClass('appear').delay(1600);
			  $('.about-link').addClass('inactive-link');
			  $('.project-link').removeClass('inactive-link');
			  $('.pagination__single').addClass('fadeInUp');
			  $('.pagination__single').removeClass('fadeOutDown');
			  $.fn.pagepiling.setAllowScrolling(true);
			  $.fn.pagepiling.setKeyboardScrolling(true);

		  },
		  onEnterCompleted: function() {
		  },
		  onLeave: function() {
		  },
		  onLeaveCompleted: function() {
		  }
		});

		Homepage.init();

		var Woodwork = Barba.BaseView.extend({
		  namespace: 'woodwork',
		  onEnter: function() {
			  $('.project-trigger').addClass('disappear').delay(1600);
			  $('.project-trigger').removeClass('appear').delay(1600);
			  $('.about-link').addClass('inactive-link');
			  $('.project-link').removeClass('inactive-link');
			  $.fn.pagepiling.setAllowScrolling(false);
			  $.fn.pagepiling.setKeyboardScrolling(false);
			  $.fn.pagepiling.moveTo(1);
			  $('.project h1 span').addClass('fadeOutDown');
			  $('.mask').addClass('animated fifth maskFade');
			  $('.mask').removeClass('maskReturn');
			  $('.mask--single').addClass('maskFade');
			  $('.mask--single').removeClass('maskReturn');
			  $('.project--thumb').addClass('animated fourth largerThumb');
			  $('.project--thumb').removeClass('smallerThumb');
			  $('.project--thumb__single').addClass('largerThumb');
			  $('.project--thumb__single').removeClass('smallerThumb');
			  $('.project--fade').addClass('animated fadeIn');
			  $('.project--title').addClass('show');
			  $('.project--title').removeClass('hidden');
			  $('.project--title h2 span').removeClass('fadeOutDown');
			  $('.pagination').addClass('fadeOutDown');
			  $('.pagination').removeClass('fadeInUp');
			  $('.pagination__single').removeClass('fadeInUp');
			  $('.pagination__single').addClass('fadeOutDown');
			  $('.project--title h2 span').addClass('fadeInUp');
		  },
		  onEnterCompleted: function() {
		  },
		  onLeave: function() {
			  $('.project-trigger').addClass('appear').delay(1600);
			  $('.project-trigger').removeClass('disappear').delay(1600);
			  $('.project--thumb__single').addClass('animated smallerThumb');
			  $('.project--thumb__single').removeClass('largerThumb');
			  $('.project--thumb').addClass('smallerThumb');
			  $('.project--thumb').removeClass('largerThumb');
			  $('.project--title h2 span').addClass('fadeOutDown');
			  $('.project--title h2 span').removeClass('fourth sixth fadeInUp');
			  $('.mask--single').addClass('animated maskReturn');
			  $('.mask--single').removeClass('maskFade');
			  $('.mask').addClass('animated maskReturn');
			  $('.mask').removeClass('maskFade');
			  $('.singleTitle span').addClass('fadeInUp');
			  $('.singleTitle span').removeClass('second third');
			  $('.project-trigger').removeClass('disappear hidden');
			  $('.project-trigger').addClass('appear');
			  $('.project h1 span').addClass('fifth fadeInUp show');
			  $('.project h1 span').removeClass('fadeOutDown hidden');
			  $('.pagination').addClass('fadeInUp');
			  $('.pagination').removeClass('fadeOutDown');
			  $('.pagination__single').removeClass('fadeInUp');
			  $('.pagination__single').addClass('fadeOutDown');
			  $('html, body').animate({ scrollTop: 0 }, '10s');
		  },
		  onLeaveCompleted: function() {
		  }
		});

		Woodwork.init();

		var Protest = Barba.BaseView.extend({
		  namespace: 'protest',
		  onEnter: function() {
			  $('.project-trigger').addClass('disappear').delay(1600);
			  $('.project-trigger').removeClass('appear').delay(1600);
			  $('.about-link').addClass('inactive-link');
			  $('.project-link').removeClass('inactive-link');
			  $.fn.pagepiling.setAllowScrolling(false);
			  $.fn.pagepiling.setKeyboardScrolling(false);
			  $.fn.pagepiling.moveTo(2);
			  $('.project h1 span').addClass('fadeOutDown');
			  $('.mask').addClass('animated fifth maskFade');
			  $('.mask').removeClass('maskReturn');
			  $('.mask--single').addClass('maskFade');
			  $('.mask--single').removeClass('maskReturn');
			  $('.project--thumb').addClass('animated fourth largerThumb');
			  $('.project--thumb').removeClass('smallerThumb');
			  $('.project--thumb__single').addClass('largerThumb');
			  $('.project--thumb__single').removeClass('smallerThumb');
			  $('.project--fade').addClass('animated fadeIn');
			  $('.project--title').addClass('show');
			  $('.project--title').removeClass('hidden');
			  $('.project--title h2 span').removeClass('fadeOutDown');
			  $('.pagination').addClass('fadeOutDown');
			  $('.pagination').removeClass('fadeInUp');
			  $('.pagination__single').removeClass('fadeInUp');
			  $('.pagination__single').addClass('fadeOutDown');
			  $('.project--title h2 span').addClass('fadeInUp');
		  },
		  onEnterCompleted: function() {
		  },
		  onLeave: function() {
			  $('.project-trigger').addClass('appear').delay(1600);
			  $('.project-trigger').removeClass('disappear').delay(1600);
			  $('.project--thumb__single').addClass('animated smallerThumb');
			  $('.project--thumb__single').removeClass('largerThumb');
			  $('.project--thumb').addClass('smallerThumb');
			  $('.project--thumb').removeClass('largerThumb');
			  $('.project--title h2 span').addClass('fadeOutDown');
			  $('.project--title h2 span').removeClass('fourth sixth fadeInUp');
			  $('.mask--single').addClass('animated maskReturn');
			  $('.mask--single').removeClass('maskFade');
			  $('.mask').addClass('animated maskReturn');
			  $('.mask').removeClass('maskFade');
			  $('.singleTitle span').addClass('fadeInUp');
			  $('.singleTitle span').removeClass('second third');
			  $('.project-trigger').removeClass('disappear hidden');
			  $('.project-trigger').addClass('appear');
			  $('.project h1 span').addClass('fifth fadeInUp show');
			  $('.project h1 span').removeClass('fadeOutDown hidden');
			  $('.pagination').addClass('fadeInUp');
			  $('.pagination').removeClass('fadeOutDown');
			  $('.pagination__single').removeClass('fadeInUp');
			  $('.pagination__single').addClass('fadeOutDown');
			  $('html, body').animate({ scrollTop: 0 }, 'slow');
		  },
		  onLeaveCompleted: function() {
		  }
		});

		Protest.init();

		var BPD = Barba.BaseView.extend({
		  namespace: 'bpd',
		  onEnter: function() {
			  $('.project-trigger').addClass('disappear').delay(1600);
			  $('.project-trigger').removeClass('appear').delay(1600);
			  $('.about-link').addClass('inactive-link');
			  $('.project-link').removeClass('inactive-link');
			  $.fn.pagepiling.setAllowScrolling(false);
			  $.fn.pagepiling.setKeyboardScrolling(false);
			  $.fn.pagepiling.moveTo(3);
			  $('.project h1 span').addClass('fadeOutDown');
			  $('.mask').addClass('animated fifth maskFade');
			  $('.mask').removeClass('maskReturn');
			  $('.mask--single').addClass('maskFade');
			  $('.mask--single').removeClass('maskReturn');
			  $('.project--thumb').addClass('animated fourth largerThumb');
			  $('.project--thumb').removeClass('smallerThumb');
			  $('.project--thumb__single').addClass('largerThumb');
			  $('.project--thumb__single').removeClass('smallerThumb');
			  $('.project--fade').addClass('animated fadeIn');
			  $('.project--title').addClass('show');
			  $('.project--title').removeClass('hidden');
			  $('.project--title h2 span').removeClass('fadeOutDown');
			  $('.pagination').addClass('fadeOutDown');
			  $('.pagination').removeClass('fadeInUp');
			  $('.pagination__single').removeClass('fadeInUp');
			  $('.pagination__single').addClass('fadeOutDown');
			  $('.project--title h2 span').addClass('fadeInUp');
		  },
		  onEnterCompleted: function() {
		  },
		  onLeave: function() {
			  $('.project-trigger').addClass('appear').delay(1600);
			  $('.project-trigger').removeClass('disappear').delay(1600);
			  $('.project--thumb__single').addClass('animated smallerThumb');
			  $('.project--thumb__single').removeClass('largerThumb');
			  $('.project--thumb').addClass('smallerThumb');
			  $('.project--thumb').removeClass('largerThumb');
			  $('.project--title h2 span').addClass('fadeOutDown');
			  $('.project--title h2 span').removeClass('fourth sixth fadeInUp');
			  $('.mask--single').addClass('animated maskReturn');
			  $('.mask--single').removeClass('maskFade');
			  $('.mask').addClass('animated maskReturn');
			  $('.mask').removeClass('maskFade');
			  $('.singleTitle span').addClass('fadeInUp');
			  $('.singleTitle span').removeClass('second third');
			  $('.project-trigger').removeClass('disappear hidden');
			  $('.project-trigger').addClass('appear');
			  $('.project h1 span').addClass('fifth fadeInUp show');
			  $('.project h1 span').removeClass('fadeOutDown hidden');
			  $('.pagination').addClass('fadeInUp');
			  $('.pagination').removeClass('fadeOutDown');
			  $('.pagination__single').removeClass('fadeInUp');
			  $('.pagination__single').addClass('fadeOutDown');
			  $('html, body').animate({ scrollTop: 0 }, 'slow');
		  },
		  onLeaveCompleted: function() {
		  }
		});

		BPD.init();

		var Alberta = Barba.BaseView.extend({
		  namespace: 'alberta',
		  onEnter: function() {
			  $('.project-trigger').addClass('disappear').delay(1600);
			  $('.project-trigger').removeClass('appear').delay(1600);
			  $('.about-link').addClass('inactive-link');
			  $('.project-link').removeClass('inactive-link');
			  $.fn.pagepiling.setAllowScrolling(false);
			  $.fn.pagepiling.setKeyboardScrolling(false);
			  $.fn.pagepiling.moveTo(4);
			  $('.project h1 span').addClass('fadeOutDown');
			  $('.mask').addClass('animated fifth maskFade');
			  $('.mask').removeClass('maskReturn');
			  $('.mask--single').addClass('maskFade');
			  $('.mask--single').removeClass('maskReturn');
			  $('.project--thumb').addClass('animated fourth largerThumb');
			  $('.project--thumb').removeClass('smallerThumb');
			  $('.project--thumb__single').addClass('largerThumb');
			  $('.project--thumb__single').removeClass('smallerThumb');
			  $('.project--fade').addClass('animated fadeIn');
			  $('.project--title').addClass('show');
			  $('.project--title').removeClass('hidden');
			  $('.project--title h2 span').removeClass('fadeOutDown');
			  $('.pagination').addClass('fadeOutDown');
			  $('.pagination').removeClass('fadeInUp');
			  $('.pagination__single').removeClass('fadeInUp');
			  $('.pagination__single').addClass('fadeOutDown');
			  $('.project--title h2 span').addClass('fadeInUp');
		  },
		  onEnterCompleted: function() {
		  },
		  onLeave: function() {
			  $('.project-trigger').addClass('appear').delay(1600);
			  $('.project-trigger').removeClass('disappear').delay(1600);
			  $('.project--thumb__single').addClass('animated smallerThumb');
			  $('.project--thumb__single').removeClass('largerThumb');
			  $('.project--thumb').addClass('smallerThumb');
			  $('.project--thumb').removeClass('largerThumb');
			  $('.project--title h2 span').addClass('fadeOutDown');
			  $('.project--title h2 span').removeClass('fourth sixth fadeInUp');
			  $('.mask--single').addClass('animated maskReturn');
			  $('.mask--single').removeClass('maskFade');
			  $('.mask').addClass('animated maskReturn');
			  $('.mask').removeClass('maskFade');
			  $('.singleTitle span').addClass('fadeInUp');
			  $('.singleTitle span').removeClass('second third');
			  $('.project-trigger').removeClass('disappear hidden');
			  $('.project-trigger').addClass('appear');
			  $('.project h1 span').addClass('fifth fadeInUp show');
			  $('.project h1 span').removeClass('fadeOutDown hidden');
			  $('.pagination').addClass('fadeInUp');
			  $('.pagination').removeClass('fadeOutDown');
			  $('.pagination__single').removeClass('fadeInUp');
			  $('.pagination__single').addClass('fadeOutDown');
			  $('html, body').animate({ scrollTop: 0 }, 'slow');
		  },
		  onLeaveCompleted: function() {
		  }
		});

		Alberta.init();

		var Diversity = Barba.BaseView.extend({
		  namespace: 'diversity',
		  onEnter: function() {
			  $('.project-trigger').addClass('disappear').delay(1600);
			  $('.project-trigger').removeClass('appear').delay(1600);
			  $('.about-link').addClass('inactive-link');
			  $('.project-link').removeClass('inactive-link');
			  $.fn.pagepiling.setAllowScrolling(false);
			  $.fn.pagepiling.setKeyboardScrolling(false);
			  $.fn.pagepiling.moveTo(5);
			  $('.project h1 span').addClass('fadeOutDown');
			  $('.mask').addClass('animated fifth maskFade');
			  $('.mask').removeClass('maskReturn');
			  $('.mask--single').addClass('maskFade');
			  $('.mask--single').removeClass('maskReturn');
			  $('.project--thumb').addClass('animated fourth largerThumb');
			  $('.project--thumb').removeClass('smallerThumb');
			  $('.project--thumb__single').addClass('largerThumb');
			  $('.project--thumb__single').removeClass('smallerThumb');
			  $('.project--fade').addClass('animated fadeIn');
			  $('.project--title').addClass('show');
			  $('.project--title').removeClass('hidden');
			  $('.project--title h2 span').removeClass('fadeOutDown');
			  $('.pagination').addClass('fadeOutDown');
			  $('.pagination').removeClass('fadeInUp');
			  $('.pagination__single').removeClass('fadeInUp');
			  $('.pagination__single').addClass('fadeOutDown');
			  $('.project--title h2 span').addClass('fadeInUp');
		  },
		  onEnterCompleted: function() {
		  },
		  onLeave: function() {
			  $('.project-trigger').addClass('appear').delay(1600);
			  $('.project-trigger').removeClass('disappear').delay(1600);
			  $('.project--thumb__single').addClass('animated smallerThumb');
			  $('.project--thumb__single').removeClass('largerThumb');
			  $('.project--thumb').addClass('smallerThumb');
			  $('.project--thumb').removeClass('largerThumb');
			  $('.project--title h2 span').addClass('fadeOutDown');
			  $('.project--title h2 span').removeClass('fourth sixth fadeInUp');
			  $('.mask--single').addClass('animated maskReturn');
			  $('.mask--single').removeClass('maskFade');
			  $('.mask').addClass('animated maskReturn');
			  $('.mask').removeClass('maskFade');
			  $('.singleTitle span').addClass('fadeInUp');
			  $('.singleTitle span').removeClass('second third');
			  $('.project-trigger').removeClass('disappear hidden');
			  $('.project-trigger').addClass('appear');
			  $('.project h1 span').addClass('fifth fadeInUp show');
			  $('.project h1 span').removeClass('fadeOutDown hidden');
			  $('.pagination').addClass('fadeInUp');
			  $('.pagination').removeClass('fadeOutDown');
			  $('.pagination__single').removeClass('fadeInUp');
			  $('.pagination__single').addClass('fadeOutDown');
			  $('html, body').animate({ scrollTop: 0 }, 'slow');
		  },
		  onLeaveCompleted: function() {
		  }
		});

		Diversity.init();

		var About = Barba.BaseView.extend({
		  namespace: 'about',
		  onEnter: function() {
			  $('.about-link').removeClass('inactive-link');
			  $('.project-link').addClass('inactive-link');
			  $.fn.pagepiling.setAllowScrolling(false);
			  $.fn.pagepiling.setKeyboardScrolling(false);
			  $('.pagepiling').addClass('fadeOut');
			  $('.pagepiling').removeClass('fadeIn');
		  },
		  onEnterCompleted: function() {
			  $('.about--container__header h1').addClass('fadeInUp');
			  $('.about--container__header h1').removeClass('fadeOut');
		  },
		  onLeave: function() {
			  $('.pagepiling').removeClass('fadeOut');
			  $('.pagepiling').addClass('sixth fadeIn');
			  $('.about--container').removeClass('fourth fadeIn');
			  $('.about--container').addClass('fadeOut');
			  $('html, body').animate({ scrollTop: 0 }, 'slow');
			  $('.about--container__header h1').removeClass('fadeInUp');
			  $('.about--container__header h1').addClass('fadeOut');
		  },
		  onLeaveCompleted: function() {
		  }
		});

		About.init();

	});
});
