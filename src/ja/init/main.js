$(document).ready(function() {
	$('#name').blur(function() {
		if ($('#name').val() === '') {
			$(this).addClass('error');
		} else {
			$(this).removeClass('error');
		}

		if (
			$('#name').val() !== '' &&
			$('form .error').length === 0 &&
			$('#email').val() !== '' &&
			$('#privacyPolicy:checked').length
		) {
			$('.form-btn')
				.addClass('active')
				.removeAttr('disabled');
		} else {
			$('.form-btn')
				.removeClass('active')
				.prop('disabled', true);
		}
	});

	$(".question1 .btn").on("click", function(){
		$(".question1").addClass('hide');
		$(".question2").removeClass('hide').addClass('show');
		$(".question2 h3").addClass('fadeInUp');
		$(".question2 img").addClass('zoomInDown');
		$(".dot2").addClass('active');
	});

	$(".question2 .btn").on("click", function(){
		$(".question2").removeClass('show').addClass('hide');
		$(".question3").removeClass('hide').addClass('show');
		$(".question3 h3").addClass('fadeInUp');
		$(".question3 img").addClass('zoomInDown');
		$(".dot3").addClass('active');
	});

	$(".question3 .btn").on("click", function(){
		$(".questions").removeClass('show').addClass('hide');
		$(".results-wrap").removeClass('hide').addClass('show');
		$(".dot4").addClass('active');
		$(".result-gallery img").addClass('zoomIn');
		$(".chart-horiz span").addClass('animate');
	});

	$('#email').blur(function() {
		if ($('#email').val() === '') {
			$(this).addClass('error');
		} else {
			$(this).removeClass('error');
		}

		if (
			/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test($('#email').val()) &&
			$('form .error').length === 0 &&
			$('#name').val() !== '' &&
			$('form .error').length === 0 &&
			$('#privacyPolicy:checked').length
		) {
			$('.form-btn')
				.addClass('active')
				.removeAttr('disabled');
		} else {
			$('.form-btn')
				.removeClass('active')
				.prop('disabled', true);
		}
	});

	$('#privacyPolicy').change(function() {
		if ($('#privacyPolicy:checked').length === 0) {
			$(this).addClass('error');
		} else {
			$(this).removeClass('error');
		}

		if ($('#name').val() !== '' && $('#privacyPolicy:checked').length !== 0 && $('#email').val() !== '') {
			$('.form-btn')
				.addClass('active')
				.removeAttr('disabled');
		} else {
			$('.form-btn')
				.removeClass('active')
				.prop('disabled', true);
		}
	});

	$(".form-btn").on("click", function(){
		$(".results-wrap").removeClass('show').addClass('hide');
		$(".thank-you").removeClass('hide').addClass('show');
		$("footer").hide();
	});

	createSliderElements('tokyo');

	function formatCitySlider (d) {
		if(d.disabled) return; 
    	var info = '';
    	if(cityHotelMap[d.id].hotels.length > 1) {
    		info += '<span> (' + cityHotelMap[d.id].hotels.length + ' '+ miscellaneous.hotelPlural  +') </span>';
    	} else {
    		info += '<span> (' + cityHotelMap[d.id].hotels.length + ' '+ miscellaneous.hotelSingular + ') </span>';
    	}
    	return $('<p class="option-city">' + d.text + ' ' + info +'<p>');
	};

	$( ".js-slider-control" ).select2({
		containerCssClass: 'city-container',
    	dropdownCssClass: 'city-container-options',
		minimumResultsForSearch: -1,
	    templateResult: formatCitySlider,
	    templateSelection: formatCitySlider
	});


	var popup = document.getElementById('popup');
	var btn = document.getElementById('popup-button');
	var closeButton = document.getElementsByClassName('close')[0];
	if (btn != null ){
		btn.onclick = function() {
			popup.style.display = 'block';
			$('body, html').addClass('not-scrollable');
		};
	}
	if (closeButton != null ){	
		closeButton.onclick = function() {
			popup.style.display = 'none';
			$('body, html').removeClass('not-scrollable');
		};
	}
	window.onclick = function(event) {
		if (event.target == popup) {
			popup.style.display = 'none';
			$('body, html').removeClass('not-scrollable');
		}
	};
	$(document).keyup(function(e) {
		if (e.keyCode == 27) {
			popup.style.display = 'none';
			$('body, html').removeClass('not-scrollable');
		}
	});

	

	$( ".js-slider-control" ).on('change', function(e) {
		var city = e.target.value; 
		$('.js-slider').slick("unslick");	
		createSliderElements(city);
	});

	function createSliderElements(city) {
		var item = '';
		for (var i = 0; i < cityHotelMap[city].hotels.length; i++) {
			var hotelData =  cityHotelMap[city].hotels[i];
			item += '<div><img data-lazy="../dist/images/' + hotelData.img + '" /> <h6>'+ hotelData.name +'</h6> <p>'+ hotelData.address +'</p> <button class="js-slider-choose" data-city="' + city + '" data-hotel="' + hotelData.name + '" data-property="' + hotelData.id + '">' + miscellaneous.sliderSelectButton + '</button></div>';
		};
		
		$('.js-slider').empty().append(item).slick({
		  lazyLoad: 'ondemand',
		  slidesToShow: 3,
		  speed: 2000,
		  slidesToScroll: 3,
		  dots: true,
		  responsive: [		    
		    {
		      breakpoint: 900,
		      settings: {
		        slidesToShow: 2,
		        slidesToScroll: 2
		      }
		    },
		    {
		      breakpoint: 600,
		      settings: {
		        slidesToShow: 1,
		        slidesToScroll: 1,
		        centerMode: true,
		        arrows: false			    
		      }
		    }
		  ]
		}); 

		setTimeout(function() {
			var stHeight = $('.slick-track').height();
			$('.slick-slide').css('height', (stHeight - 15) + 'px' );	
		}, 100);
	};


});  

