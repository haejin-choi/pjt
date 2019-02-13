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
	var win = $(window);
	var html = $('html');
	var doc = $(document);
	var bgRolling = $('._rolling');

	function resize(){
		win.on('resize',function(e){
			var winW = win.width();
			var winH = win.height();

			if(winW > 812){
				var idx;
				var posX;
				var snbT = $('#wrap').attr('class');
				var gnbMenu = $('#header .gnb .gnb_item');
				var snbMenu = $('.snb .snb_menu');
				var snbMenuItem = snbMenu.find('.item_menu_wrap').eq(0).find('.item_menu_link');
				var snbMenuItemW = (snbMenuItem.outerWidth()-snbMenuItem.width())/2;
				var snbMenuW = snbMenu.find('.item_menu_wrap').eq(0).width();
				bgRolling.css({
					'height':winH
				});
				switch (snbT) {
					case 'bridge':
						idx = 0;
						posX = Math.floor(gnbMenu.eq(idx).find('span').offset().left-snbMenuItemW);
						snbMenu.css({
							'left':posX
						});
						break;
					case 'video':
						idx = 1;
						posX = Math.floor(gnbMenu.eq(idx).find('span').offset().left-snbMenuItemW);
						snbMenu.css({
							'left':posX
						});
						break;
					case 'cloud':
						idx = 2;
						posX = Math.floor(gnbMenu.eq(idx).find('span').offset().left-snbMenuItemW);
						snbMenu.css({
							'left':posX
						});
						console.log(gnbMenu.eq(idx).find('span').position().left);
						break;
					case 'town':
						idx = 3;
						posX = Math.floor(gnbMenu.eq(idx).find('span').offset().left-snbMenuItemW);
						snbMenu.css({
							'left':posX
						});
						break;
					case 'contact':
						idx = 4;
						posX = Math.floor(gnbMenu.eq(idx).find('span').offset().left-snbMenu.width()+snbMenuW);
						snbMenu.css({
							'left':posX
						});
						break;
					default:
					break;
				}
			}else{
				var headerH = $('#header_m').height();
				bgRolling.css({
					'height':winH-headerH
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
	function layerPop(idx){
		var lycommon = $('._lycommon');
		if(idx == 0){
			lycommon.hide();
		}else{
			lycommon.show();
		}
	}

	$('._footItem2').on('click',function(e){
		layerPop(1);
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
	var gnbLayer = $('.layer_setting');
	$('.header_search .item_setting').each(function(){
		var self = $(this);
		self.click(function(e){
			e.stopPropagation();
			gnbLayer.toggle();
			e.preventDefault();
		});
		doc.click(function () {
			gnbLayer.hide();
	    });
	});
	var header = $('#header');
	var lnb = $('.lnb');
	var snb = $('.snb');
	function slideDown(){
		header.addClass('active expanded');
		lnb.show();
		lnb.stop().animate({
			opacity:1,
			height:250
		},{
			duration: 150,
			easing: "linear"
		});
		snb.hide();
	}
	function slideUp(){
		scrollStatus();
		header.removeClass('expanded');
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
		snb.show();
	}
	$('.gnb_item').on('mouseover',function(){
		slideDown();
	});
	$('#header').on('mouseleave',function(){
		slideUp();
	});

	$('.snb .item_menu_wrap .item_menu_link').on('mouseover',function(){
		var self = $(this);
		var subLayer = self.next('.item_menu_sub');
		subLayer.stop().slideDown(100);
	});
	$('.snb .item_menu_wrap .item_menu_link').on('mouseleave',function(){
		var self = $(this);
		var subLayer = self.next('.item_menu_sub');
		subLayer.stop().slideUp(100);
	});
	$('.snb .item_menu_wrap .item_menu_sub').on('mouseover',function(){
		var self = $(this);
		self.stop().slideDown(100);
	});
	$('.snb .item_menu_wrap .item_menu_sub').on('mouseleave',function(){
		var self = $(this);
		self.stop().slideUp(100);
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

	//TOWN
	$('.select_btn').each(function(){
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
	$('.section_faq .search_select .select_layer .select_layer_opt').on('click',function(e){
		var self = $(this);
		var txt = self.text();
		self.parent().hide();
		self.parent().prev().text(txt);
		e.preventDefault();
	});
	//TOWN_faq
	$('.section_faq .faq_list .item_q').on('click',function(e){
		var self = $(this);
		self.parent().toggleClass("open");
		e.preventDefault();
	});


	//BRIDGE
	// $('.section_pi .tab a').on('click',function(e){
	// 	var self = $(this);
	// 	var tab = $('.section_pi .tab a');
	// 	var maxNum = tab.length;
	// 	var idxNum = self.index();
	// 	var tabCont = $('.section_pi ._tab');
	// 	tab.removeClass('on');
	// 	tabCont.hide();
	// 	self.addClass('on');
	// 	tabCont.eq(idxNum).show();
	// 	e.preventDefault();
	// });

	//VIDEO
	$('.section_video .video_tab .video_tab_btn').on('click',function(e){
		var self = $(this);
		tabMenu(self);
		e.preventDefault();
	});

	//CLOUD

	//MYPAGE
	$('.section_mypage .list_visited .item_visited > a').on('click',function(e){
		var self = $(this);
		self.parent().toggleClass("open");
		e.preventDefault();
	});


	//mobile
	$('#header_m .menu_wrap .menu').on('click',function(e){
		var self = $(this);
		self.parents('#header_m').toggleClass('expanded');
		self.parent().next().slideToggle(300);
		e.preventDefault();
	});
	$('#header_m .layer_menu .list_menu .menu .m').on('click',function(e){
		var self = $(this);
		var parent = self.parent();
		if(self.next().length == 1){
			self.toggleClass('open');
			self.next().slideToggle(200);
			parent.siblings().find('.m').removeClass('open');
			parent.siblings().find('.sub_menu').hide();
		}
		e.preventDefault();
	});
});
