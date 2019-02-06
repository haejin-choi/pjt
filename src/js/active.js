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
	//common
	function toggleLayer(elm){
		var self = $(elm);
		self.next().slideToggle(200);
	}
	function tabMenu(elm){
		var self = $(elm);
		self.addClass('on').siblings().removeClass('on');
	}

	//dropdown
	$('.dropdown .btn_dropdown').on('click',function(e){
		var self = $(this);
		toggleLayer(self);
		e.preventDefault();
	});

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
		header.css({
			'overflow-y':'hidden',
			'overflow-x':'auto'
		});
		lnb.show();
		lnb.stop().animate({
			opacity:1,
			height:250
		},{
			duration: 200,
			easing: "linear"
		});
		snb.hide();
	}
	function slideUp(){
		header.css({
			'overflow':'visible'
		});
		lnb.stop().animate({
			opacity:0,
			height:0
		},{
			duration: 200,
			easing: "linear",
			done:function(){
				lnb.hide();
			}
		});
		snb.show();
	}
	$('.gnb_item').hover(
		function() {
		  slideDown();
		},
		function() {
		  slideUp();
		},
	);
	$('.lnb').hover(
		function() {
			slideDown();
		}
	);
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
	var doc = $(document);
	doc.on('scroll',function(e){
		var t = $(e.target);
		var tTop = t.scrollTop();

		if (tTop >= 0) {
			header.removeClass('active');
			header.css({
				'background-color' : 'transparent'
			});
		}
		if (tTop >= 60) {
            header.css({
                'background-color' : 'rgba(255,255,255,.2)'
            });
        }
        if (tTop >= 120) {
            header.css({
                'background-color' : 'rgba(255,255,255,.4)'
            });
        }
        if (tTop >= 180) {
			header.addClass('active');
            header.css({
                'background-color' : 'rgba(255,255,255,.6)'
            });
        }
        if (tTop >= 240) {
            header.css({
                'background-color' : 'rgba(255,255,255,.8)'
            });
        }
        if (tTop >= 300) {
            header.css({
                'background-color' : 'rgba(255,255,255,1)'
            });
        }
	});


	//TOWN
	$('.section_faq .search_select .select_btn').on('click',function(e){
		var self = $(this);
		toggleLayer(self);
		e.preventDefault();
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
