jQuery.noConflict();
	
var emailEntered;

	
jQuery(document).ready(function() {	
	
	jQuery('.tooltip-link').tooltip({
		placement: "top"  
	});
	
	// initialise superfish
	jQuery(function(){
		jQuery('ul.sf-menu').superfish({
		delay:       200,                            
		speed:       'normal', 
		autoArrows:  false,                          
		dropShadows: false    				
		});
	});
	
	// menu unload fix(superfish)
	jQuery(window).unload(function(){
		jQuery('ul.sf-menu li.current').hideSuperfishUl();
	});

	// responsive menu	
	selectnav('rmenu-id', {
	  label: ' - Browse - ',
	  nested: true,
	  indent: '-'
	});	

	
	//twitter bar
	jQuery(function( ){
	  jQuery("#tweetbar").tweet({
		join_text: "auto",
		username: "goldenwork",
		count: 1,
		auto_join_text_default: "",
		auto_join_text_ed: "",
		auto_join_text_ing: "",
		auto_join_text_reply: "",
		auto_join_text_url: "",
		loading_text: "loading tweets...",
		template: "{join}{text}"		
	  });
	});	
		
			
	/* portfolio 2 hover effect */
	jQuery('.portfolio2-list li').mouseenter(function(e) {
		jQuery(this).find('.portframe').stop(true, true).fadeTo(300, 1);
		
	}).mouseleave(function(e) {
		jQuery(this).find('.portframe').stop(true, true).fadeTo(300, 0);
		
	});		
				
	/* entire block clickable for service block */	
	jQuery(".service-box").click(function(){
    	window.location=jQuery(this).find("a").attr("href");
		return false;
	});
	


	/* newsletter script */
	jQuery("#newslettersubmit").click(function() {
			jQuery(".error").hide();
			var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
			var emailaddressVal = jQuery("#email-address").val();
			
			if(emailaddressVal == 'Enter your email address') { 
				emailaddressVal = ''; 
			}
			
			//alert(emailaddressVal);
			
			if(emailaddressVal == '') {
				jQuery(".newsletter-message").html('<div class="newsletter-note n-err fade in"><button type="button" class="close" data-dismiss="alert">&times;</button>Please enter an email address before submitting.</div>');
				return false; 
			}
			else if(!emailReg.test(emailaddressVal)) {
				jQuery(".newsletter-message").html('<div class="newsletter-note n-err fade in"><button type="button" class="close" data-dismiss="alert">&times;</button>Please enter a valid email address.</div>');
				return false; 
			} 
			else {
				emailEntered = escape(jQuery('#email-address').val());
			}

	});
	
	jQuery('#newsletterform').submit(function() {
		jQuery(".newsletter-message").html('<div class="newsletter-note n-conf fade in"><button type="button" class="close" data-dismiss="alert">&times;</button>Adding your email address...</div>');
		jQuery.ajax({
			url: 'includes/store-address.php', // proper url to your "store-address.php" file
			data: 'ajax=true&email=' + emailEntered,
			success: function() {
				jQuery('.newsletter-message').html('<div class="newsletter-note n-conf fade in"><button type="button" class="close" data-dismiss="alert">&times;</button>Congratulations! Check your email for confirmation of your subscription.</div>');
			}
		});
		return false;
	});
	
	
	// nivo zoom
	jQuery('body').nivoZoom();
	
	
	//pretty photo
	jQuery("a[data-gal^='prettyPhoto']").prettyPhoto({	
		social_tools: false,
		overlay_gallery: false,
		deeplinking: false,
		slideshow:3000,
		animation_speed:'fast',
		show_title: false
	});	
			
		
});/* end of document ready */


/*
 * Superfish v1.5.8 - jQuery menu widget
 * Copyright (c) 2013 Joel Birch
 *
 * Dual licensed under the MIT and GPL licenses:
 * 	http://www.opensource.org/licenses/mit-license.php
 * 	http://www.gnu.org/licenses/gpl.html
 *
 */

