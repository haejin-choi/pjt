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

//header
var gnbLayer = $('.layer_setting');
$('.header_search .item_setting').on('click',function(e){
	gnbLayer.toggle();
	e.preventDefault();
});
var header = $('#header');
var gnb = $('.gnb');
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
	header.removeAttr('style');
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
	subLayer.stop().slideDown();
});
$('.snb .item_menu_wrap .item_menu_link').on('mouseleave',function(){
	var self = $(this);
	var subLayer = self.next('.item_menu_sub');
	subLayer.stop().slideUp();
});
$('.snb .item_menu_wrap .item_menu_sub').on('mouseover',function(){
	var self = $(this);
	self.stop().slideDown();
});
$('.snb .item_menu_wrap .item_menu_sub').on('mouseleave',function(){
	var self = $(this);
	self.stop().slideUp();
});

//HOME
var doc = $(document);
doc.on('scroll',function(e){
	var t = $(e.target);
	var tTop = t.scrollTop();
	console.log(tTop);
	if(tTop >= 300){
		header.addClass('active');
	}else if(tTop == 0){
		header.removeAttr('class');
	}
});


//TOWN
$('.section_faq .search_select .select_btn').on('click',function(e){
	var self = $(this);
	self.next().toggle();
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
	self.addClass('on').siblings().removeClass('on');
	e.preventDefault();
});




});
