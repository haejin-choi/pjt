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
function slideDown(){
	lnb.show();
	lnb.stop().animate({
		opacity:1,
		height:250
	},{
		duration: 200,
		easing: "linear"
	})
}
function slideUp(){
	lnb.stop().animate({
		opacity:0,
		height:0
	},{
		duration: 200,
		easing: "linear",
		done:function(){
			lnb.hide();
		}
	})
}
function slideEvt(sw){
	if(sw == 1){
		slideDown();
	}else{
		slideUp();
	}
}
$('.gnb .gnb_item').on('mouseover',function(e){
	sw = 1;
	slideEvt(sw);
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
