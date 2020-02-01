var
	doc = document.documentElement,
	ua = window.navigator.userAgent.toLowerCase(),
	up = window.navigator.platform.toLowerCase()
;
doc.setAttribute('data-useragent', ua);
doc.setAttribute('data-platform', up );

if(ua.search('mobile') == '-1'){
	console.log("PC");
}

$(document).ready(function(e) {

	// 애니메이션
	var cssAnimate = function(animationName, callback) {
		var self = this,
			events = "webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend webkitAnimationEnd oanimationend msAnimationEnd animationend",
			myReg = new RegExp("^.*(transition|Transition).*$");

		self.one(events, function(e) {
			if(myReg.test(e.originalEvent.type) || e.originalEvent.animationName == animationName) {
				callback();
				self.off(events);
			}
		});
	};

	var win = $(window);
	var html = $('html');
	var doc = $(document);
	var bgRolling = $('._rolling');

	function resize(){
		win.on('resize',function(e){
			var winW = win.width();
			if(winW > 812){
				bgRolling.css({
					'height': 900
				});
			}
		});
	}
	resize();
	doc.trigger('resize');


	//common
	function toggleLayer(elm){
		var self = $(elm);
		self.next().slideToggle(200);
	}
	function tabMenu(elm){
		var self = $(elm);
		self.addClass('on').siblings().removeClass('on');
	}
	function layerPop(idx,name){
		var lycommon = $('._lycommon');
		var lycommonIdx = $('._lycommon[data-attr='+name+']').length;
		if(idx == 0){
			html.removeAttr('style');
			lycommon.hide();
		}else if(idx == 1 && lycommonIdx == 1){
			html.css('overflow','hidden');
			$('._lycommon[data-attr='+name+']').show();
		}
	}
	function nextToggle(elm){
		var self = $(elm);
		elm.next().toggle();
	}
	function parentToggle(elm,name){
		var self = $(elm);
		self.parent().toggleClass(name);
	}
	$('[data-attr="_lyPop"]').on('click',function(e){
		var name = $(this).attr('id');
		layerPop(1,name);
		e.preventDefault();
	});
	$('._lyClose').on('click',function(e){
		layerPop(0);
		e.preventDefault();
	});
	//tabMenu
	$('.tab a').on('click',function(e){
		var self = $(this);
		tabMenu(self);
	});

	//selectbox
	$('.cmm_select').each(function () {
	    var $this = $(this),
	        numberOfOptions = $(this).children('option').length;
	    $this.addClass('s-hidden');
	    $this.wrap('<div class="cm_select"></div>');
	    $this.after('<div class="styledSelect"></div>');
	    var $styledSelect = $this.next('div.styledSelect');
	    $styledSelect.text($this.children('option').eq(0).text());
	    var $list = $('<ul />', {
	        'class': 'options'
	    }).insertAfter($styledSelect);
	    for (var i = 0; i < numberOfOptions; i++) {
	        $('<li />', {
	            text: $this.children('option').eq(i).text(),
	            rel: $this.children('option').eq(i).val()
	        }).appendTo($list);
	    }
	    var $listItems = $list.children('li');
	    $styledSelect.click(function (e) {
	        e.stopPropagation();
	        $(this).toggleClass('active').next('ul.options').slideToggle(200);
	    });
	    $listItems.click(function (e) {
	        e.stopPropagation();
	        $styledSelect.text($(this).text()).removeClass('active');
	        $this.val($(this).attr('rel'));
	        $list.hide();
	    });
	    doc.click(function () {
	        $styledSelect.removeClass('active');
	        $list.slideUp(200);
	    });
	});

	$('.btn_dropdown').each(function(){
		var self = $(this);
		self.click(function(e){
			e.stopPropagation();
			toggleLayer(self);
			e.preventDefault();
		});
		doc.click(function () {
			self.next().slideUp(200);
	    });
	});

	//scrollStatus
	function scrollStatus(){
		var docTop = doc.scrollTop();
		if(docTop >= 0){
			header.removeClass('active');
			header.css({
				'background-color':'transparent'
			})
		}
		if(docTop >= 60){
			header.removeClass('active');
			header.css({
				'background-color' : 'rgba(255,255,255,.2)'
			})
		}
		if(docTop >= 120){
			header.removeClass('active');
			header.css({
				'background-color' : 'rgba(255,255,255,.4)'
			})
		}
		if(docTop >= 180){
			header.addClass('active');
            header.css({
                'background-color' : 'rgba(255,255,255,.6)'
            });
		}
		if(docTop >= 240){
			header.css({
                'background-color' : 'rgba(255,255,255,.8)'
            });
		}
		if(docTop >= 300){
			header.css({
                'background-color' : 'rgba(255,255,255,1)'
            });
		}
	}

	//header
	var header = $('#header');
	var lnb = $('.lnb');
	function slideDown(){
		lnb.show();
		lnb.stop().animate({
			opacity:1,
			height:250
		},{
			duration: 150,
			easing: "linear"
		});
	}
	function slideUp(){
		scrollStatus();
		lnb.stop().animate({
			opacity:0,
			height:0
		},{
			duration: 150,
			easing: "linear",
			done:function(){
				lnb.hide();
			}
		});
	}
	$('.gnb_item').on('mouseover',function(){
		slideDown();
	});
	$('#header').on('mouseleave',function(){
		slideUp();
	});

	//HOME
	doc.on('scroll',function(){
		var winW = win.width();
		if(winW > 812){
			scrollStatus();
		}
	});

	var _bannerTime = null;
    var _bannerInnerTime1 = null;
    var _bannerInnerTime2 = null;
	function animateBanner() {
	    var _b = $('._rolling'),
			_control = _b.find('._control');
	    _bannerTime = setInterval(function() {
			_b.attr('data-rolling', 'true');
			var _nowItem = _b.find('.banner.on'), _nextItem = _nowItem.next('.banner');
			if(_nextItem.length == 0) {
				_nextItem = _b.find('.banner[data-index="1"]');
			}
			_nextItem.addClass('view on');
			_nowItem.removeClass('on');
			_bannerInnerTime1 = setTimeout(function() {
				_nowItem.addClass('stop').removeClass('view leave');
				setTimeout(function() {
					_nowItem.removeClass('stop');
				}, 100);
				_b.attr('data-rolling', 'false');
			}, 1000);
			_bannerInnerTime2 = setTimeout(function() {
				if(_nextItem.hasClass('view on')) {
					_nextItem.addClass('leave');
				}
			}, 7000);
			_control.find('button').removeClass('on');
			_control.find('.btn_dot').eq(_nextItem.attr('data-index')-1).addClass('on');
	    }, 8500);
	}
	var _banner = $('._rolling');
    var _start = $('._rolling .banner.view');
    _start.addClass('on');
    _bannerInnerTime2 = setTimeout(function() {
        _start.addClass('leave');
    }, 7000);
    animateBanner();
    $('._rolling .btn_dot').on('click', function() {
		var self = $(this);
        if(_banner.attr('data-rolling') == "false" && !self.hasClass('on')) {
            _banner.attr('data-rolling', "true");
            var _idx = self.index()+1;
            var _selItem = _banner.find('.banner[data-index='+_idx+']');
            var _nowItem = _banner.find('.banner.on');
            _nowItem.addClass('old');
            clearTimeout(_bannerInnerTime1);
            clearTimeout(_bannerInnerTime2);
            clearInterval(_bannerTime);
            _bannerInnerTime1 = null;
            _bannerInnerTime2 = null;
            _bannerTime = null;
            _selItem.removeClass('leave').addClass('view on');
            _bannerInnerTime2 = setTimeout(function() {
                if(!_banner.hasClass('stop')) {
                    _selItem.addClass('leave');
                }
            }, 7000);
            setTimeout(function() {
                _nowItem.addClass('stop');
                setTimeout(function() {
                    _nowItem.removeClass('stop');
                }, 100);
                _selItem.siblings('.banner').removeClass('view on leave old');
                _banner.attr('data-rolling', "false");
            }, 1000);
            animateBanner();
            _banner.find('.btn_dot').removeClass('on');
            self.addClass('on');
        }
    });
});
