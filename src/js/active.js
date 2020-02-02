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
	var doc = $(document);
	var header = $('#header');

	// function resize(){
	// 	win.on('resize',function(e){
	// 		var winW = win.width();
	// 	});
	// }
	// resize();
	// doc.trigger('resize');

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

	//HOME
	doc.on('scroll',function(){
		scrollStatus();
	});

});