;(function($){
	$.fn.superfish = function(op){

		var sf = $.fn.superfish,
			c = sf.c,
			$arrow = $('<span class="'+c.arrowClass+'"> &#187;</span>'),
			over = function(e){
				var $$ = $(this), menu = getMenu($$);
				clearTimeout(menu.sfTimer);
				$$.showSuperfishUl().siblings().hideSuperfishUl();
			},
			out = function(e){
				var $$ = $(this), menu = getMenu($$), o = sf.op;
				var close = function(){
					o.retainPath=($.inArray($$[0],o.$path)>-1);
					$$.hideSuperfishUl();
					if (o.$path.length && $$.parents('li.'+o.hoverClass).length<1){
						o.onIdle.call();
						$.proxy(over,o.$path,e)();
					}
				};
				if (e.type !== 'mouseleave' && e.type !== 'focusout'){
					close();
				} else {
					clearTimeout(menu.sfTimer);
					menu.sfTimer=setTimeout(close,o.delay);
				}
			},
			getMenu = function($child){
				if ($child.hasClass(c.menuClass)){
					$.error('Superfish requires you to update to a version of hoverIntent that supports event-delegation, such as this one: https://github.com/joeldbirch/onHoverIntent');
				}
				var menu = $child.closest('.'+c.menuClass)[0];
				sf.op = sf.o[menu.serial];
				return menu;
			},
			applyHandlers = function($menu){
				var targets = 'li:has(ul)';
				if (!sf.op.useClick){
					if ($.fn.hoverIntent && !sf.op.disableHI){
						$menu.hoverIntent(over, out, targets);
					} else {
						$menu
							.on('mouseenter', targets, over)
							.on('mouseleave', targets, out);
					}
				}
				$menu
					.on('focusin', targets, over)
					.on('focusout', targets, out)
					.on('click', 'a', clickHandler)
					.on('touchstart', 'a', touchHandler);
			},
			touchHandler = function(){
				var $$ = $(this);
				if (!$$.next('ul').is(':visible')){
					$(this).data('follow', false);
				}
			},
			clickHandler = function(e){
				var $a = $(this),
						$submenu = $a.next('ul'),
						follow = ($a.data('follow') === false) ? false : true;

				if ( $submenu.length && (sf.op.useClick || !follow) ){
					e.preventDefault();
					if (!$submenu.is(':visible')){
						$.proxy(over,$a.parent(),e)();
					} else if (sf.op.useClick && follow) {
						$.proxy(out,$a.parent(),e)();
					}
				}
			},
			addArrows = function($li,o){
				if (o.autoArrows) {
					$li.children('a').each(function() {
						addArrow( $(this) );
					});
				}
			},
			addArrow = function($a){ $a.addClass(c.anchorClass).append($arrow.clone()); };
			
		return this.addClass(c.menuClass).each(function() {
			var s = this.serial = sf.o.length;
			var o = $.extend({},sf.defaults,op);
			var $$ = $(this);
			var $liHasUl = $$.find('li:has(ul)');
			o.$path = $$.find('li.'+o.pathClass).slice(0,o.pathLevels).each(function(){
				$(this).addClass(o.hoverClass+' '+c.bcClass)
					.filter('li:has(ul)').removeClass(o.pathClass);
			});
			sf.o[s] = sf.op = o;
			
			addArrows($liHasUl,o);
			applyHandlers($$);

			$liHasUl.not('.'+c.bcClass).hideSuperfishUl();
			
			o.onInit.call(this);
			
		});
	};

	var sf = $.fn.superfish;
	sf.o = [];
	sf.op = {};

	sf.c = {
		bcClass     : 'sf-breadcrumb',
		menuClass   : 'sf-js-enabled',
		anchorClass : 'sf-with-ul',
		arrowClass  : 'sf-sub-indicator'
	};
	sf.defaults = {
		hoverClass	: 'sfHover',
		pathClass	: 'overideThisToUse',
		pathLevels	: 1,
		delay		: 800,
		animation	: {opacity:'show'},
		animationOut: {opacity:'hide'},
		speed		: 'normal',
		speedOut : 'fast',
		autoArrows	: true,
		disableHI	: false,		// true disables hoverIntent detection
		useClick : false,
		onInit		: function(){}, // callback functions
		onBeforeShow: function(){},
		onShow		: function(){},
		onHide		: function(){},
		onIdle		: function(){}
	};
	$.fn.extend({
		hideSuperfishUl : function(){
			var o = sf.op,
				$$ = this,
				not = (o.retainPath===true) ? o.$path : '';
			o.retainPath = false;
			var $ul = $('li.'+o.hoverClass,this).add(this).not(not)
					.find('>ul').stop().animate(o.animationOut,o.speedOut,function(){
						$ul = $(this);
						$ul.parent().removeClass(o.hoverClass);
						o.onHide.call($ul);
						if (sf.op.useClick){
							$$.children('a').data('follow', false);
						}
					});
			return this;
		},
		showSuperfishUl : function(){
			var o = sf.op,
				$$ = this,
				$ul = this.addClass(o.hoverClass)
					.find('>ul:hidden');
			o.onBeforeShow.call($ul);
			$ul.stop().animate(o.animation,o.speed,function(){
				o.onShow.call($ul);
				$$.children('a').data('follow', true);
			});
			return this;
		}
	});

})(jQuery);



