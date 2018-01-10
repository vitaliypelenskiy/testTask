(function($){
	$(document).ready(function(){


		//******* BEGIN SLIDERS *******
		$('.slider').slick({
			slidesToShow: 4,
			slidesToScroll: 1,
			arrows: true,
			//centerMode: true,
			variableWidth: true
		});

		function productSlider(){
			var sliderFor = {
				infinite: true,
				slidesToShow: 1,
				slidesToScroll: 1,
				arrows: true,
				fade: true,
				asNavFor: '.slider-nav'
			}

			var sliderNav = {
				infinite: true,
				slidesToShow: 3,
				centerPadding: 0,
				slidesToScroll: 1,
				asNavFor: '.slider-for',
				dots: false,
				arrows: true,
				centerMode: true,
				focusOnSelect: true
			}

			$('.slider-for').slick(sliderFor);
			$('.slider-nav').slick(sliderNav);
		}
		//инициализация слайдера на странице товара
		productSlider();
		//******* END SLIDERS *******

		//******* BEGIN PRODUCT SLIDER POPUP *******
		var speed = 300;
		$('.slider-for .slide, #overlay').click(function(){
			var wh = $(window).height(),
				ww = $(window).width(),
				slider = $('.slider-product'),
				overlay = $('#overlay');

			if(wh < 580 || ww < 720) {
				$('.slick-next').trigger('click');
				return false;
			} else if(wh < 720) {
				$('.slider-nav').addClass('hidden');
				$('.slider-product').addClass('no-thumbs');
			} else {
				$('.no-thumbs').removeClass('no-thumbs');
				$('.slider-nav').removeClass('hidden');
			}

			slider.animate({
				'opacity': 0
			},speed,function(){

				$('body').toggleClass('oh');

				if(overlay.hasClass('active')) {
					overlay.animate({
						opacity: 0
					},speed*2,function(){
						//после анимации убираем класс 'active'
						overlay.removeClass('active');
					});
				} else {
					overlay
						.addClass('active')
						.animate({
							opacity: .8
						},speed*2);
				}

				slider
					.toggleClass('position-fixed')
					.animate({'opacity': 1},speed);

				$('.slider-for, .slider-nav').slick('unslick');
				productSlider();
				//переинициализация слайдера, после изменения его размеров
			});
		});
		//******* END PRODUCT SLIDER POPUP *******


		//******* BEGIN SELECT2 *******
		var isSelect = $('.product__select, .cart__select').length;
		if(isSelect) {
			$('.product__select select').select2({
				placeholder: "Характеристика",
				width: 250
			});
			$('.cart__select select').select2({
				placeholder: "Характеристика",
				width: 'auto'
			});
		}
		//******* END SELECT2 *******


		//******* BEGIN PRODUCT QTY *******
		$('.product__qty').each(function(ind,item){
			var productQty = $(item).find('.product__qty__input'),
				itemId = $(item).attr('id'),
				minQty = productQty.data('min-value'),
				qty = productQty.val(),
				up = $(item).find('.product__qty-up'),
				down = $(item).find('.product__qty-down');

			productQty.keyup(function(){
				var inputQty = productQty.val();
				if(isNaN(inputQty) || inputQty < minQty) {
					productQty.val(minQty);
					qty = minQty;
				}
				qty = productQty.val();
				count(itemId,qty);
			});

			up.click(function(){
				qty++;
				productQty.val(qty);
				count(itemId,qty);
			});

			down.click(function(){
				if(qty > minQty) {
					qty--;
					productQty.val(qty);
					count(itemId,qty);
				}
			});
		});
		//******* END PRODUCT QTY *******


		//******* BEGIN CART COUNT *******
		var isCartPage = $('.cart-page').length ? true : false;
		var count = function(id,qty){
			if(isCartPage == false) return false;
			var item = $('#' + id),
				line = item.parent().parent(),
				price = line.find('.cart__price span'),
				total = line.find('.cart__price--total span'),
				result = 0;

			if(isNaN(price.text()) || isNaN(qty)) return false;

			result = price.text() * qty;
			total.text(result);
			countTotal();
		}
		//******* END CART COUNT *******


		//******* BEGIN CART TOTAL COUNT *******
		var countTotal = function(){
			if(isCartPage == false) return false;
			var total = $('.cart__total__amount span'),
				totalAmount = 0,
				tempTotalAmount,
				resultTotalAmount = [];
			$('.cart__price--total span').each(function(ind,el){
				var totalPrice = $(el).text();
				if(isNaN(totalPrice)) return false;
				totalAmount += +totalPrice;
			});
			tempTotalAmount = totalAmount.toString().split('').reverse();
			tempTotalAmount.forEach(function(item,i){
				if((i + 1) % 3 == 0) item = ' ' + item;
				resultTotalAmount.push(item);
			});
			totalAmount = resultTotalAmount.reverse().join('')
			total.text(totalAmount);
		};

		if(isCartPage) countTotal();
		//******* END CART TOTAL COUNT *******


		//******* BEGIN CART REMOVE BUTTON *******
		if(isCartPage) {
			$('.cart__remove').click(function(){
				$(this).parent().parent().fadeOut(speed).delay(speed, function(){
					$(this).remove();
					countTotal();
				});
			});
		}
		//******* END CART REMOVE BUTTON *******


		//******* BEGIN FAQ ACCORDEON *******
		if($('.faq-page').length) {
			// Toggle question
			var body = $('html, body');
			var positions = [];

			$('.faq__title').each(function(ind,el){
				var currentPosition = $(el).offset().top;
				positions.push(currentPosition);
			});
			$('.faq__title').click(function(){
				var $this = $(this),
					ind = $('.faq__title').index($this),
					lines = $('.faq__line'),
					positionTop = $('.faq__title').eq(ind).offset().top,
					line = $this.parent(),
					active = $('.faq__line.active');

				body.stop().animate({scrollTop: positionTop}, '500', 'swing');

				if(line.hasClass('active')) {
					// сворачиваем текущий объект
					line.removeClass('active')
						.find('.faq__content')
						.slideUp(speed);
				} else {
					// сворачиваем все и разворачиваем текущий
					active
						.removeClass('active')
						.find('.faq__content')
						.slideUp(speed);

					line.addClass('active')
						.find('.faq__content')
						.slideDown();
				}
			});
		}
		//******* END FAQ ACCORDEON *******


		//******* BEGIN FANCYBOX *******
		if($('a.fancybox').length) {
			$('a.fancybox').fancybox({
				'nextEffect':'none',
				'prevEffect':'none',
				'openSpeed':200,
				'closeSpeed':200,
				'nextSpeed':200,
				'prevSpeed':200
			});
			$('.popup__ok').click(function(){
				$('.fancybox-overlay').trigger('click');
			});
		}
		//******* END FANCYBOX *******
	});
})(jQuery);
