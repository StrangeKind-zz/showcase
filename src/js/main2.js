var hamburger = document.querySelector(".hamburger");
	hamburger.addEventListener("click", function() {
	hamburger.classList.toggle("is-active");
});


$(function() {

	Barba.Pjax.start();

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
	  },
	  onEnterCompleted: function() {
	      // The Transition has just finished.
		  console.log('entercompleted');
	  },
	  onLeave: function() {
	      // A new Transition toward a new page has just started.
		  console.log('leave');
		  $('.project h1 span').addClass('fadeOutDown');
		  $('.mask').addClass('animated fifth maskFade');
		  $('.project--thumb').addClass('animated fourth largerThumb');
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
	  },
	  onEnterCompleted: function() {
	      // The Transition has just finished.
	  },
	  onLeave: function() {
	      // A new Transition toward a new page has just started.
		  console.log('bye project');
		  $('.project--thumb__single').addClass('animated smallerThumb');
		  $('.project--title h2 span').addClass('fadeOutDown');
		  $('.project--title h2 span').removeClass('sixteenth seventeenth fadeInDown');
		  $('.mask--single').addClass('animated maskReturn');
		  $('.singleTitle span').addClass('fadeInUp');
		  $('.singleTitle span').removeClass('second third');
		  $('.project-trigger').removeClass('disappear');
		  $('.project-trigger').addClass('appear');
	  },
	  onLeaveCompleted: function() {
	      // The Container has just been removed from the DOM.
	  }
	});

	// Don't forget to init the view!
	Project.init();

});