/*
 SelectNav.js (v. 0.1)
 Converts your <ul>/<ol> navigation into a dropdown list for small screens
 https://github.com/lukaszfiszer/selectnav.js
*/
window.selectnav=function(){return function(p,q){var a,h=function(b){var c;b||(b=window.event);b.target?c=b.target:b.srcElement&&(c=b.srcElement);3===c.nodeType&&(c=c.parentNode);c.value&&(window.location.href=c.value)},k=function(b){b=b.nodeName.toLowerCase();return"ul"===b||"ol"===b},l=function(b){for(var c=1;document.getElementById("selectnav"+c);c++);return b?"selectnav"+c:"selectnav"+(c-1)},n=function(b){g++;var c=b.children.length,a="",d="",f=g-1;if(c){if(f){for(;f--;)d+=r;d+=" "}for(f=0;f<
c;f++){var e=b.children[f].children[0];if("undefined"!==typeof e){var h=e.innerText||e.textContent,i="";j&&(i=-1!==e.className.search(j)||-1!==e.parentElement.className.search(j)?m:"");s&&!i&&(i=e.href===document.URL?m:"");a+='<option value="'+e.href+'" '+i+">"+d+h+"</option>";t&&(e=b.children[f].children[1])&&k(e)&&(a+=n(e))}}1===g&&o&&(a='<option value="">'+o+"</option>"+a);1===g&&(a='<select class="selectnav" id="'+l(!0)+'">'+a+"</select>");g--;return a}};if((a=document.getElementById(p))&&k(a)){document.documentElement.className+=
" js";var d=q||{},j=d.activeclass||"active",s="boolean"===typeof d.autoselect?d.autoselect:!0,t="boolean"===typeof d.nested?d.nested:!0,r=d.indent||"\u2192",o=d.label||"- Navigation -",g=0,m=" selected ";a.insertAdjacentHTML("afterend",n(a));a=document.getElementById(l());a.addEventListener&&a.addEventListener("change",h);a.attachEvent&&a.attachEvent("onchange",h)}}}();



/*
 * jQuery Easing v1.3 - http://gsgd.co.uk/sandbox/jquery/easing/
 *
 * Uses the built in easing capabilities added In jQuery 1.1
 * to offer multiple easing options
 *
 * TERMS OF USE - jQuery Easing
 * 
 * Open source under the BSD License. 
 * 
 * Copyright Â© 2008 George McGinley Smith
 * All rights reserved.
 * 
 * Redistribution and use in source and binary forms, with or without modification, 
 * are permitted provided that the following conditions are met:
 * 
 * Redistributions of source code must retain the above copyright notice, this list of 
 * conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright notice, this list 
 * of conditions and the following disclaimer in the documentation and/or other materials 
 * provided with the distribution.
 * 
 * Neither the name of the author nor the names of contributors may be used to endorse 
 * or promote products derived from this software without specific prior written permission.
 * 
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY 
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
 *  COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
 *  EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE
 *  GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED 
 * AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 *  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED 
 * OF THE POSSIBILITY OF SUCH DAMAGE. 
 *
*/

// t: current time, b: begInnIng value, c: change In value, d: duration
jQuery.easing['jswing'] = jQuery.easing['swing'];

