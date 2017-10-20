/* JS Document */

jQuery(document).ready(function($)
{
	"use strict";

	var header = $('.header');
	var logo = $('.logo');
	var logoContainer = $('.logo_container');
	var ctrl = new ScrollMagic.Controller();
	var map;
	var hamb = $('.hamburger');
	var hambActive = false;

	setHeader();

	initMainSlider();
	initMainSliderNumber();
	initHamburger();
	initScrolling();
	initProjects();
	initParallax();
	initVideo();
	initProgressBars();
	initClients();
	initGoogleMap();

	$(window).on('resize', function()
	{
		setHeader();
		initParallax();
		setTimeout(function()
		{
			initMainSliderNumber();
		}, 200);
	});

	$(window).on('scroll', function()
	{
		setHeader();
	});

	function setHeader()
	{
		var wdth = window.innerWidth;
		var scrlTop = $(window).scrollTop();

		if(wdth < 481)
		{
			if(scrlTop > 100)
			{
				header.css({'height':"60px", "marginTop":"0px", "background":"rgba(40,39,39,0.8)"});
				logoContainer.css({'left':"103px", 'top':"19px"});
				logo.css({'transform': "rotate(0deg)"});
				logo.find('a').css('font-size', '14px');
			}
			else
			{
				header.css({'height':"60px", "marginTop":"0px", "background":"rgba(40,39,39,0)"});
				logoContainer.css({'left':"8px", 'top':"12px"});
				logo.css({'transform': "rotate(-90deg)"});
				logo.find('a').css('font-size', '14px');
			}
		}
		else if(wdth < 768)
		{
			if(scrlTop > 100)
			{
				header.css({'height':"60px", "marginTop":"0px", "background":"rgba(40,39,39,0.8)"});
				logoContainer.css({'left':"139px", 'top':"17px"});
				logo.css({'transform': "rotate(0deg)"});
				logo.find('a').css('font-size', '18px');
			}
			else
			{
				header.css({'height':"60px", "marginTop":"0px", "background":"rgba(40,39,39,0)"});
				logoContainer.css({'left':"23px", 'top':"27px"});
				logo.css({'transform': "rotate(-90deg)"});
				logo.find('a').css('font-size', '18px');
			}
		}
		else if(wdth < 992)
		{
			if(scrlTop > 100)
			{
				header.css({'height':"60px", "marginTop":"0px", "background":"rgba(40,39,39,0.8)"});
				logoContainer.css({'left':"139px", 'top':"17px"});
				logo.css({'transform': "rotate(0deg)"});
				logo.find('a').css('font-size', '18px');
			}
			else
			{
				header.css({'height':"60px", "marginTop":"0px", "background":"rgba(40,39,39,0)"});
				logoContainer.css({'left':"23px", 'top':"27px"});
				logo.css({'transform': "rotate(-90deg)"});
				logo.find('a').css('font-size', '18px');
			}
		}
		else
		{
			if(scrlTop > 100)
			{
				header.css({'height':"80px", "marginTop":"0px", "background":"rgba(40,39,39,0.8)"});
				logoContainer.css({'left':"190px", 'top':"27px"});
				logo.css({'transform': "rotate(0deg)"});
				logo.find('a').css('font-size', '18px');
			}
			else
			{
				header.css({'height':"135px", "background":"rgba(40,39,39,0)"});
				logoContainer.css({'left':"72px"});
				logo.css({'transform': "rotate(-90deg)"});
				logo.find('a').css('font-size', '24px');
			}
		}

		if(window.innerWidth > 991 && hambActive)
		{
			closeMenu();
			hambActive = false;
		}
	}

	function initMainSlider()
	{
		var firstparallaxslider = new parallaxSlider(
		{
			wrapperid: 'myparallaxslider', //ID of DIV on page to house slider
			displaymode: {type:'manual', pause:3000, cycles:0, stoponclick:false, pauseonmouseover:false},
			delaybtwdesc:  500, // delay in milliseconds between the revealing of each description layer inside a slide
			navbuttons: ['images/left.png', 'images/right.png', 'images/up.png', 'images/down.png'], // path to nav images
			activeslideclass: 'selectedslide', // CSS class that gets added to currently shown DIV slide
			orientation: 'v', //Valid values: "h" or "v"
			persist: false, //remember last viewed slide and recall within same session?
			slideduration: 1500 //transition duration (milliseconds)
		});

		var swiper = new Swiper ('.swiper-container',
		{
		    // Optional parameters
		    direction: 'vertical',
		    loop: true,
		    effect:'slide',
		    parallax:false,
		    speed:3000,
		    slidesPerView:3,
		    loopAdditionalSlides:1,
		    onlyExternal:true,
		    centeredSlides:true,
		    roundLengths:true,
		    spaceBetween: 30,
		    preventClicks:false,
		    preventClicksPropagation: false,
		    
		    // Navigation arrows
		    nextButton: '.swiper-button-next',
		    prevButton: '.swiper-button-prev',
		    onSlideChangeStart: function(swiper)
		    {
		    	$('.swiper-slide').each(function()
		    	{
		    		var act = $(this).find('.slide_content');
	                if ($(this).index() === swiper.activeIndex)
	                {
	                    // Fadein in active slide
	                    var tm1 = TweenMax.to(act, 0.5, {opacity: 1, ease:Power2.easeOut});
	                }
	                else
	                {
	                    // Fadeout inactive slides
	                    var tm1 = TweenMax.to(act, 0.5, {opacity: 0.05, ease:Power2.easeOut});
	                }
	            });
		    }
	  	});

		var left = $('.slider_nav_left');
		var right = $('.slider_nav_right');

		var animating = false;

		left.on('click', function()
		{
			if(!animating)
			{
				animating = true;
				
				firstparallaxslider.navigate('forth');
				
				setTimeout(function()
				{
					swiper.slideNext(true, 1000);
				}, 500);
				setTimeout(function()
				{
					animating = false;
				}, 1500);
			}	
		});

		right.on('click', function()
		{
			if(!animating)
			{
				animating = true;
				firstparallaxslider.navigate('back');
				
				setTimeout(function()
				{
					swiper.slidePrev(true, 1000);
				}, 500);
				setTimeout(function()
				{
					animating = false;
				}, 1500);
			}
		});

		// Custom Autoplay
		// var sliderTimer = setInterval(function()
		// {
		// 	if(!animating)
		// 	{
		// 		animating = true;
		// 		firstparallaxslider.navigate('forth');
		// 		setTimeout(function()
		// 		{
		// 			swiper.slideNext(true, 1000);
		// 		}, 500);
		// 		setTimeout(function()
		// 		{
		// 			animating = false;
		// 		}, 1500);
		// 	}
		// }, 3000);
	};

	function initMainSliderNumber()
	{
		var ele = $('.swiper-slide-active .slide_content h1:nth-child(2)');
		var sliderWidth = $('.swiper-slide-active').innerWidth();
		var nm = $('.slide_num');
		

		var yPos = ele.offset().top;
		var eleH = ele.innerHeight();
		var eleW = ele.innerWidth();
		var xPos = ele.offset().left + eleW + 30 + "px";

		nm.css('top', yPos + (eleH / 2) - (nm.innerHeight() / 2 ) + "px");

		// Y Position for the slider navigation

		var nav = $('.slider_nav');
		var navH = nav.innerHeight();

		// Because stupid IE

		if(ieCheck()) //if IE
		{
			//explode user hmhmhmhmhm
			//HmHmHmHmHm
			//HaHaHaHaHaHaHa
			//HAHAHAHAHAHAHAHAH!
			navH = navH + 10;
		}
		
		var navPos = yPos + (eleH / 2) - (navH / 2 ) + "px";
		nav.css('top', navPos);
	}

	function ieCheck()
	{
		var ua = window.navigator.userAgent;
	    var msie = ua.indexOf("MSIE ");

	    if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./))
	    {
	        return true;
	    }
	    else
	    {
	    	return false;
	    }
	    return false;
	}

	function initHamburger()
	{
		hamb.on('click', function()
		{
			if(hambActive)
			{
				closeMenu();
			}
			else
			{
				openMenu();
			}
		});
	}

	function closeMenu()
	{
		var fs = $('.fs_menu_container');
		hamb.toggleClass("cross");
		fs.toggleClass("toggled");
		hambActive = false;
	}

	function openMenu()
	{
		var fs = $('.fs_menu_container');
		hamb.toggleClass("cross");
		fs.toggleClass("toggled");
		hambActive = true;
	}

	function getOffSet()
	{
		if(window.innerWidth > 991)
		{
			return -80;
		}
		else
		{
			return -60;
		}
	}

	function initScrolling()
	{
		var links = $('.nav_links');
		
    	links.each(function()
    	{
    		var ele = $(this);
    		var target = ele.data('scroll-to');
    		ele.on('click', function(e)
    		{
    			e.preventDefault();
    			var off_set = getOffSet();
    			$(window).scrollTo(target, 1500, {offset: off_set, easing: 'easeInOutQuart'});
    			if(hambActive)
				{
					closeMenu();
				}
    		});
    	});

    	links.each(function()
    	{
    		var ele = $(this);
    		var linkEle = $($(this).data('scroll-to'));
    		var offsetValue = linkEle.height() - 150;
    		var navScene1 = new ScrollMagic.Scene(
    		{
    			triggerElement:$(this).data('scroll-to'),
    			triggerHook:'onLeave',
    			offset:offsetValue
    		})
    		.on('start', function()
    		{
    			if(ele.hasClass('active'))
    			{
    				ele.removeClass('active');
    			}
    			else
    			{
    				ele.addClass('active');
    			}
    		})
    		.addTo(ctrl);
    	});

    	links.each(function()
    	{
    		var ele = $(this);
    		var navScene2 = new ScrollMagic.Scene(
    		{
    			triggerElement:$(this).data('scroll-to'),
    			triggerHook:'onLeave',
    			offset:-150
    		})
    		.on('start', function()
    		{
    			if(ele.hasClass('active'))
    			{
    				ele.removeClass('active');
    			}
    			else
    			{
    				ele.addClass('active');
    			}
    		})
    		.addTo(ctrl);
    	});
	}

	function initProjects()
	{
		var eles = $('.project');

		eles.each(function()
		{
			var ele = this;

			var projectScene = new ScrollMagic.Scene(
			{
				triggerElement: ele,
		        triggerHook: "onEnter",
		        offset: 200,
		        reverse:false
			})
			.setClassToggle(ele, 'active')
			.addTo(ctrl);
		});
	}

	function initParallax()
	{
		var projects = $('.project');

		/* Add parallax effect to project backgrounds */
		projects.each(function()
		{
			var project = $(this);

			var bcg = project.data('parallax-bcg');
			project.parallax({imageSrc: bcg});
		});
	}

	function initVideo()
	{
		$('.video').magnificPopup({
          disableOn: 700,
          type: 'iframe',
          mainClass: 'mfp-fade',
          removalDelay: 160,
          preloader: false,
          fixedContentPos: false
        });
	}

	function initProgressBars()
	{
		var eles = $('.skill_bars');

		eles.each(function(i)
		{
			var ele = $(this);
    		var elePerc = ele.data('perc');
    		var eleName = '#'+ele.data('name');

    		var statsScene = new ScrollMagic.Scene({
	    		triggerElement: this,
	    		triggerHook: 'onEnter',
	    		reverse:false
	    	})
	    	.on('start', function()
	    	{
	    		var pbar = new ProgressBar.Line(eleName, 
	    		{
	    			strokeWidth: 1,
					easing: 'easeInOut',
					duration: 1400,
					color: '#de1f26',
					trailColor: 'rgba(255,255,255,0.5)',
					trailWidth: 1,
					svgStyle: {width: '100%', height: '100%'},
					text: {
						style: {
							// Text color.
							// Default: same as stroke color (options.color)
							color: '#717a85',
							position: 'absolute',
							right: '0',
							top: '-20px',
							padding: 0,
							margin: 0,
							transform: null
							},
							autoStyleContainer: false
					},
					from: {color: '#00bcd5'},
					to: {color: '#00bcd5'},
					step: function(state, bar) {
					bar.setText(Math.round(bar.value() * 100) + ' %');
					}
	    		});
	    		pbar.animate(elePerc);
	    	})
	    	.addTo(ctrl);
		});
	}

	function initClients()
	{
		var owl_1 = $('.clients_slider');

		owl_1.owlCarousel(
		{
			items:4,
			loop:true,
			dots:false,
			responsive:
			{
				0:{items:1},
				480:{items:2},
				768:{items:3},
				1280:{items:3},
				1440:{items:4}
			}
		});

		var left = $('.clients_prev');
		var right = $('.clients_next');

		left.on('click', function()
		{
			owl_1.trigger('next.owl.carousel');
		});

		right.on('click', function()
		{
			owl_1.trigger('prev.owl.carousel');
		});
	}

	function initGoogleMap()
	{
		var myLatlng = new google.maps.LatLng(52.35547676050195,4.938748185581985);
    	var mapOptions = 
    	{
    		center: myLatlng,
	       	zoom: 15,
			mapTypeId: google.maps.MapTypeId.ROADMAP,
			draggable: true,
			scrollwheel: false,
			zoomControl: true,
			zoomControlOptions:
			{
				position: google.maps.ControlPosition.RIGHT_CENTER
			},
			mapTypeControl: false,
			scaleControl: false,
			streetViewControl: false,
			rotateControl: false,
			fullscreenControl: true,
			styles:
			[
			  {
			    "elementType": "geometry",
			    "stylers": [
			      {
			        "color": "#212121"
			      }
			    ]
			  },
			  {
			    "elementType": "labels.icon",
			    "stylers": [
			      {
			        "visibility": "off"
			      }
			    ]
			  },
			  {
			    "elementType": "labels.text.fill",
			    "stylers": [
			      {
			        "color": "#757575"
			      }
			    ]
			  },
			  {
			    "elementType": "labels.text.stroke",
			    "stylers": [
			      {
			        "color": "#212121"
			      }
			    ]
			  },
			  {
			    "featureType": "administrative",
			    "elementType": "geometry",
			    "stylers": [
			      {
			        "color": "#757575"
			      }
			    ]
			  },
			  {
			    "featureType": "administrative.country",
			    "elementType": "labels.text.fill",
			    "stylers": [
			      {
			        "color": "#9e9e9e"
			      }
			    ]
			  },
			  {
			    "featureType": "administrative.land_parcel",
			    "stylers": [
			      {
			        "visibility": "off"
			      }
			    ]
			  },
			  {
			    "featureType": "administrative.locality",
			    "elementType": "labels.text.fill",
			    "stylers": [
			      {
			        "color": "#bdbdbd"
			      }
			    ]
			  },
			  {
			    "featureType": "poi",
			    "elementType": "labels.text.fill",
			    "stylers": [
			      {
			        "color": "#757575"
			      }
			    ]
			  },
			  {
			    "featureType": "poi.park",
			    "elementType": "geometry",
			    "stylers": [
			      {
			        "color": "#181818"
			      }
			    ]
			  },
			  {
			    "featureType": "poi.park",
			    "elementType": "labels.text.fill",
			    "stylers": [
			      {
			        "color": "#616161"
			      }
			    ]
			  },
			  {
			    "featureType": "poi.park",
			    "elementType": "labels.text.stroke",
			    "stylers": [
			      {
			        "color": "#1b1b1b"
			      }
			    ]
			  },
			  {
			    "featureType": "road",
			    "elementType": "geometry.fill",
			    "stylers": [
			      {
			        "color": "#2c2c2c"
			      }
			    ]
			  },
			  {
			    "featureType": "road",
			    "elementType": "labels.text.fill",
			    "stylers": [
			      {
			        "color": "#8a8a8a"
			      }
			    ]
			  },
			  {
			    "featureType": "road.arterial",
			    "elementType": "geometry",
			    "stylers": [
			      {
			        "color": "#373737"
			      }
			    ]
			  },
			  {
			    "featureType": "road.highway",
			    "elementType": "geometry",
			    "stylers": [
			      {
			        "color": "#3c3c3c"
			      }
			    ]
			  },
			  {
			    "featureType": "road.highway.controlled_access",
			    "elementType": "geometry",
			    "stylers": [
			      {
			        "color": "#4e4e4e"
			      }
			    ]
			  },
			  {
			    "featureType": "road.local",
			    "elementType": "labels.text.fill",
			    "stylers": [
			      {
			        "color": "#616161"
			      }
			    ]
			  },
			  {
			    "featureType": "transit",
			    "elementType": "labels.text.fill",
			    "stylers": [
			      {
			        "color": "#757575"
			      }
			    ]
			  },
			  {
			    "featureType": "water",
			    "elementType": "geometry",
			    "stylers": [
			      {
			        "color": "#000000"
			      }
			    ]
			  },
			  {
			    "featureType": "water",
			    "elementType": "labels.text.fill",
			    "stylers": [
			      {
			        "color": "#3d3d3d"
			      }
			    ]
			  }
			]
    	}

    	// Initialize a map with options
    	map = new google.maps.Map(document.getElementById('map'), mapOptions);

    	// Use an image for a marker
		// var image = 'images/marker.png';
		// var marker = new google.maps.Marker(
		// {
		// 	position: new google.maps.LatLng(52.35547676050195, 4.938748185581985),
		// 	map: map,
		// 	icon: image
		// });
		
		//Use an overlay div as a marker
		var overlay = new CustomMarker(
			myLatlng, 
			map,
			{marker_id: '123'}
		);

		// Re-center map after window resize
		google.maps.event.addDomListener(window, 'resize', function()
		{
			setTimeout(function()
			{
				google.maps.event.trigger(map, "resize");
				map.setCenter(myLatlng);
			}, 1400);
		});
	}
});