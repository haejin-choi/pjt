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

});