jQuery.extend( jQuery.easing,
{
	def: 'easeOutQuad',
	swing: function (x, t, b, c, d) {
		//alert(jQuery.easing.default);
		return jQuery.easing[jQuery.easing.def](x, t, b, c, d);
	},
	easeInQuad: function (x, t, b, c, d) {
		return c*(t/=d)*t + b;
	},
	easeOutQuad: function (x, t, b, c, d) {
		return -c *(t/=d)*(t-2) + b;
	},
	easeInOutQuad: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t + b;
		return -c/2 * ((--t)*(t-2) - 1) + b;
	},
	easeInCubic: function (x, t, b, c, d) {
		return c*(t/=d)*t*t + b;
	},
	easeOutCubic: function (x, t, b, c, d) {
		return c*((t=t/d-1)*t*t + 1) + b;
	},
	easeInOutCubic: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t*t + b;
		return c/2*((t-=2)*t*t + 2) + b;
	},
	easeInQuart: function (x, t, b, c, d) {
		return c*(t/=d)*t*t*t + b;
	},
	easeOutQuart: function (x, t, b, c, d) {
		return -c * ((t=t/d-1)*t*t*t - 1) + b;
	},
	easeInOutQuart: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t*t*t + b;
		return -c/2 * ((t-=2)*t*t*t - 2) + b;
	},
	easeInQuint: function (x, t, b, c, d) {
		return c*(t/=d)*t*t*t*t + b;
	},
	easeOutQuint: function (x, t, b, c, d) {
		return c*((t=t/d-1)*t*t*t*t + 1) + b;
	},
	easeInOutQuint: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t*t*t*t + b;
		return c/2*((t-=2)*t*t*t*t + 2) + b;
	},
	easeInSine: function (x, t, b, c, d) {
		return -c * Math.cos(t/d * (Math.PI/2)) + c + b;
	},
	easeOutSine: function (x, t, b, c, d) {
		return c * Math.sin(t/d * (Math.PI/2)) + b;
	},
	easeInOutSine: function (x, t, b, c, d) {
		return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b;
	},
	easeInExpo: function (x, t, b, c, d) {
		return (t==0) ? b : c * Math.pow(2, 10 * (t/d - 1)) + b;
	},
	easeOutExpo: function (x, t, b, c, d) {
		return (t==d) ? b+c : c * (-Math.pow(2, -10 * t/d) + 1) + b;
	},
	easeInOutExpo: function (x, t, b, c, d) {
		if (t==0) return b;
		if (t==d) return b+c;
		if ((t/=d/2) < 1) return c/2 * Math.pow(2, 10 * (t - 1)) + b;
		return c/2 * (-Math.pow(2, -10 * --t) + 2) + b;
	},
	easeInCirc: function (x, t, b, c, d) {
		return -c * (Math.sqrt(1 - (t/=d)*t) - 1) + b;
	},
	easeOutCirc: function (x, t, b, c, d) {
		return c * Math.sqrt(1 - (t=t/d-1)*t) + b;
	},
	easeInOutCirc: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return -c/2 * (Math.sqrt(1 - t*t) - 1) + b;
		return c/2 * (Math.sqrt(1 - (t-=2)*t) + 1) + b;
	},
	easeInElastic: function (x, t, b, c, d) {
		var s=1.70158;var p=0;var a=c;
		if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
		if (a < Math.abs(c)) { a=c; var s=p/4; }
		else var s = p/(2*Math.PI) * Math.asin (c/a);
		return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
	},
	easeOutElastic: function (x, t, b, c, d) {
		var s=1.70158;var p=0;var a=c;
		if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
		if (a < Math.abs(c)) { a=c; var s=p/4; }
		else var s = p/(2*Math.PI) * Math.asin (c/a);
		return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;
	},
	easeInOutElastic: function (x, t, b, c, d) {
		var s=1.70158;var p=0;var a=c;
		if (t==0) return b;  if ((t/=d/2)==2) return b+c;  if (!p) p=d*(.3*1.5);
		if (a < Math.abs(c)) { a=c; var s=p/4; }
		else var s = p/(2*Math.PI) * Math.asin (c/a);
		if (t < 1) return -.5*(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
		return a*Math.pow(2,-10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )*.5 + c + b;
	},
	easeInBack: function (x, t, b, c, d, s) {
		if (s == undefined) s = 1.70158;
		return c*(t/=d)*t*((s+1)*t - s) + b;
	},
	easeOutBack: function (x, t, b, c, d, s) {
		if (s == undefined) s = 1.70158;
		return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
	},
	easeInOutBack: function (x, t, b, c, d, s) {
		if (s == undefined) s = 1.70158; 
		if ((t/=d/2) < 1) return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
		return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
	},
	easeInBounce: function (x, t, b, c, d) {
		return c - jQuery.easing.easeOutBounce (x, d-t, 0, c, d) + b;
	},
	easeOutBounce: function (x, t, b, c, d) {
		if ((t/=d) < (1/2.75)) {
			return c*(7.5625*t*t) + b;
		} else if (t < (2/2.75)) {
			return c*(7.5625*(t-=(1.5/2.75))*t + .75) + b;
		} else if (t < (2.5/2.75)) {
			return c*(7.5625*(t-=(2.25/2.75))*t + .9375) + b;
		} else {
			return c*(7.5625*(t-=(2.625/2.75))*t + .984375) + b;
		}
	},
	easeInOutBounce: function (x, t, b, c, d) {
		if (t < d/2) return jQuery.easing.easeInBounce (x, t*2, 0, c, d) * .5 + b;
		return jQuery.easing.easeOutBounce (x, t*2-d, 0, c, d) * .5 + c*.5 + b;
	}
});

/*
 *
 * TERMS OF USE - EASING EQUATIONS
 * 
 * Open source under the BSD License. 
 * 
 * Copyright Â© 2001 Robert Penner
 * All rights reserved.
 * 
 * Redistribution and use in source and binary forms, with or without modification, 
 * are permitted provided that the following conditions are met:
 * 
 * Redistributions of source code must retain the above copyright notice, this list of 
 * conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright notice, this list 
 * of conditions and the following disclaimer in the documentation and/or other materials 
 * provided with the distribution.
 * 
 * Neither the name of the author nor the names of contributors may be used to endorse 
 * or promote products derived from this software without specific prior written permission.
 * 
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY 
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
 *  COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
 *  EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE
 *  GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED 
 * AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 *  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED 
 * OF THE POSSIBILITY OF SUCH DAMAGE. 
 *
 */




