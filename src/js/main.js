var hamburger = document.querySelector(".hamburger");
	hamburger.addEventListener("click", function() {
	hamburger.classList.toggle("is-active");
});

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

		if (Barba.HistoryManager.currentStatus().namespace === "project") {
			$.fn.pagepiling.setAllowScrolling(false);
			$.fn.pagepiling.setKeyboardScrolling(false);
			$(window).enllax();
		  }
		var FadeTransition = Barba.BaseTransition.extend({
		  start: function() {
		    /**
		     * This function is automatically called as soon the Transition starts
		     * this.newContainerLoading is a Promise for the loading of the new container
		     * (Barba.js also comes with an handy Promise polyfill!)
		     */

		    // As soon the loading is finished and the old page is faded out, let's fade the new page
		    Promise
		      .all([this.newContainerLoading, this.fadeOut()])
		      .then(this.fadeIn.bind(this));
		  },

		  fadeOut: function() {
		    /**
		     * this.oldContainer is the HTMLElement of the old Container
		     */

		    return $(this.oldContainer).delay(1600).animate({ opacity: 0 }, 0).promise();
		  },

		  fadeIn: function() {
		    /**
		     * this.newContainer is the HTMLElement of the new Container
		     * At this stage newContainer is on the DOM (inside our #barba-container and with visibility: hidden)
		     * Please note, newContainer is available just after newContainerLoading is resolved!
		     */

		    var _this = this;
		    var $el = $(this.newContainer);




		    $(this.oldContainer).hide().delay(4000);

		    $el.css({
		      visibility : 'visible',
		      opacity : 0
		    });

		    $el.delay(0).animate({ opacity: 1 }, 0, function() {
		      /**
		       * Do not forget to call .done() as soon your transition is finished!
		       * .done() will automatically remove from the DOM the old Container
		       */

		      _this.done();
		    });
		  }
		});

		/**
		 * Next step, you have to tell Barba to use the new Transition
		 */

		Barba.Pjax.getTransition = function() {
		  /**
		   * Here you can use your own logic!
		   * For example you can use different Transition based on the current page or link...
		   */

		  return FadeTransition;
		};

		var Homepage = Barba.BaseView.extend({
		  namespace: 'homepage',
		  onEnter: function() {
		      // The new Container is ready and attached to the DOM.
			  console.log('enter');
			  $('.project-trigger').removeClass('disappear').delay(1600);
			  $('.project-trigger').addClass('appear').delay(1600);

		  },
		  onEnterCompleted: function() {
		      // The Transition has just finished.
			  console.log('entercompleted');
		  },
		  onLeave: function() {
		      // A new Transition toward a new page has just started.
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
			  $('.project--title h2 span').addClass('fadeInUp');
			  $.fn.pagepiling.setAllowScrolling(false);
			  $.fn.pagepiling.setKeyboardScrolling(false);
		  },
		  onLeaveCompleted: function() {
		      // The Container has just been removed from the DOM.
			  console.log('leavecomplete');
		  }
		});

		// Don't forget to init the view!
		Homepage.init();

		var Project = Barba.BaseView.extend({
		  namespace: 'project',
		  onEnter: function() {
		      // The new Container is ready and attached to the DOM.
			  $('.project-trigger').addClass('disappear').delay(1600);
			  $('.project-trigger').removeClass('appear').delay(1600);
			  console.log('hi project');
			  $(window).enllax();
		  },
		  onEnterCompleted: function() {
		      // The Transition has just finished.
			  console.log('hi project');
		  },
		  onLeave: function() {
		      // A new Transition toward a new page has just started.
			  console.log('bye project');
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
			  $.fn.pagepiling.setAllowScrolling(true);
			  $.fn.pagepiling.setKeyboardScrolling(true);
			  $('html, body').animate({ scrollTop: 0 }, 'slow');
		  },
		  onLeaveCompleted: function() {
		      // The Container has just been removed from the DOM.
		  }
		});

		// Don't forget to init the view!
		Project.init();

	});
});
