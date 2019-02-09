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
	var doc = $(document);

	function resize(){
		win.on('resize',function(e){
			var idx;
			var posX;
			var snbT = $('#wrap').attr('class');
			var lnbMenu = $('#header .gnb .gnb_item');
			var snbMenu = $('.snb .snb_menu');
			switch (snbT) {
				case 'bridge':
					idx = 0;
					posX = Math.floor(lnbMenu.eq(idx).find('span').offset().left-45);
					snbMenu.css({
						'left':posX
					});
					break;
				case 'video':
					idx = 1;
					posX = Math.floor(lnbMenu.eq(idx).find('span').offset().left-45);
					snbMenu.css({
						'left':posX
					});
					break;
				case 'cloud':
					idx = 2;
					posX = Math.floor(lnbMenu.eq(idx).find('span').offset().left-45);
					snbMenu.css({
						'left':posX
					});
					break;
				case 'town':
					idx = 3;
					posX = Math.floor(lnbMenu.eq(idx).find('span').offset().left-45);
					snbMenu.css({
						'left':posX
					});
					break;
				case 'contact':
					idx = 4;
					posX = Math.floor(lnbMenu.eq(idx).find('span').offset().left-snbMenu.width()+180);
					snbMenu.css({
						'left':posX
					});
					break;
				default:
				break;
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

	//selectbox
	$('.cmm_select').each(function () {
	    var $this = $(this),
	        numberOfOptions = $(this).children('option').length;
	    $this.addClass('s-hidden');
	    $this.wrap('<div class="select"></div>');
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
	$('.header_search .item_setting').on('click',function(e){
		gnbLayer.toggle();
		e.preventDefault();
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
		scrollStatus();
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
	$('.section_faq .tab a').on('click',function(e){
		var self = $(this);
		tabMenu(self);
		e.preventDefault();
	});

	//BRIDGE
	$('.section_pi .tab a').on('click',function(e){
		var self = $(this);
		var tab = $('.section_pi .tab a');
		var maxNum = tab.length;
		var idxNum = self.index();
		var tabCont = $('.section_pi ._tab');
		tab.removeClass('on');
		tabCont.hide();
		self.addClass('on');
		tabCont.eq(idxNum).show();
		e.preventDefault();
	});

	//VIDEO
	$('.section_video .video_tab .video_tab_btn').on('click',function(e){
		var self = $(this);
		tabMenu(self);
		e.preventDefault();
	});

	//CLOUD
	$('.section_library .tab a').on('click',function(e){
		var self = $(this);
		tabMenu(self);
		e.preventDefault();
	});

});