// jquery.tweet.js - See http://tweet.seaofclouds.com/ or https://github.com/seaofclouds/tweet for more info
// Copyright (c) 2008-2011 Todd Matthews & Steve Purcell
(function($) {
  $.fn.tweet = function(o){
    var s = $.extend({
      username: null,                           // [string or array] required unless using the 'query' option; one or more twitter screen names (use 'list' option for multiple names, where possible)
      list: null,                               // [string]   optional name of list belonging to username
      favorites: false,                         // [boolean]  display the user's favorites instead of his tweets
      query: null,                              // [string]   optional search query (see also: http://search.twitter.com/operators)
      avatar_size: null,                        // [integer]  height and width of avatar if displayed (48px max)
      count: 3,                                 // [integer]  how many tweets to display?
      fetch: null,                              // [integer]  how many tweets to fetch via the API (set this higher than 'count' if using the 'filter' option)
      page: 1,                                  // [integer]  which page of results to fetch (if count != fetch, you'll get unexpected results)
      retweets: true,                           // [boolean]  whether to fetch (official) retweets (not supported in all display modes)
      intro_text: null,                         // [string]   do you want text BEFORE your your tweets?
      outro_text: null,                         // [string]   do you want text AFTER your tweets?
      join_text:  null,                         // [string]   optional text in between date and tweet, try setting to "auto"
      auto_join_text_default: "i said,",        // [string]   auto text for non verb: "i said" bullocks
      auto_join_text_ed: "i",                   // [string]   auto text for past tense: "i" surfed
      auto_join_text_ing: "i am",               // [string]   auto tense for present tense: "i was" surfing
      auto_join_text_reply: "i replied to",     // [string]   auto tense for replies: "i replied to" @someone "with"
      auto_join_text_url: "i was looking at",   // [string]   auto tense for urls: "i was looking at" http:...
      loading_text: null,                       // [string]   optional loading text, displayed while tweets load
      refresh_interval: null ,                  // [integer]  optional number of seconds after which to reload tweets
      twitter_url: "twitter.com",               // [string]   custom twitter url, if any (apigee, etc.)
      twitter_api_url: "api.twitter.com",       // [string]   custom twitter api url, if any (apigee, etc.)
      twitter_search_url: "search.twitter.com", // [string]   custom twitter search url, if any (apigee, etc.)
      template: "{avatar}{time}{join}{text}",   // [string or function] template used to construct each tweet <li> - see code for available vars
      comparator: function(tweet1, tweet2) {    // [function] comparator used to sort tweets (see Array.sort)
        return tweet2["tweet_time"] - tweet1["tweet_time"];
      },
      filter: function(tweet) {                 // [function] whether or not to include a particular tweet (be sure to also set 'fetch')
        return true;
      }
    }, o);

    // See http://daringfireball.net/2010/07/improved_regex_for_matching_urls
    var url_regexp = /\b((?:[a-z][\w-]+:(?:\/{1,3}|[a-z0-9%])|www\d{0,3}[.]|[a-z0-9.\-]+[.][a-z]{2,4}\/)(?:[^\s()<>]+|\(([^\s()<>]+|(\([^\s()<>]+\)))*\))+(?:\(([^\s()<>]+|(\([^\s()<>]+\)))*\)|[^\s`!()\[\]{};:'".,<>?«»""'']))/gi;

    // Expand values inside simple string templates with {placeholders}
    function t(template, info) {
      if (typeof template === "string") {
        var result = template;
        for(var key in info) {
          var val = info[key];
          result = result.replace(new RegExp('{'+key+'}','g'), val === null ? '' : val);
        }
        return result;
      } else return template(info);
    }
    // Export the t function for use when passing a function as the 'template' option
    $.extend({tweet: {t: t}});

    function replacer (regex, replacement) {
      return function() {
        var returning = [];
        this.each(function() {
          returning.push(this.replace(regex, replacement));
        });
        return $(returning);
      };
    }

    $.fn.extend({
      linkUrl: replacer(url_regexp, function(match) {
        var url = (/^[a-z]+:/i).test(match) ? match : "http://"+match;
        return "<a href=\""+url+"\">"+match+"</a>";
      }),
      linkUser: replacer(/@(\w+)/gi, "@<a href=\"http://"+s.twitter_url+"/$1\">$1</a>"),
      // Support various latin1 (\u00**) and arabic (\u06**) alphanumeric chars
      linkHash: replacer(/(?:^| )[\#]+([\w\u00c0-\u00d6\u00d8-\u00f6\u00f8-\u00ff\u0600-\u06ff]+)/gi,
                         ' <a href="http://'+s.twitter_search_url+'/search?q=&tag=$1&lang=all'+((s.username && s.username.length == 1 && !s.list) ? '&from='+s.username.join("%2BOR%2B") : '')+'">#$1</a>'),
      capAwesome: replacer(/\b(awesome)\b/gi, '<span class="awesome">$1</span>'),
      capEpic: replacer(/\b(epic)\b/gi, '<span class="epic">$1</span>'),
      makeHeart: replacer(/(&lt;)+[3]/gi, "<tt class='heart'>&#x2665;</tt>")
    });

    function parse_date(date_str) {
      // The non-search twitter APIs return inconsistently-formatted dates, which Date.parse
      // cannot handle in IE. We therefore perform the following transformation:
      // "Wed Apr 29 08:53:31 +0000 2009" => "Wed, Apr 29 2009 08:53:31 +0000"
      return Date.parse(date_str.replace(/^([a-z]{3})( [a-z]{3} \d\d?)(.*)( \d{4})$/i, '$1,$2$4$3'));
    }

    function relative_time(date) {
      var relative_to = (arguments.length > 1) ? arguments[1] : new Date();
      var delta = parseInt((relative_to.getTime() - date) / 1000, 10);
      var r = '';
      if (delta < 60) {
        r = delta + ' seconds ago';
      } else if(delta < 120) {
        r = 'a minute ago';
      } else if(delta < (45*60)) {
        r = (parseInt(delta / 60, 10)).toString() + ' minutes ago';
      } else if(delta < (2*60*60)) {
        r = 'an hour ago';
      } else if(delta < (24*60*60)) {
        r = '' + (parseInt(delta / 3600, 10)).toString() + ' hours ago';
      } else if(delta < (48*60*60)) {
        r = 'a day ago';
      } else {
        r = (parseInt(delta / 86400, 10)).toString() + ' days ago';
      }
      return 'about ' + r;
    }

    function build_auto_join_text(text) {
      if (text.match(/^(@([A-Za-z0-9-_]+)) .*/i)) {
        return s.auto_join_text_reply;
      } else if (text.match(url_regexp)) {
        return s.auto_join_text_url;
      } else if (text.match(/^((\w+ed)|just) .*/im)) {
        return s.auto_join_text_ed;
      } else if (text.match(/^(\w*ing) .*/i)) {
        return s.auto_join_text_ing;
      } else {
        return s.auto_join_text_default;
      }
    }

    function build_api_url() {
      var proto = ('https:' == document.location.protocol ? 'https:' : 'http:');
      var count = (s.fetch === null) ? s.count : s.fetch;
      if (s.list) {
        return proto+"//"+s.twitter_api_url+"/1/"+s.username[0]+"/lists/"+s.list+"/statuses.json?page="+s.page+"&per_page="+count+"&callback=?";
      } else if (s.favorites) {
        return proto+"//"+s.twitter_api_url+"/favorites/"+s.username[0]+".json?page="+s.page+"&count="+count+"&callback=?";
      } else if (s.query === null && s.username.length == 1) {
        return proto+'//'+s.twitter_api_url+'/1/statuses/user_timeline.json?screen_name='+s.username[0]+'&count='+count+(s.retweets ? '&include_rts=1' : '')+'&page='+s.page+'&callback=?';
      } else {
        var query = (s.query || 'from:'+s.username.join(' OR from:'));
        return proto+'//'+s.twitter_search_url+'/search.json?&q='+encodeURIComponent(query)+'&rpp='+count+'&page='+s.page+'&callback=?';
      }
    }

    function extract_avatar_url(item, secure) {
      if (secure) {
        return ('user' in item) ?
          item.user.profile_image_url_https :
          extract_avatar_url(item, false);
      } else {
        return item.profile_image_url || item.user.profile_image_url;
      }
    }

    // Convert twitter API objects into data available for
    // constructing each tweet <li> using a template
    function extract_template_data(item){
      var o = {};
      o.item = item;
      o.source = item.source;
      o.screen_name = item.from_user || item.user.screen_name;
      o.avatar_size = s.avatar_size;
      o.avatar_url = extract_avatar_url(item, (document.location.protocol === 'https:'));
      o.retweet = typeof(item.retweeted_status) != 'undefined';
      o.tweet_time = parse_date(item.created_at);
      o.join_text = s.join_text == "auto" ? build_auto_join_text(item.text) : s.join_text;
      o.tweet_id = item.id_str;
      o.twitter_base = "http://"+s.twitter_url+"/";
      o.user_url = o.twitter_base+o.screen_name;
      o.tweet_url = o.user_url+"/status/"+o.tweet_id;
      o.reply_url = o.twitter_base+"intent/tweet?in_reply_to="+o.tweet_id;
      o.retweet_url = o.twitter_base+"intent/retweet?tweet_id="+o.tweet_id;
      o.favorite_url = o.twitter_base+"intent/favorite?tweet_id="+o.tweet_id;
      o.retweeted_screen_name = o.retweet && item.retweeted_status.user.screen_name;
      o.tweet_relative_time = relative_time(o.tweet_time);
      o.tweet_raw_text = o.retweet ? ('RT @'+o.retweeted_screen_name+' '+item.retweeted_status.text) : item.text; // avoid '...' in long retweets
      o.tweet_text = $([o.tweet_raw_text]).linkUrl().linkUser().linkHash()[0];
      o.tweet_text_fancy = $([o.tweet_text]).makeHeart().capAwesome().capEpic()[0];

      // Default spans, and pre-formatted blocks for common layouts
      o.user = t('<a class="tweet_user" href="{user_url}">{screen_name}</a>', o);
      o.join = s.join_text ? t(' <span class="tweet_join">{join_text}</span> ', o) : ' ';
      o.avatar = o.avatar_size ?
        t('<a class="tweet_avatar" href="{user_url}"><img src="{avatar_url}" height="{avatar_size}" width="{avatar_size}" alt="{screen_name}\'s avatar" title="{screen_name}\'s avatar" border="0"/></a>', o) : '';
      o.time = t('<span class="tweet_time"><a href="{tweet_url}" title="view tweet on twitter">{tweet_relative_time}</a></span>', o);
      o.text = t('<span class="tweet_text">{tweet_text_fancy}</span>', o);
      o.reply_action = t('<a class="tweet_action tweet_reply" href="{reply_url}">reply</a>', o);
      o.retweet_action = t('<a class="tweet_action tweet_retweet" href="{retweet_url}">retweet</a>', o);
      o.favorite_action = t('<a class="tweet_action tweet_favorite" href="{favorite_url}">favorite</a>', o);
      return o;
    }

    return this.each(function(i, widget){
      var list = $('<ul class="tweet_list">');
      var intro = '<p class="tweet_intro">'+s.intro_text+'</p>';
      var outro = '<p class="tweet_outro">'+s.outro_text+'</p>';
      var loading = $('<p class="loading">'+s.loading_text+'</p>');

      if(s.username && typeof(s.username) == "string"){
        s.username = [s.username];
      }

      $(widget).bind("tweet:load", function(){
        if (s.loading_text) $(widget).empty().append(loading);
        $.getJSON(build_api_url(), function(data){
          $(widget).empty().append(list);
          if (s.intro_text) list.before(intro);
          list.empty();

          var tweets = $.map(data.results || data, extract_template_data);
          tweets = $.grep(tweets, s.filter).sort(s.comparator).slice(0, s.count);
          list.append($.map(tweets, function(o) { return "<li>" + t(s.template, o) + "</li>"; }).join('')).
              children('li:first').addClass('tweet_first').end().
              children('li:odd').addClass('tweet_even').end().
              children('li:even').addClass('tweet_odd');

          if (s.outro_text) list.after(outro);
          $(widget).trigger("loaded").trigger((tweets.length === 0 ? "empty" : "full"));
          if (s.refresh_interval) {
            window.setTimeout(function() { $(widget).trigger("tweet:load"); }, 1000 * s.refresh_interval);
          }
        });
      }).trigger("tweet:load");
    });
  };
})(jQuery);




/*
 * jQuery Nivo Zoom v1.0
 * http://nivozoom.dev7studios.com
 *
 * Copyright 2010, Gilbert Pellegrom
 * Free to use and abuse under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 * 
 * April 2010
 */

(function($) {

	$.fn.nivoZoom = function(options) {

		//Defaults are below
		var settings = $.extend({}, $.fn.nivoZoom.defaults, options);
		
		if(settings.overlay){
			//Disable overly in IE7 due to z-index bug
			if(!($.browser.msie && $.browser.version.substr(0,1)<8)){
				$('body').prepend('<div id="nivoOverlay" />');
				$('#nivoOverlay').css({
					position:'fixed',
					top:0,
					left:0,
					width:'100%',
					height:'100%',
					background:settings.overlayColor,
					opacity:settings.overlayOpacity,
					'z-index':90,
					display:'none'
				});
			}
		}

		return this.each(function(){
			var context = $(this);
			
			var nivoZooms = $('a.nivoZoom', context);
			nivoZooms.each(function(){
				var link = $(this);
				if(link.is('a')){
					var img = $(this).find('img:first');
					
					//Setup link
					link.css({
						position:'relative',
						display:'inline-block'
					});
					//link.attr('title','');
					
					//Add ZoomHover
					link.append('<div class="nivoZoomHover" />');
					var nivoZoomHover = $('.nivoZoomHover', link);
					nivoZoomHover.css('opacity','0');					
					link.hover(function(){
						if(!link.hasClass('zoomed')){
							nivoZoomHover.stop().animate({ opacity:settings.zoomHoverOpacity }, 300);
						}
					}, function(){
						if(!nivoZoomHover.hasClass('loading')){
							nivoZoomHover.stop().animate({ opacity:0 }, 300);
						}
					});
					
					link.bind('click', function(){
						//Check to see if large image is loaded
						/*
						if($('img.nivoLarge', link).length == 0){
							nivoZoomHover.addClass('loading');
							loadImg(img, link, function(){
								nivoZoomHover.removeClass('loading');
								doZoom(img, link, nivoZoomHover); 
							});
						} else {
							doZoom(img, link, nivoZoomHover);
						}*/
						return false;
					});
				}
			});
			
		});
		
		function doZoom(img, link, nivoZoomHover){
//			var imgLarge = $('img.nivoLarge', link);
			if(link.hasClass('zoomed')){
				//Hide Overlay
				if(settings.overlay) $('#nivoOverlay').fadeOut(settings.speed/2);
				//Hide Caption
				if($('.nivoCaption', link).length > 0){
					$('.nivoCaption', link).fadeOut(settings.speed/2);
				}
				//Hide Image
				imgLarge.fadeOut(settings.speed/2, function(){
					img.animate({ opacity:1 }, settings.speed/2);
				});
				link.removeClass('zoomed');
			} else {
				//Show Overlay
				if(settings.overlay) $('#nivoOverlay').fadeIn(settings.speed/2);
				//Hide ZoomHover
				nivoZoomHover.css('opacity','0');
				//Show Image
				img.animate({ opacity:0 }, settings.speed/2, function(){
					imgLarge.fadeIn(settings.speed/2, function(){
						showCaption(img, imgLarge, link);
					});
				});
				link.addClass('zoomed');
			}
		}
		
		function showCaption(img, imgLarge, link){
			if($('.nivoCaption', link).length > 0){
				var nivoCaption = $('.nivoCaption:first', link);
				if(!nivoCaption.hasClass('nivo-processed')){
					//Calculate the image dimensions
					var imgWidth = img.width();
					if(imgWidth == 0) imgWidth = img.attr('width');
					var imgHeight = img.height();
					if(imgHeight == 0) imgHeight = img.attr('height');
					var bigImgWidth = imgLarge.width();
					if(bigImgWidth == 0) bigImgWidth = imgLarge.attr('width');
					var bigImgHeight = imgLarge.height();
					if(bigImgHeight == 0) bigImgHeight = imgLarge.attr('height');
					nivoCaption.css({
						width:bigImgWidth,
						opacity:settings.captionOpacity
					});
					
					if(link.hasClass('topRight')){
						nivoCaption.css({
							top:(bigImgHeight - nivoCaption.outerHeight()) + 'px',
							right:'0px'
						});
					} 
					else if(link.hasClass('bottomRight')){
						nivoCaption.css({
							bottom:'0px',
							right:'0px'
						});
					}
					else if(link.hasClass('bottomLeft')){
						nivoCaption.css({
							bottom:'0px',
							left:'0px'
						});
					} 
					else if(link.hasClass('center')){
						nivoCaption.css({
							top:Math.ceil(imgHeight/2 - bigImgHeight/2) + (bigImgHeight - nivoCaption.outerHeight()) + 'px',
							left:(imgWidth/2 - bigImgWidth/2) +'px'
						});
					} else {
						nivoCaption.css({
							top:(bigImgHeight - nivoCaption.outerHeight()) + 'px',
							left:'0px'
						});
					}
					nivoCaption.addClass('nivo-processed');
				}
				nivoCaption.fadeIn(settings.speed/2);
			}
		}
		
		function loadImg(img, link, callback){
			//Load large image
			var newImg = new Image();
			$(newImg).load(function (){   
//				$(this).addClass('nivoLarge');
				$(this).css({
					position:'absolute',
					display:'none',
					'z-index':99
				});
				
				//Fix IE7 z-index bug
				if(navigator.userAgent.match(/MSIE \d\.\d+/)){
					link.css('z-index','100');
				}
				
				if(link.hasClass('topRight')){
					$(this).css({
						top:'0px',
						right:'0px'
					});
				} 
				else if(link.hasClass('bottomRight')){
					$(this).css({
						bottom:'0px',
						right:'0px'
					});
				}
				else if(link.hasClass('bottomLeft')){
					$(this).css({
						bottom:'0px',
						left:'0px'
					});
				} 
				else if(link.hasClass('center')){
					//Calculate the image dimensions
					var imgWidth = img.width();
					if(imgWidth == 0) imgWidth = img.attr('width');
					var imgHeight = img.height();
					if(imgHeight == 0) imgHeight = img.attr('height');
					var bigImgWidth = $(this).width();
					if(bigImgWidth == 0) bigImgWidth = $(this).attr('width');
					var bigImgHeight = $(this).height();
					if(bigImgHeight == 0) bigImgHeight = $(this).attr('height');
					$(this).css({
						top:(imgHeight/2 - bigImgHeight/2) +'px',
						left:(imgWidth/2 - bigImgWidth/2) +'px'
					});
				} else {
					$(this).css({
						top:'0px',
						left:'0px'
					});
				}
				
				//$(this).attr('title','Click to close');
				link.append($(this));
				callback.call(this);
			}).attr('src', link.attr('href'));
		}
	};
	
	//Default settings
	$.fn.nivoZoom.defaults = {
		speed:500,
		zoomHoverOpacity:1,
		overlay:false,
		overlayColor:'#333',
		overlayOpacity:0.5,
		captionOpacity:0.8
	};
		
})(jQuery);