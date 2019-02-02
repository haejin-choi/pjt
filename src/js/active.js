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

});











//반응형
$(document).ready(function(e) {
	var viewport = $(document).width();
	if(viewport >= 1024){$(".realtime_srch .flick-panel").css('display','block');}
});
$(document).scroll(function(e){
	var schTab = $('header .sch_tab');
	var schHeight = schTab.outerHeight();
	console.log(schHeight);
	$('.api_ly_dimmed').hide();
	schTab.removeClass('open');
	$('.u_recognize').hide();
	if($('body').hasClass('api_animation') && !$('body').hasClass('open_autocomplete')){
		schTab.css('transform','translateY(-'+schHeight+'px)');
		if($(window).scrollTop() == 0){
			schTab.css('transform','translateY(0)');
		}
	}
});
//애니메이션
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
//공통탭메뉴
function tabMenu(self){
	self.attr("aria-selected",true).siblings().attr("aria-selected",false);
}
//검색창, 자동완성
var atcpWrap = $('.u_atcp_wrap');
atcpWrap.find('.u_sggt_wrap2,.u_atcp_area,.u_atcp_alert,.kwd_info').hide();
//검색창 포커스
$('.sch_inp,.type_white .sch .search_input').focus(function(){
	var self = $(this);
	if($("body").hasClass("type_floating")){
		$("body").addClass("open_autocomplete");
	}
	$('.sch').addClass('sch_write');
	if(!self.val() == ''){
		atcpWrap.find('.u_atcp_area').show();
	}else{
		atcpWrap.find('.u_sggt_wrap2').show();
	}
});
//검색창 입력
$('.sch_inp,.type_white .sch .search_input').on('keydown',function(e){
	atcpWrap.find('.u_sggt_wrap2').hide();
	atcpWrap.find('.u_atcp_area').show();
	console.log('aa');
});
//검색어 삭제
$('.sch_w .sch_btn.sch_del,.type_white .sch .btn_delete').click(function(){
	var self = $(this);
	self.parent().find('.sch_inp,.search_input').val('');
	atcpWrap.find('.u_sggt_wrap2').show();
	atcpWrap.find('.u_atcp_area').hide();
});
//최근검색어 전체삭제
$('.u_sggt_wrap2 .sggt_header .option a').on('click',function(e){
	var self = $(this);
	var wrap = self.parents('.sggt_fixer');
	wrap.addClass('type_off');
	wrap.find('.kwd_lst').hide();
	wrap.find('.kwd_off').hide();
	wrap.find('.kwd_none').show();
	e.preventDefault();
});
//최근검색어 자동저장끄기
$('.u_sggt_wrap2 .sggt_footer .opt_option a').on('click',function(e){
	var self = $(this);
	var wrap = self.parents('.sggt_fixer');
	if(self.text() == '자동저장 끄기'){
		self.text('자동저장 켜기');
		wrap.addClass('type_off');
		wrap.find('.kwd_lst').hide();
		wrap.find('.kwd_none').hide();
		wrap.find('.kwd_off').show();
	}else{
		self.text('자동저장 끄기');
		wrap.removeClass('type_off');
		wrap.find('.kwd_lst').show();
		wrap.find('.kwd_none').hide();
		wrap.find('.kwd_off').hide();
	}
	e.preventDefault();
});
//자동완성 끄기
$('.u_atcp_area .sggt_footer .opt_option a').on('click',function(e){
	var self = $(this);
	var wrap = $('.u_atcp_area');
	if(self.text() == '자동완성 끄기'){
		self.text('자동저장 켜기');
		wrap.find('.atcp_crt_w').hide();
		wrap.find('.u_atcp').hide();
		wrap.find('.u_atcp_plus').hide();
	}else{
		self.text('자동저장 끄기');
		wrap.find('.atcp_crt_w').show();
		wrap.find('.u_atcp').show();
	}
	e.preventDefault();
});
//자동완성 닫기
$('.opt_close a').click(function(e){
	if($("body").hasClass("type_floating")){
		$("body").removeClass("open_autocomplete");
	}
	atcpWrap.find('.u_sggt_wrap2,.u_atcp_area,.u_atcp_alert').hide();
	$('.sch').removeClass('sch_write');
	e.preventDefault();
});
//자동완성플러스
$('.u_atcp_plus .switch label').on('click',function(){
	var self = $(this).siblings('input');
	if(self.prop("checked")==false){
		self.prop("checked",false);
		$(".u_atcp_plus .layer_plus").show();
	}else{
		self.prop("checked",true);
	}
});
$(".u_atcp_plus .layer_plus").show();
$(".u_atcp_plus .layer_plus .btn_close").on("click",function(){
	$(".u_atcp_plus .layer_plus").hide();
});
//내위치 설정레이어
$('.mylct_layer .mylct_btn').click(function(){
	$(this).parents('body').find('.mylct_dmm,.mylct_dmm~div').hide();
});
//소셜플러그인
$(function(){
	$('.scial_area').hide();
	$('.scial_area,#naver-splugin-wrap,.naver-splugin-dimmed').hide();
});
var
iBodyHeight = $('body').height(),
oDimmed = $('.naver-splugin-dimmed'),
oPluginWrap = $('#naver-splugin-wrap,.naver-splugin-dimmed');
$('.u_cont .u_social,.atcp_eatery button.btn,.sp_map .menu_area .tablink_sns').click(function(){
	iBodyHeight = $('body').height();
	oDimmed.css({'height': iBodyHeight + 'px','margin-top' : '-' + iBodyHeight + 'px'});
	oDimmed.find('div').css('height', iBodyHeight + 'px');
	oPluginWrap.show();
});
$('.spi_card .spi_cls').click(function(){
	oPluginWrap.hide();
});
//좋아요
$('.api_btn_tg').click(function(){
	var oLink = $(this).parents('.api_group_like'),
		oLayer = $('.api_like_box,.api_time_line');
	if(!oLink.hasClass('selected')){
		oLink.addClass('selected');
		oLayer.show();
	}else{
		oLink.removeClass('selected');
		oLayer.hide();
	}
	return false;
});
$('.api_btn_like').click(function(){
	var oLinkLike = $(this);
	oLinkLike.find('.api_like_ico').toggleClass('ani_on');
	oLinkLike.toggleClass('f_heart');
	return false;
});
$('.api_btn_like2').click(function(){
	var oLinkLike = $(this);
	oLinkLike.find('.api_like_ico').toggleClass('ani_on');
	oLinkLike.toggleClass('f_heart');
	return false;
});
//좋아요 신규
$('a.api_common_like').click(function(){
	var oLinkLike = $(this);
	oLinkLike.find('.api_like_ico').toggleClass('ani_on');
	oLinkLike.toggleClass('f_heart');
	return false;
});
//연관검색어
$('.sp_keyword .bt_more').click(function(){
	var oClick = $(this);
	if(oClick.parents('.sp_keyword').hasClass('open')){
		oClick.parents('.sp_keyword').removeClass('open');
		oClick.text('펼치기');
	}else{
		oClick.parents('.sp_keyword').addClass('open');
		oClick.text('접기');
	}
});
//B급검색
$('.sp_keyword .btype .bt_toggle').click(function(){
	var oParent=$(this).parent(),
		oClick=$(this);
	if(!oParent.hasClass('open')){
		oParent.addClass('open');
		oClick.text('접기');
	}else{
		oParent.removeClass('open');
		oClick.text('펼치기');
	}
});
//하단 실시간급상승,핫토픽키워드
$('.realtime_srch .tab_menu .tab').click(function(){
	var
	oClick=$(this).parents('.realtime_srch');
	oPrt=$(this).parents('.realtime_srch').find('.flick-view2'),
	oPrt2=$(this).parents('.realtime_srch').find('.flick-view:eq(0)'),
	oHeight=$(this).parents('.realtime_srch').find('.flick_kwd');
	oHotkwd=$(this).parent().find('.bt_hotkwd');
	intTab = $(this).index();

	oClick.find('.tab_menu a').removeClass('selected');
	oClick.find('.cmm_dpgs .cmm_dp').removeClass('cmm_dp_on');
	oPrt.find('.flick-panel').hide();
	oPrt2.find('.flick-panel').hide();
	oHotkwd.hide();
	oHeight.css('height','197px');

	switch(intTab){
		case 1:
			oPrt.find('.flick-panel:eq(1)').show();
			oPrt2.find('.flick-panel:eq(2)').show();
			oClick.find('.cmm_dpgs .cmm_dp:eq(1)').addClass('cmm_dp_on');
			oHotkwd.show();
			break;
		case 2:
			oPrt.find('.flick-panel:eq(2)').show();
			oPrt2.find('.flick-panel:eq(4)').show();
			oClick.find('.cmm_dpgs .cmm_dp:eq(2)').addClass('cmm_dp_on');
			oHeight.css('height','241px');
			break;
		default:
			oPrt.find('.flick-panel:eq(0)').show();
			oPrt2.find('.flick-panel:eq(0)').show();
			oClick.find('.cmm_dpgs .cmm_dp:eq(0)').addClass('cmm_dp_on');
		}
	$(this).addClass('selected');
	return false;
});
//최상단 탭검색 메뉴
$('.sch_tab .lst_sch li a').click(function(){
	var oClick = $(this);
	oClick.parents('.lst_sch').find('a').removeClass('selected').removeAttr("aria-selected");
	oClick.addClass('selected').attr("aria-selected",true);
});
$(".sch_tab .btn_tab_more").on("click",function(){
	var self  = $(this);
	self.parents(".sch_tab").addClass("open");
	$('.u_recognize').hide();
	$('header .sch_tab').removeAttr('style');
	return false;
});
$(".sch_tab .lst_sch .bx .api_option_my").on("click",function(e){
	var self = $(this);
	var layer = self.parents(".sch_tab_inner").siblings(".ly_api_info");
	layer.toggle();
	e.preventDefault();
})
$(".sch_tab .tab_option .option_area .api_option_my").on("click",function(e){
	var self = $(this);
	var layer = self.parents(".tab_option").find(".ly_api_info");
	layer.toggle();
	e.preventDefault();
});
$('.u_recognize_srch .rcre_hd .rcre_ac').eq(0).hide();
$('.u_recognize_srch .rcre_hd .rcre_ac').click(function(){
	$(this).siblings('.rcre_ac').show();
	$(this).hide();
	return false;
});
$('.sch_tab .bt_sch,.sch_tab .bt_tabsch').click(function(){
	var oBtSch = $(this);
	if(!oBtSch.parents('.sch_tab').hasClass('open')){
		oBtSch.parents('.sch_tab').addClass('open');
	}else{
		oBtSch.parents('.sch_tab').removeClass('open');
	}
});
$('.sch_tab .tab_option a.option_area,.sch_tab .tab_option .option').on('click',function(){
	var self=$(this),
		oOption=self.parents('body').find('#snb .group_option_total'),
		oOption2=self.parents('body').find('#snb .type_option_total');
	self.parents('.sch_tab').removeClass('open');
	if(oOption.is(':hidden')){
		oOption.show();
	}else{
		oOption.hide();
	}
	if(oOption2.is(':hidden')){
		oOption2.show();
	}else{
		oOption2.hide();
	}
	return false;
});
$('#snb .group_option_total .bt_option_more').on('click',function(){
	var self=$(this),
		oOption=self.parent('#snb .group_option_total');
	oOption.hide();
});
//탭검 하단 더보기
$('a.u_pg_btn').click(function(){
	var oClick=$(this).find('.u_pg_new');
	if(oClick.hasClass('u_pg_new_loading')){
		oClick.removeClass('u_pg_new_loading');
	}else{
		oClick.addClass('u_pg_new_loading');
	}
	return false;
});
//하단 가가버튼
var fontIndex = 0;
$('.api_footer .footer_tool .item:eq(1) .link,.api_footer .footer_tool .item:eq(2) .link').click(function(){
	var
		self = $(this),
		oRoot = $('html'),
		oParent = self.parents('.footer_tool')
	;
	if(self.find('i').hasClass('ico_big')){
		if(fontIndex >= 4){
			fontIndex == 3;
		}else{
			fontIndex++;
		}
	}else{
		if(fontIndex < 1){
			fontIndex == 1;
		}else{
			fontIndex--;
		}
	}
	oRoot.removeAttr('class');
	oParent.find('.item:eq(1) .link,.item:eq(2) .link').removeClass('dimmed');
	switch(fontIndex){
		case 0 :
			oParent.find('.item:eq(1) .link').addClass('dimmed');
			break;
		case 1 :
			oRoot.addClass('fzoom');
			break;
		case 2 :
			oRoot.addClass('fzoom2');
			break;
		case 3 :
			oRoot.addClass('fzoom3');
			break;
		case 4 :
			oRoot.addClass('fzoom4');
			self.addClass('dimmed');
			break;
		default:
			break;
	}
	return false;
});
//타이틀 우측 공통UIO
$('.subscript_option a.txt').click(function(){
	var $this=$(this);
	$this.addClass('selected').parent().find('.selected').not($this).removeClass('selected');
	return false;
});
//데이터랩
$(".gg_btn").on("click",function(){
	var self=$(this);
	$(".api_ly_popup,.api_ly_dimmed").toggle();
	return false;
});
//검색옵션
$('.api_group_option .bt_more').click(function(){
	var obj = $(this).parents('.api_group_option');
	if(obj.hasClass('open')){
		obj.removeClass('open');
		$(this).text('펼치기');
	}else{
		obj.addClass('open');
		$(this).text('접기');
	}
});
$('.api_group_option .lst_option li .option .txt').click(function(){
	var oClick=$(this),
		indexSelect = oClick.text().slice(0,2);

	oClick.parents('.lst_option').find('.api_select_option').hide();
	oClick.parent().find('.txt').removeClass('selected opened').removeAttr('aria-selected');
	oClick.addClass('selected').attr("aria-selected",true);

	if(oClick.hasClass('txt_option')){
		if(oClick.hasClass('opened')){
			oClick.removeClass('opened');
		}else{
			oClick.parent().find('.txt').removeClass('selected opened');
			oClick.addClass('opened');
			if(indexSelect == '1시'){
				oClick.parents('li').find('.api_select_option').show();
				oClick.parents('li').find('.api_select_option.type_calendar').hide();
			}else if(indexSelect == '직접'){
				oClick.parents('li').find('.api_select_option.type_calendar').show();
			}else if(indexSelect == '20'){
				oClick.parents('li').find('.api_select_option.type_calendar').show();
			}else if(indexSelect == '언론'){
				oClick.parents('li').find('.api_select_option.type_group').show();
			}else if(indexSelect == '가나'){
				oClick.parents('li').find('.api_select_option.type_dictionary').show();
			}else if(indexSelect == '분야'){
                oClick.parents('li').find('.api_select_option.type_category').show();
            }
		}
	}
	return false;
});
$('.api_select_option .btn_area .btn_apply').on('click',function(e){
	var $this=$(this),
		$parents=$this.parents('li');
	if($parents.hasClass('term')){
		$parents.find('.option .opened').removeClass('opened').attr("aria-selected",true).html('2016.01.26. ~ 2016.01.26.<i class="spnew ico_check">옵션<em class="open">펼치기</em><em class="close">접기</em></i>');
		$parents.find('.api_select_option').hide();
	}
	e.preventDefault();
});
$('.api_select_option .set_calendar .set .ico_calendar').on('click',function(e){
	var $this=$(this);
	$this.parent().siblings().find('.ico_calendar').attr("aria-selected",false);
	$this.attr("aria-selected",true);
	e.preventDefault();
});
$('.api_group_option .lst_option li .option .option_color label').click(function(){
	var oClick=$(this);
	oClick.parents('.option_color').find('label').removeClass('selected');
	oClick.parents('.option_color').find('input').prop("checked",false);
	oClick.addClass('selected');
	oClick.find('input').prop("checked",true);
});

$('.api_select_option .select_area .item .link').on('click',function(e){
	var $this=$(this);
	$this.parents('.lst_item').find('.item').attr("aria-selected",false);
	$this.parent('.item').attr("aria-selected",true);
	e.preventDefault();
});
$(".ly_api_select").siblings("#aa").on("click",function(){
	var $this=$(this),
		$status=$this.attr("aria-expanded"),
		$layer=$this.siblings(".ly_api_select");
	if($status == "false"){
		$this.attr("aria-expanded","true");
		$this.text("셀렉트닫기");
		$layer.attr("aria-hidden","false");
	}else{
		$this.attr("aria-expanded","false");
		$this.text("셀렉트열기");
		$layer.attr("aria-hidden","true");
	}
	return false;
});
//공통_저장하기
$('.api_save_group .btn_save,.api_save_group .btn_save_cs,.api_save_group .btn_save_view').on('click',function(e){
	var self=$(this);
	var layer=self.next(".api_ly_save");

	$('.api_save_group .btn_save,.api_save_group .btn_save_cs,.api_save_group .btn_save_view').attr('aria-pressed',false);
	self.attr('aria-pressed',true);

	if(self.hasClass('dimmed')){
		self.parent().next('.ly_api_info').toggle();
	}else{
		if(layer.is(":hidden")){
			layer.show().delay(1).queue(function(){
				layer.addClass("ani_fadein").dequeue();
			});
		}else{
			layer.removeClass("ani_fadein").addClass("ani_fadeout").one("webkitAnimationEnd",function(){
				layer.hide().removeClass("ani_fadeout");
			});
		}
	}
	e.preventDefault();
});
$('.api_save_group .api_ly_save .item_save').on('click',function(e){
	var self=$(this),
		selfTxt=self.text(),
		btnSave=self.parent().prev('.btn_save,.btn_save_cs,.btn_save_view');

	if(!self.hasClass("dimmed")){
		if(selfTxt=='저장하기'){
			self.addClass('active');
			self.text('저장되었습니다.');
			btnSave.addClass('active');
		}else if(selfTxt=='저장되었습니다.'){
			self.addClass('active');
			self.text('저장된 문서입니다.');
		}else{
			self.removeClass('active');
			self.text('저장하기');
			btnSave.removeClass('active');
		}
	}
	e.preventDefault();
});
//검색필터
$(".api_group_option_filter .list_option_filter .item").on("click", function(e){
	var self = $(this);
	tabMenu(self);
	e.preventDefault();
});
$('.api_group_option_sort').hide();
$('.api_group_option_sort .lst_option .bx .option .txt').click(function(e){
	var oClick=$(this),
		indexSelect = oClick.text().slice(0,2);

	oClick.parents('.lst_option').find('.api_select_option').hide();
	oClick.parent().find('.txt').removeClass('opened').attr("aria-selected",false);
	oClick.attr("aria-selected",true);

	if(oClick.hasClass('txt_option')){
		if(oClick.hasClass('opened')){
			oClick.removeClass('opened');
		}else{
			oClick.parent().find('.txt').removeClass('opened');
			oClick.addClass('opened');
			if(indexSelect == '1시'){
				oClick.parents('li').find('.api_select_option').show();
				oClick.parents('li').find('.api_select_option.type_calendar').hide();
			}else if(indexSelect == '직접'){
				oClick.parents('li').find('.api_select_option.type_calendar').show();
			}else if(indexSelect == '20'){
				oClick.parents('li').find('.api_select_option.type_calendar').show();
			}else if(indexSelect == '언론'){
				oClick.parents('li').find('.api_select_option.type_group').show();
			}else if(indexSelect == '가나'){
				oClick.parents('li').find('.api_select_option.type_dictionary').show();
			}else if(indexSelect == '분야'){
                oClick.parents('li').find('.api_select_option.type_category').show();
            }
		}
	}
	e.preventDefault();
});
$('.api_group_option_sort .btn_area .btn_apply').on('click',function(e){
	var $this=$(this),
		$parents=$this.parents('li');
	if($parents.hasClass('term')){
		$parents.find('.option .opened').removeClass('opened').attr("aria-selected",true).html('2016.01.26. ~ 2016.01.26.<i class="spnew ico_check">옵션<em class="open">펼치기</em><em class="close">접기</em></i>');
		$parents.find('.api_group_option_sort').hide();
	}
	e.preventDefault();
});
$('.api_group_option_sort .set_calendar .set .ico_calendar').on('click',function(e){
	var $this=$(this);
	$this.parent().siblings().find('.ico_calendar').attr("aria-selected",false);
	$this.attr("aria-selected",true);
	e.preventDefault();
});
$('.api_group_option_sort .lst_option li .option .option_color label,.api_group_option_filter .option_color label').click(function(){
	var oClick=$(this);
	oClick.parents('.option_color').find('label').removeClass('selected');
	oClick.parents('.option_color').find('input').prop("checked",false);
	oClick.addClass('selected');
	oClick.find('input').prop("checked",true);
});
$('.api_group_option_sort .bt_close').on('click',function(e){
	var self = $(this);
	var filter = self.parents('#snb').find('.api_group_option_filter');
	self.parent().hide();
	filter.show();
	e.preventDefault();
});
$('.api_group_option_filter .list_option_filter .option_filter .btn_option').on('click',function(e){
	var self = $(this);
	var filter = self.parents('#snb').find('.api_group_option_filter');
	self.parents('#snb').find('.api_group_option_sort').show();
	filter.hide();
	e.preventDefault();
});
//동영상
$('.sp_nvideo .video_list .link_area').on('click', function () {
    var item = $(this).parents('.video_item');
    var className = 'video_on';
    if (item.find('.quick').length > 0) {
        if (item.hasClass(className)) {
            item.removeClass(className);
        }
        else {
            item.siblings().removeClass(className);
            item.addClass(className);
        }
    }
    return false;
});
$('.sp_nvideo .list_video .thumb_area').on('click', function () {
    var item = $(this).parents('.bx');

    if (item.find('.quick').length > 0) {
        if (item.siblings().hasClass('video_on')) {
            item.siblings().removeClass('video_on');
        }
        item.toggleClass('video_on');
    }

    if (item.parent().children().hasClass('video_on')) {
        item.parents('.sp_video_wrap').addClass('player_on')
    }
    else {
        item.parents('.sp_video_wrap').removeClass('player_on')
    }
    return false;
});
$('.sp_nvideo .video_default_list .thumb_area')
	.add($('.sp_nvideo .video_default_list .common_video_player_wrap')).on('click',function (e) {

	var item = $(this).parents('.video_item');

	if(item.find('.quick').length > 0) {
		item.toggleClass('player_on');
	}

	return false;
});
$('.sp_nvideo .video_clip_list .thumb_area').on('click',function (e) {

	var item = $(this).parents('.video_clip_item');

	if(item.find('.quick').length > 0) {
		item.toggleClass('player_on');
	}

	return false;
});
//이미지
$('.sp_image .group_view .scroll_area,.sp_image .group_list').css({'overflow':'auto','-webkit-overflow-scrolling':'touch'});
$('.sp_image .group_list .lst_img li a').click(function(){
	oClick = $(this);
	oClick.parents('ul').find('li a').removeClass('selected');
	oClick.addClass('selected');
	return false;
});
if($('.sp_image .group_album .type_carousel')){
	var groupAlbum = $('.sp_image .group_album .type_carousel');
	groupAlbum.find('>div').css({'overflow':'auto','height':groupAlbum.height()+'px','-webkit-overflow-scrolling':'touch'});
	var listAlbum = groupAlbum.find('.lst_album'),
		albumWidth = 0;
	listAlbum.children().each(function(){
		albumWidth += $(this).width();
	});
	listAlbum.css('width',albumWidth+'px');
}
$('.sp_image .group_timeline .timeline_more,.sp_image .group_restaurant .photo_more').on('click',function(){
	var oClick=$(this);
	oClick.parents(".api_bx").removeClass('fold');
	oClick.hide();
	return false;
});
if($('.sp_image .restaurant_photo .lst_photo')){
	var listPhoto = $('.sp_image .restaurant_photo .lst_photo'),
		totalWidth = 0;
	listPhoto.children().each(function(){
		totalWidth += $(this).width();
	});
	listPhoto.css('width',totalWidth+'px');
}
if($('.api_ly_popup')){
	$('.api_ly_popup').hide();
}
if($('.api_ly_dimmed')){
	$('.api_ly_dimmed').hide();
}
$('.sp_image .ico_data').click(function(){
	$('.api_ly_dimmed').show();
	$('.api_ly_popup').show();
	$($('.api_ly_popup').children()[0]).show();
	return false;
});
$('.popup_datalab .popup_close').click(function(){
	var popupModal = $(this).parents('.api_ly_popup');
	popupModal.hide();
	$('.api_ly_dimmed').hide();
	return false;
});
$('.sp_image .link_img_more').on("click",function(){
	$(this).parent().find('.link_img_more').toggle();
	return false;
});

//뮤직
var $musicArea = $('.sp_nmusic  .graph_area, .sp_nmusic  .lyrics_area, .sp_nmusic  .info_area');
$musicArea.hide();
$('.sp_nmusic .tab_list .item').attr('aria-selected', 'false');
$('.sp_nmusic .tab_list .item').on('click', function(){
	var self = $(this),
		indexNum = self.index();
		$musicArea = self.parents(".group_music").find(".graph_area,.lyrics_area,.info_area");

		self.siblings().attr('aria-selected', 'false');
		self.attr('aria-selected', 'true');
		$musicArea.hide();
	if (indexNum == 0) {
		$musicArea.eq(0).show();
	} else if (indexNum == 1) {
		$musicArea.eq(1).show();
	} else if (indexNum == 2) {
		$musicArea.eq(3).show();
	}
	return false;
});
$('.sp_nmusic .solo .album_view .jacket_control .btn_control:first-child').on('click', function(){
	$('.sp_nmusic .solo .album_view a.jacket').toggleClass('play');
	return false;
});
$('.sp_nmusic a.jacket').on('click', function() {
    $(this).toggleClass('play');
    return false;
});
$('.sp_nmusic .lyrics_area.type_short .btn_open').on('click', function(){
    $(this).parents('.lyrics_area').removeClass('type_short');
    return false;
});

$('.sp_nmusic .lyrics_area.type_short .btn_close').on('click', function(){
    $(this).parents('.lyrics_area').hide();
    return false;
});
$('.sp_nmusic .realtime_list .detail_area .dsc_group .btn_mv').on('click', function(){
	$(this).attr('aria-expanded','true');
	$(this).parents('.realtime_item_inner').siblings('.video_common_player_wrap').show();
	return false;
});
$('.sp_nmusic .realtime_list .video_common_player_wrap .btn_close').on('click', function(){
	$(this).parents('.realtime_item').find('.btn_mv').attr('aria-expanded','false');
	$(this).parents('.video_common_player_wrap').toggle();
	return false;
});
//등수놀이
$('.cs_rankplay .chk_lst').attr('style','height:190px');
$('.cs_rankplay .lrm button').click(function(){
	if($('.cs_rankplay .lrm button:eq(1)').is(':visible')){
		$('.cs_rankplay .chk_lst').attr('style','height:190px');
		$('.cs_rankplay .lrm button:eq(0)').show();
		$('.cs_rankplay .lrm button:eq(1)').hide();
	}else{
		$('.cs_rankplay .chk_lst').attr('style','height:auto');
		$('.cs_rankplay .lrm button:eq(0)').hide();
		$('.cs_rankplay .lrm button:eq(1)').show();
	}
});
$('.cs_rankplay .bottom_area .bt_cmmt').click(function(){
	var $this=$(this);
	$this.parents('.bt_area').toggleClass('on');
	return false;
});
$('.cs_rankplay .bx_play,.cs_rankplay .bx_sympathy').click(function(){
	$(this).hide();
});
//가볼만한곳
$('.sp_region .csr_info .csr_ctr .bt_map').click(function(){
	$(this).parents('.csr_info').toggleClass('vi_map');
});
//어학사전
$('.sp_dic .sub_wrap .ic_help').click(function(){
	var oClick=$(this);
	$(this).parents('.api_bx').addClass('ly_on');
	return false;
});
$('.sp_dic .ly_area .btn_close').click(function(){
	var oClick=$(this);
	oClick.parent().parent().removeClass('ly_on');
	return false;
});
$('.sp_dic .tablink.spdc_af').click(function(){
	var $parent=$(this).parent();
	$parent.toggleClass('on');
	$parent.parent().next().toggle();
	return false;
});
$('.sp_dic button.speak').click(function(){
	$(this).toggleClass('play');
});
$('.sp_dic .dsc_more').click(function(){
	$(this).parent().toggleClass('menu_unfold');
});
//주변핫검색
$('.sp_hotkwd .group_hotkwd .head .bt_more').click(function(){
	var obj = $(this).parents('.group_hotkwd');
	if(obj.hasClass('open')){
		obj.removeClass('open');
		$(this).text('펼치기');
	}else{
		obj.addClass('open');
		$(this).text('접기');
	}
});
//결과없음
$('.sp_noresult .group_noresult .bx_area.parcel .bx').click(function(){
	$(this).parent().toggleClass('open');
	return false;
});
//지식쇼핑
if($('.sp_shop .cd_shop .type_flick').hasClass('type_flick')){
	var $flickbase=$('.sp_shop .cd_shop .type_flick');
	$flickbase.each(function(){
		var
			$this=$(this),
			$flickroot=$this.find('>div'),
			$flickct=$flickroot.find('>.type_bx')
		;
		$this.css({'overflow-x':'auto','-webkit-overflow-scrolling':'touch'});
		if($flickroot&&$flickct){
			var nFlickCount=$flickct.length;
			$flickroot.css('width',nFlickCount*100+'%');
			$flickct.css('width',100/nFlickCount+'%');
		}
	});
}
if($('.sp_shop_hotbrand')){
	var
		$poproot=$('.sp_shop_hotbrand .hotbrand'),
		nPopitem=$('.sp_shop_hotbrand .type_bx').length,
		$popmore=false,nPopmoreWidth=0;
		if($('.sp_shop_hotbrand .type_bx:eq('+nPopitem+')').find('>.lst_more')){
			nPopitem=nPopitem-1;
			$popmore=$('.sp_shop_hotbrand .type_bx:eq('+nPopitem+')');
			nPopmoreWidth=$popmore.width();
		}
	$poproot.find('.brand_wrap').css({'overflow':'auto','-webkit-overflow-scrolling':'touch'});
	$poproot.find('.brand_wrap>div').css({'width':nPopitem*100+'%'});
	$poproot.find('.type_bx').css({'width':100/nPopitem+'%'});
	if($popmore){
		$poproot.find('.brand_wrap>div').css({'padding-right':nPopmoreWidth+'px'});
		$popmore.css({'width':nPopmoreWidth+'px','margin-right':'-'+nPopmoreWidth+'px'});
	}
	$('.rankscl_area').css({'overflow-x':'auto','-webkit-overflow-scrolling':'touch'});
}
$('.sp_shop .hotdeal .type_carousel').css({'overflow':'auto','-webkit-overflow-scrolling':'touch'});
//지식쇼핑_상품정답형
$('.sp_shop .correct .lst_tab li a').click(function(){
	var oClick = $(this);
	oClick.parents('.lst_tab').find('a').removeClass('selected');
	oClick.addClass('selected');
	return false;
});
$('.sp_shop .correct .flick_wrap').css({'height':'274px','overflow-x':'auto','-webkit-overflow-scrolling':'touch'});
$('.sp_shop .recommend .carousel_area').css({'overflow-x':'auto','-webkit-overflow-scrolling':'touch'});
$('.sp_shop .correct .flick_wrap>div').css({'width':'700%'});
$('.sp_shop .correct .flick_wrap>div>div').css({'float':'left','width':'14.2857%'});
//지식쇼핑_핫딜
$('.sp_shop_hotdeal .hotdeal .type_carousel').css({'overflow':'auto','-webkit-overflow-scrolling':'touch'});
$('.sp_shop .recommend .btn_more').click(function(){
	var oClick=$(this);
	if(!oClick.parent().hasClass('on')){
		oClick.parent().addClass('on');
		oClick.text('추천상품 닫기');
	}else{
		oClick.parent().removeClass('on');
		oClick.text('추천상품 열기');
	}
});

// 쇼핑 핫이슈
if($('.sp_shop_hotissue .flick-container')){
	$('.sp_shop_hotissue .flick-container').each(function(){
		var
			$oFContainer=$(this),
			$oFRoot=$oFContainer.parent(),
			$oFChild=$oFContainer.children(),
			nFHeight=$oFContainer.children(':first').height()
		;
		$oFRoot.css({'overflow':'hidden','overflow-x':'auto','-webkit-overflow-scrolling':'touch','height':(nFHeight+'px')});
		if(($oFContainer.attr('style') == undefined ) || ($oFContainer.attr('style').search('width') < 0)){
			$oFContainer.css({'width':$oFChild.length*100+'%'});
			$oFChild.css({'width':100/$oFChild.length+'%'});
		}
		$oFRoot.on({'scroll':function(event){
			var $oFScroll=$oFScroll||{};
			$oFScroll.oTarget=event.target;
			$oFScroll.nScrollLeft=$oFScroll.oTarget.scrollLeft;
			$oFScroll.nScrollWidth=$oFScroll.oTarget.scrollWidth;
			$oFScroll.nFWidth=Math.round($oFScroll.nScrollWidth/$oFChild.length);
			$oFScroll.nScrollWidth=$oFScroll.nScrollWidth-$oFScroll.nFWidth;
			$oFScroll.nNow=Math.round($oFScroll.nScrollLeft/$oFScroll.nFWidth);
			$oFRoot.css({'height':$oFContainer.children(':eq('+$oFScroll.nNow+')').height()+'px'});
			$oFScroll=null;
		}});
	});
}
//쇼핑 기본형
$('.sp_shop_default .tab_component li a,.sp_shop_default .tab_content ul li a').click(function(){
	var oClick=$(this);
	oClick.parents('ul').find('li').removeClass('on');
	oClick.parent().addClass('on');
	return false;
});
$('.sp_shop_default .shop_loading').click(function(){
	$(this).hide();
	return false;
})
// 쇼핑 가전형
$('.sp_shop_appliance .list_option li>a').click(function(){
	var category = $(this).parents('li');
	category.parent().find('.on').removeClass('on');
	category.addClass('on');
	return false;
});
$('.sp_shop_appliance .option_subject .list_subject li>a').click(function(){
	var subject = $(this).parents('li');
	subject.parent().find('.on').removeClass('on');
	subject.addClass('on');
	subject.siblings().addClass('off');
	return false;
});
if($('.sp_shop_appliance .tab_selection .list_selection')){
	var selectedOption = $('.sp_shop_appliance .tab_selection .list_selection'),
		totalWidth = 1;
	selectedOption.children().each(function(){
		totalWidth += $(this).width();
	});
	selectedOption.css('width',totalWidth+'px');
}
$('.sp_shop_appliance .option_selection .list_selection').hide();
$('.sp_shop_appliance .option_selection .selection_guide').click(function(){
	$(this).hide();
	$(this).parent().find('.list_selection').show();
});
if($('.shop_appliance')){
	var appliance = $('.shop_appliance>div').not('.appliance_paging,.shop_noresult');
	appliance.css('height',appliance.height()+'px');
}
//쇼핑 선물
$('.sp_shop_gift .gift_menu_main li,.sp_shop_gift .gift_menu_sub li').on('click',function(){
	$(this).parent().find('[aria-selected]').removeAttr('aria-selected');
	$(this).attr('aria-selected','true');
	return false;
});
$('.sp_shop_gift .sort_target_list a,.sp_shop_gift .sort_ranking_list a').click(function(){
	$(this).parents('ul').find('[aria-selected]').removeAttr('aria-selected');
	$(this).parent().attr('aria-selected','true');
	return false;
});
// 쇼핑 데모별 검색
$('.sp_shop_customize .shop_custom_tab .info_custom').click(function(){
	$(this).parents('.shop_custom_tab').toggleClass('open');
	return false;
});
$('.sp_shop_customize .shop_custom_tab .tab_age a').click(function(){
	$(this).parent().parent().find('.on').removeClass('on');
	$(this).addClass('on');
	return false;
});
// 쇼핑 운동화
$('.sp_shop_sneakers .custom_tab .target').click(function(){
	$(this).parents('.list_target').find('.on').removeClass('on');
	$(this).parents('li').addClass('on');
	return false;
});
$('.sp_shop_sneakers .tab_brand .list_brand a,.sp_shop_sneakers .tab_brand .list_series a').click(function(){
	$(this).parents('ul').find('.on').removeClass('on');
	$(this).parents('li').addClass('on');
	return false;
});
$('.sp_shop_sneakers .tab_brand .tab_more').click(function(){
	$(this).toggleClass('on');
	$('.sp_shop_sneakers .product_tab').toggleClass('unfold');
	return false;
});
$('.sp_shop_sneakers .tab_category .list_category li>a').click(function(){
	$(this).parents('.list_category').find('.on').removeClass('on');
	$(this).parents('li').addClass('on');
	return false;
});
$('.sp_shop_sneakers .tab_category .detail').click(function(){
	$(this).parents('.list_detail').find('.on').removeClass('on');
	$(this).parents('li').addClass('on');
	return false;
})
if($('.sp_shop_sneakers .product_group')){
	$('.sp_shop_sneakers .product_group').each(function(){
		var panel = $(this).find('.carousel_area');
		panel.css('height',panel.height()+'px');
	});
}
// 쇼핑 선물
$('.sp_shop_gift .gift_title_area .btn_ico').click(function(){
	$('.sp_shop_gift .gift_title_area .ly_api_info').show();
});
// 넌센스퀴즈
$('.sp_nonsense .bottom_area .bt_cmmt').click(function(){
	var $this=$(this);
	$this.parents('.bt_area').toggleClass('on').parent().find('>.u_cbox').toggle();
	return false;
});
//포스트
$('.sp_post .type_flick').each(function(){
	var $this=$(this);
	$this.css({
		'overflow':'auto',
		'-webkit-overflow-scrolling':'touch'
	});
	$this.find('.bx').css({
		'width':'308px'
	});
	$this.find('.lst_type').css({
		'width':'924px'
	});
});
if($('.sp_post .trip_post .lst_course')){
	var $this = $('.sp_post .trip_post .lst_course'),
		$oMore = $this.find('li.lst_more>*, li>.lst_more').parent(),
		$oChild = $this.find('li'),
		$nMoreWidth = $oMore.width(),
		$nChildWidth = $oChild.width(),
		$nMoreLen = $oMore.length,
		$nChildLen = $oChild.length - $nMoreLen,
		$nThisWidth = ($nChildLen * $nChildWidth) + ($nMoreLen * $nMoreWidth);
	$this.parent().css({'overflow':'auto','-webkit-overflow-scrolling':'touch'});
	$this.css({'width':$nThisWidth+'px'})
}
//tv속이상품
$('.sp_tv .scl_area,.sp_tv .flick_area').css({'overflow-x':'auto','-webkit-overflow-scrolling':'touch'});
$('.sp_tv .scl_area .scl_menu li .sptv_bf').click(function(){
	var oClick=$(this);
	oClick.parents('ul').find('a').removeClass('selected');
	oClick.addClass('selected');
	return false;
});
//지도
$('.sp_map .map_loading').click(function(){
	var oClick=$(this);
	oClick.hide();
	oClick.parent().removeClass('type_multi');
	oClick.parent().find('.map_static_area').show();
});
$('.sp_map .map_group .btn_map_more').click(function(){
	var oClick=$(this);
	oClick.parent().hide();
	oClick.parent().parent().addClass('type_multi');
	oClick.parent().parent().find('.map_area').show();
});
$('.sp_map .sub_dsc_area .btn_more').click(function(){
	$(this).parent().toggleClass('on');
});
$('.sp_map .type_multi .btn_exit').click(function(){
	var oClick=$(this);
	oClick.parent().parent().hide();
	oClick.parent().parent().parent().removeClass('type_multi');
	oClick.parent().parent().parent().find('.map_static_area').show();
});
//지도_프렌차이즈
$('.sp_nenterprise .map_area .api_btn_map').click(function(){
	var objThis = $(this);
	objThis.parents('.map_static').hide();
	objThis.parents('.map_static').siblings('.map_content').show();
});
//지도_뭐하지
if($('.sp_map_dowhat .dowhat_group')){
	var elCarousel = $('.sp_map_dowhat .dowhat_group .scroll_area');
	elCarousel.css({'overflow-x':'auto','-webkit-overflow-scrolling':'touch'});
	elCarousel.find('>div').css({'width':((elCarousel.find('ul').children().length*152)+6)+'px','height':'130px'})
}
$('.sp_map_dowhat .dowhat_group .dowhat_bx').click(function(){
	var elItem = $(this);
	elItem.parent().parent().find('.on').removeClass('on');
	elItem.addClass('on');
});
//지도_코스추천
$('.sp_map_recommend .paginate a').click(function(){
	$(this).toggleClass('on');
	return false;
});
//지도_2016개선
var oMapHeight = $(".sp_map .list_wrap .flick-wrap .bx .list_map").height();
$(".sp_map .list_wrap .flick-wrap").css("height",+oMapHeight+"px");
$(".sp_map .list_wrap .loc_info_sub_group .sub_dsc_area .btn_more_open").on("click",function(){
	var self=$(this),
		oParent=self.parents(".sub_dsc_area"),
		oChild=self.find(".spm"),
		Hlist=self.parents(".list_wrap").find(".list_map"),
		list_Wrap=self.parents(".list_wrap").find(".flick-wrap");

	if(oParent.hasClass("open")){
		oParent.removeClass("open");
		oChild.text("열기");
	}else{
		oParent.addClass("open");
		oChild.text("닫기");
	}
	list_Wrap.css("height",Hlist.height());
	return false;
});
$(".sp_map .other_loc_wrap .select_sch_again .select_title").on("click",function(){
	var	self=$(this),
		oParent=self.parents(".select_sch_again");
	if(oParent.hasClass("open")){
		oParent.removeClass("open");
		self.attr("aria-expanded","false");
	}else{
		oParent.addClass("open");
		self.attr("aria-expanded","true");
	}
	return false;
});
//뿜, 그라폴리오, 포토 갤러리
if($('.sp_bboom')||$('.sp_grafolio')||$('.sp_gallery')){
	var
		aGallery=[$('.sp_bboom'),$('.sp_grafolio'),$('.sp_gallery')],
		nWidth=aGallery[0].find('li:eq(0)').outerWidth(true)
	;
	for(var i in aGallery){
		var nItems=aGallery[i].find('li').not('.lst_more').length,
			nTrackWidth=nWidth*nItems;
		if(aGallery[i].find('.lst_more').hasClass('lst_more')){
			nTrackWidth+=$('.lst_more').outerWidth(true);
		}
		aGallery[i].find('.carousel_area').css({'overflow-x':'auto','-webkit-overflow-scrolling':'touch'}).children('ul').css({'width':nTrackWidth+'px'});
		nItems=null;
		nTrackWidth=null;
	}
	nWidth=null;
	$('.sp_bboom li:eq(0) a').click(function(){
		$('.api_dim').show();
		event.returnValue=false;
	});
	$('.api_dim').click(function(){
		$(this).hide();
	});
}
//지식백과
$('.sp_kindic .menu_area .menu_tab li:eq(1) .tablink').click(function(){
	$(this).parent().hide();
	return false;
});
$('.sp_kindic .map_loading').click(function(){
	$(this).hide();
	$('.sp_kindic .map_static').show();
})
$('.sp_kindic .map_static .btn_map_wide').click(function(){
	$('.sp_kindic .map_static').hide();
	$('.sp_kindic .map_wide').show();
});
$('.sp_kindic .map_wide .btn_close').click(function(){
	$('.sp_kindic .map_static').show();
	$('.sp_kindic .map_wide').hide();
});
$('.sp_kindic .list_etymology .kindic_tit').click(function(){
	$(this).toggleClass('open');
	return false;
})
$('.sp_kindic .kindic_structure .thumb_loading').click(function(){
	$(this).css('display','none');
	$(this).parent().find('>img').css('display','block');
});
$('.sp_kindic .popular_kindic .more_popular').click(function(){
	$(this).siblings(".popular_lst,.formula_lst").toggleClass('unfold');
	return false;
});
if($('.sp_kindic .carousel_area')){
	var carouselArea = $('.sp_kindic .carousel_area');
	carouselArea.css({'overflow-x':'auto','-webkit-overflow-scrolling':'touch'});
	carouselArea.each(function(){
		var carouselWidth = 0;
		$(this).find('ul').children().each(function(){
			carouselWidth += $(this).width();
		});
		$(this).find('ul').css({'width':carouselWidth+'px','height':carouselArea.find('li').height()+'px'});
	});
}
$('.sp_kindic .kindic_tit .btn_sound').click(function(){
	$(this).toggleClass('play');
	return false;
});
$('.sp_kindic .kindic_more').click(function(){
	var visualDic = $(this).parent();
	visualDic.toggleClass('unfold');
	return false;
});
$('.sp_nkindic .image_content .image_area.type_map').hide();
var imageMap = $('.sp_nkindic .image_content .image_area.type_map');
imageMap.eq(0).show();
$('.sp_nkindic .image_area.type_map .loading_box').on('click', function(){
	imageMap.eq(0).hide();
	imageMap.eq(1).show();
	return false;
});
$('.sp_nkindic .image_area.type_map .api_ico_expand').on('click', function(){
	imageMap.eq(1).hide();
	imageMap.eq(2).show();
	return false;
});
$('.sp_nkindic .image_area.type_map .api_ico_expand_close').on('click', function(){
	imageMap.eq(2).hide();
	imageMap.eq(1).show();
	return false;
});
$('.sp_nkindic .nkindic_another .info_layer').hide();
$('.sp_nkindic .nkindic_another .btn_info').on('click', function(){
	$(this).parents().siblings('.info_layer').show();
	return false;
});
$('.sp_nkindic .nkindic_another .info_layer .info_layer_close').on('click', function(){
	$(this).parents('.info_layer').hide();
	return false;
});

//행복검색
$('.sp_happy_kia .spot_happy #mflick').css({'overflow-x':'auto','-webkit-overflow-scrolling':'touch','height':'420px'});
$('.sp_happy_kia .spot_happy .flick-container').css({'width':'300%'});
$('.sp_happy_kia .spot_happy .flick-container .flick-ct').css({'width':'33.3%','height':'100%'});

//부동산
$(".sp_nland .nland_common_location .wrap .api_select_option").show();
$(".sp_nland .nland_common_props .sub_dsc_area .btn_more").on("click",function(){
	var $this=$(this),
	$parent=$this.parent(),
	$status=$parent.attr("aria-expanded"),
	$layer=$parent.siblings(".sub_dsc_area");
	if($status == "false"){
		$parent.attr("aria-expanded","true");
		$this.find("i").text("주소 접기");
		$layer.attr("aria-hidden","false");
	}else{
		$parent.attr("aria-expanded","false");
		$this.find("i").text("주소 펼치기");
		$layer.attr("aria-hidden","true");
	}
	return false;
});
//부동산 정답형
$(".sp_nland_correct .btn_copy").click(function(){
	$(".sp_nland_correct .copy_toast").show();
})
// 스냅폴라
$('.sp_snap .snap_control a[class^=btn_]').click(function(){
	if( $(this).hasClass('btn_stop') ){
		$(this).attr('class','btn_start spsn_bf').text('재생');
	} else if( $(this).hasClass('btn_start') ){
		$(this).attr('class','btn_stop spsn_bf').text('정지');
	}
	return false;
});
//지역검색 정답형 기본카드
$('.sp_map_correct .spot_info_wrap').css({'overflow-x':'auto','-webkit-overflow-scrolling':'touch'});

//지역검색 지도목록
$('.sp_map_spotlist .spotlist_tab .tab_menu').click(function(){
	var $this=$(this),$parentList=$this.parents('.spotlist_tab');
	if($parentList.find('li').length>1){
		$parentList.find('.on').removeClass('on');
		$this.addClass('on');
	}
	event.returnValue=false;
});
/* 통합웹 카페 추천 */
if($('.sp_total .cafe_wrap .flick-container')){
	$('.sp_total .cafe_wrap .flick-container').each(function(){
		var
			$oFContainer=$(this),
			$oFRoot=$oFContainer.parent(),
			$oFChild=$oFContainer.children(),
			nFHeight=$oFContainer.children(':first').height()
			;
		$oFRoot.css({'overflow':'hidden','overflow-x':'auto','-webkit-overflow-scrolling':'touch','height':(nFHeight+'px')});
		if(($oFContainer.attr('style') == undefined ) || ($oFContainer.attr('style').search('width') < 0)){
			$oFContainer.css({'width':$oFChild.length*100+'%'});
			$oFChild.css({'width':100/$oFChild.length+'%'});
		}
		$oFRoot.on({'scroll':function(event){
			var $oFScroll=$oFScroll||{};
			$oFScroll.oTarget=event.target;
			$oFScroll.nScrollLeft=$oFScroll.oTarget.scrollLeft;
			$oFScroll.nScrollWidth=$oFScroll.oTarget.scrollWidth;
			$oFScroll.nFWidth=Math.round($oFScroll.nScrollWidth/$oFChild.length);
			$oFScroll.nScrollWidth=$oFScroll.nScrollWidth-$oFScroll.nFWidth;
			$oFScroll.nNow=Math.round($oFScroll.nScrollLeft/$oFScroll.nFWidth);
			$oFRoot.css({'height':$oFContainer.children(':eq('+$oFScroll.nNow+')').height()+'px'});
			$oFScroll=null;
		}});
	});
}
$('.sp_total .cafe_content .more_area .btn_more').click(function(){
	if($(this).parent().hasClass('on')){
		$(this).parent().parent().find('.lst_content').removeClass('on');
		$(this).parent().removeClass('on');
		$(this).text('더보기');
	}else{
		$(this).parent().parent().find('.lst_content').addClass('on');
		$(this).parent().addClass('on');
		$(this).text('접기');
		$('.sp_total .cafe_wrap').height('auto');
	}

	return false;
});
//태그검색
if($('.sp_tag .popular_tag')){
	$('.sp_tag .popular_tag').css({'display':'none'});
	$('.sp_tag .popular_tag.bar').css({'display':'block'});
}
$('.sp_tag .popular_tag.bar .popular_more').click(function(){
	var $this = $('.sp_tag .popular_tag.bar');
	$this.hide();
	$this.next('.sp_tag .popular_tag').show();
	return false;
});
$('.sp_tag .popular_tag .popular_tit .popular_more').click(function(){
	var $this = $('.sp_tag .popular_tag');
	$this.hide();
	$this.prev('.sp_tag .popular_tag.bar').show();
	return false;
});
$('.sp_tag .group_connect,.sp_tag .type_thumb .ly_message').click(function(){
	$(this).hide();
});
//통합웹_블로그스니펫
$('.sp_total .group_order .bt_more').click(function(){
	$(this).parents('.total_snippet').toggleClass('open');
	return false;
});
//라이브위드
$('.live_editor .fanrank .fanrank_more').on('click',function(){
	var
		oClick=$(this),
		oTxt=oClick.find('.speditor'),
		oParent=oClick.parent()
	;
	if(oParent.hasClass('open')){
		oParent.removeClass('open');
		oTxt.html('펼치기');
	}else{
		oParent.addClass('open');
		oTxt.html('접기');
	}
	return false;
});
//식당검색 프렌차이즈 지도
$('.map_area .map_loading').click(function(){
	var oClick=$(this);
	oClick.hide();
	oClick.parent().removeClass('type_multi');
	oClick.parent().find('.map_static').show();
});
$('.map_area .map_group .btn_map_more').click(function(){
	var oClick=$(this);
	oClick.parent().hide();
	oClick.parent().parent().addClass('type_multi');
	oClick.parent().parent().find('.map_content').show();
});
$('.map_area .type_multi .btn_exit').click(function(){
	var oClick=$(this);
	oClick.parent().parent().hide();
	oClick.parent().parent().parent().removeClass('type_multi');
	oClick.parent().parent().parent().find('.map_static').show();
});
//라이브 세대공감
if($('.live_trend .topic_group')){
	var $topic_area = $('.live_trend .topic_group');
	for(var i = 1;i < $topic_area.children().length; i++){
		$($topic_area.children().get(i)).css('display','none');
	}
}
$('.live_trend .topic_group>div').click(function(){
	var $previousArea = $(this),
		$currArea = $(this).next();
	if($currArea.length == 0){
		return false;
	}
	if($currArea.children().hasClass('topic_list')){
		$currArea.next().css('display','block');
	}
	$previousArea.css('display','none');
	$currArea.css('display','block');
});
$('.live_trend .sub_tab>div').css({'overflow-x':'auto','-webkit-overflow-scrolling':'touch','position':'relative'});
if($('.live_trend .tab_age')){
	var nChildWidth = 0;
	$('.live_trend .tab_age').children().each(function(){
		nChildWidth += $(this).width();
	});
	$('.live_trend .tab_age').css('width',nChildWidth+'px');
}
$('.live_trend .topic_group .topic_list').parent().css({'overflow-x':'auto','-webkit-overflow-scrolling':'touch'});
//사이트
$(".sp_site .type_correct .site_sublink .btn_toggle").on("click",function(){
	$(this).parent().toggleClass("fold");
});
// 여행지추천
$(document).ready(function() {
	$(".sp_map_top .map_area").hide();
	$(".sp_map_top .theme_area").hide();
});
$(".sp_map_top .tab_list .tab_link").click(function(){
	$(this).parents().find(".tab_item").addClass('on');
	$(this).parents().siblings().removeClass('on')
});
$(".sp_map_top .tab_list .tab_link .area").click(function(){
	$(".map_area").show();
	$(".theme_area").hide();
});
$(".sp_map_top .tab_list .tab_link .theme").click(function(){
	$(".theme_area").show();
	$(".map_area").hide();
});
//실시간검색
$(".sp_realtime .group_tab .btn_toggle").on("click",function(){
	$(this).parent().toggleClass("close");
});
$(".sp_realtime .group_wrap .u_cbox").hide();
$(".api_ly_extend .sp_realtime .group_wrap .u_cbox").show();
$(".sp_realtime .group_wrap .talk_loading").on("click",function(){
	var self=$(this);
	self.hide();
	self.next(".u_cbox").show();
});
$(".sp_realtime .group_tab .tab").on("click",function(){
	var oSelf=$(this).index(),
		oGroup=$(".sp_realtime .group_wrap .group");
	$(this).addClass("selected").siblings().removeClass("selected");
	oGroup.hide();
	if(oSelf === 0){
		oGroup.eq(0).show();
	}else{
		oGroup.eq(1).show();
	}
});
$(".sp_nrealtime .nrealtime_new").on("click",function(e){
	$(this).hide();
	e.preventDefault();
});
// 게임
$('.sp_notice_board .subscript_ad_v1').click(function(){
	$('.api_ly_dimmed').show();
	$('.api_ly_popup').show();
	return false;
});
//2016 개편
//rotate
$(".api_rotate_icon").parent().on("click",function(){
	var self=$(this).find(".api_rotate_icon"),
		oHidden=self.parent().siblings('.api_hidden_box');

	if(oHidden.is(":hidden")){
		self.addClass("ani_rotate");
		oHidden.addClass("api_open").delay(1).queue(function (next1){
			oHidden.addClass("ani_fadein");
			next1();
		});
	}else{
		oHidden.removeClass("api_open ani_fadein");
		if(self.hasClass("ani_rotate")){
			self.removeClass("ani_rotate");
		}else{
			self.addClass("ani_rotate");
		}
	}
	return false;
});
//주제더보기
$(".api_more_wrap .api_more_theme").on("click",function(){
	var btnTheme = $(this),
		btnThemeIcon = btnTheme.find(".api_more_icon_inner"),
		btnThemeMore = btnTheme.siblings(".api_more");
	if(btnTheme.find(".api_arrow_wrap").length > 0){
		btnTheme.toggleClass("open");
		if(btnTheme.hasClass("open")){
			btnThemeIcon.find('span').eq(0).text("접기");
		}
		else{
			btnThemeIcon.find('span').eq(0).text("더보기");
		}
		return false;
	}else if(btnTheme.find(".api_arrow_wrap2").length > 0){
		btnTheme.hide();
		btnThemeMore.show();
		return false;
	}
	var dimLayer=$(".api_ly_white_dimmed");
	btnTheme.parent(".api_more_wrap").addClass("ani_play");
	dimLayer.show().delay(1).queue(function(next1){
		dimLayer.addClass("ani_play");
		next1();
	});
	return false;
});
$(".api_ly_white_dimmed").on("click",function(){
	$(this).hide().removeClass("ani_play");
	$(".api_more_wrap").removeClass("ani_play");
});
//브릿지 하단 footer
$(".api_info_area .btn_api_info").on("click",function(){
	$(this).next().toggle();
	return false;
});
$(".api_info_message .btn_option").on("click",function(){
	var self=$(this);
	if(self.attr('aria-pressed')=='true'){
		self.attr('aria-pressed','false');
	}else{
		self.attr('aria-pressed','true');
	}
	return false;
});
//브릿지 탭메뉴
var OapiLnbWrap = $(".api_ly_extend .header_lnb:eq(0) .scroll_lnb"),
	OapiLnb = $(".api_ly_extend .header_lnb:eq(0) .list_lnb"),
	DWidth = $(window).width(),
	Owidth = OapiLnb.width();

if(DWidth < Owidth){
	OapiLnbWrap.addClass("type_scroll");
}else{
	OapiLnbWrap.removeClass("type_scroll");
}

$(".api_ly_extend .header_lnb .list_lnb .tab").on("click",function(){
	var self=$(this),
		oSlidebar=self.find(".slide_bar");
	if(!self.parent().hasClass("selected")){
		self.parent().siblings().removeClass("selected").removeAttr("aria-selected");
		self.parent().addClass("selected").attr("aria-selected",true);

		if($("body").hasClass("api_animation")){
			oSlidebar.css("transform","translateX(-200px)").delay(1).queue(function(next1){
				oSlidebar.addClass("ani_slide_bar");
				next1();
			}).delay(1).queue(function (next2){
				oSlidebar.css("transform","translateX(0)");
				next2();
			}).delay(1).queue(function (next3){
				oSlidebar.removeAttr("style");
				next3();
			}).delay(250).queue(function (next4){
				oSlidebar.removeClass("ani_slide_bar");
				next4();
			});
		}
	}
	return false;
});

//브릿지 slideup
if($("body").hasClass("api_animation")){

$(".api_ly_extend .api_content").on("webkitAnimationEnd",function(){
	$(this).removeClass("ani_slideup");
});
$(".api_ly_extend .api_content").on("click",function(){
	$(this).addClass("ani_slideup");
	return false;
});

if($("header").is(":hidden")){
	var header = $(".api_header"),
		headerH = header.height(),
		cont = $(".api_content"),
		gnbHeight = header.find(".header_gnb").height();

	header.css({
		"top":"0",
		"transform":"translateY(0)"
	});
	cont.css({"padding-top":headerH});

	$(window).scroll("one",function(){
		var st = $(this).scrollTop(),
			tmp = $(window).scrollTop(),
			header = $(".api_header"),
			headerH = header.height(),
			cont = $(".api_content"),
			gnbHeight = header.find(".header_gnb").height();
		if(tmp >= gnbHeight){
			header.css("transform","translateY(-"+gnbHeight+"px)");
		}else if(tmp === 0){
			header.css("transform","translateY(0)");
		}
	});
}
}
//브릿지 검색결과없음
$(".api_ly_extend .api_status_message").on("click",function(){
	$(".api_ly_extend .api_status_message").toggle();
});
//더보기 type2, 브릿지 하단 더보기 로딩중
$(".api_more_wrap .api_more_multi").on("click",function(){
	var self=$(this),
		sText=self.find("span"),
		oHidden=self.parents(".sc").find(".api_hidden_box"),
		oMore=self.siblings(".api_more");
	if(self.siblings().hasClass("api_more")){
		self.parent().addClass("type_loading").delay(1000).queue(function (next1){
			self.parent().addClass("type_loading").removeClass("type_loading");
			self.hide();
			oMore.show();
			next1();
		});
	}else if(self.siblings().hasClass("api_loading_area")){
		self.parent().addClass("type_loading");
	}else if(self.parents(".sc").find(".api_hidden_box")){
		if(oHidden.is(":hidden")){
			self.addClass("open");
			sText.text("접기");
			oHidden.addClass("api_open").delay(1).queue(function (next1){
				oHidden.addClass("ani_fadein");
				next1();
			});
		}else{
			oHidden.removeClass("api_open ani_fadein");

			if(self.hasClass("open")){
				self.removeClass("open");
				sText.text("펼쳐보기");
			}else{
				self.addClass("open");
				sText.text("접기");
			}
		}
	}
	return false;
});

//더보기type2
$(".api_more_wrap .api_more_type").on("click",function(){
	var self=$(this),
		oHidden=self.parents(".sc").find(".api_hidden_box");
	return false;
});

$(".api_more_wrap .api_loading_area").on("click",function(){
	$(this).parent().removeClass("type_loading");
	return false;
});

//통합웹_스니펫
$(".sp_ntotal .more_order .btn_order").on("click",function(){
	var self = $(this),
		oParent = self.parent().siblings(".total_snippet"),
		sTxt = self.text();
	if(sTxt == "레시피 더보기"){
		self.text("레시피 닫기");
		oParent.addClass("open");
	} else{
		self.text("레시피 더보기");
		oParent.removeClass("open");
	}
})
// 기업 정답형
$('.sp_company .report_area .btn_open, .sp_company .api_more_multi').click(function(){
	$(this).parents().find('.company_report').toggleClass('open');
	$(this).parents().find('.company_info').toggleClass('open');
	return false;
});
if($('.sp_company .company_map .map_group .map_info')){
	$('.sp_company .company_map .map_group .map_info').hide();
}
$('.sp_company .company_map .map_group .map_loading').click(function(){
	$(this).hide();
	$(this).parent().find('.map_info').show();
	return false;
});
$('.sp_company .company_channel .btn_open').click(function(){
	$(this).parent().toggleClass('on');
	return false;
});
$('.sp_company .report_notify .guide').on('click',function(e){
	$(this).siblings('.ly_api_info').toggle();
	e.preventDefault();
});
//기업 목록형
$('.sp_company_list .desc_txt.guide').click(function(){
	$(this).siblings('.ly_api_info').toggle();
	return false;
});
$('.sp_company_list .company_loading+.company_noresult').hide();
$('.sp_company_list .company_loading').click(function(){
	$(this).hide();
	$(this).next().show();
});
//연관검색어
$('.sp_nkeyword button.bt_more').click(function(){
	var oClick = $(this);
	if(oClick.parents('.sp_nkeyword').hasClass('open')){
		oClick.parents('.sp_nkeyword').removeClass('open');
	}else{
		oClick.parents('.sp_nkeyword').addClass('open');
	}
});

$('.sp_nkeyword .realtime_tab .item .tab').click(function(){
	var tab = $(this);
	var tabList = $(tab.parents('.realtime_tab'));

	tabList.find('.tab').attr('aria-selected', 'false');
	tab.attr('aria-selected', 'true');

	return false;
});

// 뉴스토픽
$('.sp_nkeyword .rtime_area .btn_info, .sp_nkeyword .group_title .btn_info').click(function(){
    var btn = $(this);
    var tooltip = $(btn.siblings('.ly_api_info'));
    tooltip.toggle();

    return false;
});

//B급검색
$('.sp_nkeyword .btype .bt_toggle').click(function(){
	var oParent=$(this).parent(),
		oClick=$(this);
	if(!oParent.hasClass('open')){
		oParent.addClass('open');
		oClick.text('접기');
	}else{
		oParent.removeClass('open');
		oClick.text('펼치기');
	}
});
// 리뷰
$(".sp_nreview .review_option_area .item").on("click", function(e){
	var self = $(this);
	tabMenu(self);
	e.preventDefault();
});
$('.sp_review h2 .api_info_lnk').click(function(){
	$('.api_ly_dimmed').show();
	$('.api_ly_popup').show();
	return false;
});
var commonVideo = $('.video_common_player_wrap');
$('.sp_nreview .review_thumb_group .thumb').on('click',function(e){
	var self = $(this);
	var thumbGroup = $('.review_thumb_group');
	var parent = self.parents('.review_thumb_group');
	var hasVideo = parent.next('.video_common_player_wrap');
	var hasVideoLength = hasVideo.length
	if(hasVideoLength == 1){
		commonVideo.hide();
		thumbGroup.show();
		parent.hide();
		hasVideo.show();
	}
	e.preventDefault();
});
commonVideo.on('click',function(){
	var self = $(this);
	var hasThumb = self.prev('.review_thumb_group');
	var hasThumbLength = hasThumb.length;
	if(hasThumbLength == 1){
		self.hide();
		hasThumb.show();
	}
});
$('.popup_review .popup_close,.popup_notice_board .popup_close').click(function(){
	$('.api_ly_dimmed').hide();
	$('.api_ly_popup').hide();
});
$('.sp_nreview .tab_menu .api_loading').click(function(){
	var self = $(this),
		tab_menu = $(this).next();
	self.hide();
	self.parents('.api_list_scroll_wrap').css('height','auto');
	tab_menu.show();
	self.parents('.api_list_scroll_wrap').css('height',+tab_menu.height()+'px');
	return false;
});
$('.sp_nreview .list_tab .tab,.sp_nreview .list_menu .menu').click(function(){
	$(this).parents('ul').find('.on').removeClass('on');
	$(this).parent().addClass('on');
	return false;
});
$('.sp_nreview .api_title_area .api_title .api_ad_link .api_ico_alert').click(function(){
	$('.api_ly_dimmed').show();
	$('.api_ly_popup').show();
});
$('.sp_nnotice_board .api_sub_link,.sp_nnotice_board .sub_title_area .sub_title').click(function(){
	$('.api_ly_dimmed').show();
	$('.api_ly_popup').show();
	return false;
});
$('.sp_nreview .tab_error,.sp_nreview .tab_loading').on('click',function(){
	$(this).hide();
});
//이미지
$('.sp_nimage .info_timeline .ico_data,.sp_nimage .photo_info .ico_data').click(function(){
	$('.api_ly_dimmed').show();
	$('.api_ly_popup').show();
	$($('.api_ly_popup').children()[0]).show();
	return false;
});
//하단 실급검,핫토픽
$(".nrealtime_srch .tab_menu .tab").on("click",function(){
	var filter = $(this).parents().siblings('.filter_option');

	$(this).addClass("selected").attr("aria-selected",true).siblings().removeClass("selected").removeAttr("aria-selected");
    var rankingPanel = $(this).parents('.group_title').siblings('.group_ranking');
    rankingPanel.hide();
    rankingPanel.eq($(this).index()).show();
    if ($(this).text() === '뉴스토픽') {
        filter.hide();
    }
    else {
        filter.show();
    }
    return false;
});

$('.nrealtime_srch .realtime_tab .item .tab').click(function(){
    var tab = $(this);
    var tabList = $(tab.parents('.realtime_tab'));

    tabList.find('.tab').attr('aria-selected', 'false');
    tab.attr('aria-selected', 'true');

    return false;
});

$('.nrealtime_srch .rtime_area .btn_info').click(function(){
    var btn = $(this);
    var tooltip = $(btn.siblings('.ly_api_info'));

    tooltip.toggle();

    return false;
});

//하단 실시간급상승,핫토픽키워드 반응형
$(document).ready(function() {
	var viewport = $(document).width(),
		oNrealtime = $(".nrealtime_srch .flick_kwd");
	$('.nrealtime_srch .group_ranking.type_topic, .nrealtime_srch .group_ranking.type_daily').hide();
	if(viewport >= 1024){
		oNrealtime.find(".flick_container,.flick-panel").removeAttr("style");
		$('.nrealtime_srch .group_ranking').show();
	}
});
//책 컬랙션
$('.sp_nbook .datalab_btn').click(function(){
	$(this).parent().toggleClass('on');
	return false;
});
$('.sp_nbook .api_c3p_datalab').hide();
$('.sp_nbook .chart_loading,.sp_nbook .chart_error').click(function(){
	$(this).hide();
	$(this).next().show();
	return false;
});

$('.sp_nbook .list_scroll_tab .item').on('click', function() {
	$(this).parents('.list_scroll_tab').children().removeAttr('aria-selected');
	$(this).parent().attr('aria-selected', true);
	return false;
});

$('.sp_nbook .api_more_multi').on('click', function() {
    var tabExtendGroup = $(this).parents('.extend_group');
	var subjectExtendGroup = $(this).parent().prev().children('.extend_group');

	tabExtendGroup.toggleClass('open');
	subjectExtendGroup.toggleClass('open');
    return false;
});

//사이트 개편
$('.sp_nsite .nsite_official .btn_more').click(function(){
	$(this).parent().toggleClass("on");
	return false;
});
//스크롤
$(document).ready(function() {
	var oScrollWrap=$(".api_list_scroll_wrap");
	oScrollWrap.each(function(){
		var self = $(this),
			hScroll = self.find(".api_list_scroll").height();
		self.css("height",hScroll);
	});
});
//결과없음
$('.sp_nnoresult .group_noresult .bx_area.parcel .bx').click(function(){
	$(this).parent().toggleClass('open');
	return false;
});
// 스냅폴라
$('.sp_npholar .snap_control a[class^=btn_]').click(function(){
	var self=$(this);
	if( self.hasClass('btn_stop') ){
		self.addClass('btn_start').text('재생');
	} else if( self.hasClass('btn_start') ){
		self.removeClass('btn_start').text('정지');
	}
	return false;
});

//어학사전
var btnMore = $(".sp_ndic .api_title_area .btn_more")

btnMore.children().text('열기');
btnMore.removeClass('is_active');
btnMore.parents('.api_title_area').siblings('.api_hidden_box').hide();
btnMore.parents('.api_subject_bx').next('.api_more_wrap').hide();


$(".sp_ndic .api_title_area .btn_more").on('click',function(){

	$(this).parents('.api_title_area').siblings('.api_hidden_box').toggle();
	$(this).toggleClass('is_active');
	$(this).parents('.api_subject_bx').next('.api_more_wrap').toggle();
	if($(this).hasClass('is_active')) {
		$(this).children().text('닫기');
	}else {
		$(this).children().text('열기');
	}
	return false;
});

$(".sp_ndic .info_link").on('click',function(){
	$(this).toggleClass('is_active');
	return false;
});
$(".sp_ndic .close_link").on('click',function(){
	$(this).parent().siblings(".info_link").removeClass('is_active');
	$(this).parent().siblings(".dic_more_link").removeClass('is_active');
	return false;
});
$(".sp_ndic .dic_more_link").on('click',function(){
	$(this).toggleClass('is_active');
	return false;
});
$(".sp_ndic .api_more_wrap .api_more_multi").on('click',function(){
	$(this).parent().prev('.api_subject_bx').children('.api_hidden_box').toggle();
});
$(".sp_ndic .btn_sound").on('click',function(){
	if($(this).hasClass('loading')){
		$(this).removeClass('loading');
		$(this).addClass('play');
	}else if($(this).hasClass('play')){
		$(this).removeClass('play');
	}else {
		$(this).addClass('loading');
	}


});
$('.sp_ndic .api_more_wrap .api_more_multi').on('click',function(){
	$(this).addClass('open');
});
$('.sp_ndic .tts_info .btn_tts_info').on('click',function(){
	$(this).siblings('.ly_api_info').toggle();
	return false;
});
$('.sp_ndic .close_link').on('click',function(){
	$(this).parent().hide();
	return false;
});
//쇼핑
var oScrollShopWrap=$(".sp_nshop .flick-wrap");
oScrollShopWrap.each(function(){
	var self = $(this),
		hScroll = self.find(".flick-ct").height();
	self.find(".flick-container,.flick-ct").css("height","100%");
	self.css("height",hScroll);
});
$(".sp_nshop .tab_list_wrap .item").on("click",function(){
	var $this = $(this),
		parent = $this.parent();
	parent.addClass("on").siblings("li").removeClass("on");
	parent.siblings("li").find(".item").removeAttr("aria-selected");
	$this.attr("aria-selected",true);
	return false;
});
$(".sp_nshop .tab_age_wrap .btn_select").on("click",function(){
	var self = $(this),
		optionTrend = self.siblings(".api_list_scroll_wrap");

	if (self.attr('aria-expanded') === 'true'){
		self.attr('aria-expanded','false');
		optionTrend.hide();
	} else {
		self.attr('aria-expanded','true');
		optionTrend.show();
	}
	return false;
});
$(".sp_nshop .list_age .item").on("click",function(){
	var self = $(this);

	self.attr('aria-selected','true').parents('.bx').siblings('.bx').find('.item').attr('aria-selected','false');
	return false;
});
$('.sp_nshop .tab_filter_list>li>a').click(function(){
	$(this).parents('.tab_filter_list').find('li.on').removeClass('on');
	$(this).parents('li').addClass('on');
	return false;
});
if($('.sp_nshop .filter_option_guide+.api_list_scroll_wrap')){
	$('.sp_nshop .filter_option_guide+.api_list_scroll_wrap').hide();
}
$('.sp_nshop .filter_option_guide').click(function(){
	$(this).hide();
	$(this).next().show();
	return false;
});
$('.sp_nshop .thumbnail_scroll_wrap .item').click(function(){
	$(this).parents('ul').find('.on').removeClass('on');
	$(this).parents('li').addClass('on');
	return false;
});
$('.sp_nshop .shop_noresult_wrap').click(function(){
	$(this).hide();
	return false;
});
if($('.sp_nshop .api_loading')){
	$('.sp_nshop .api_loading').parent().hide();
}
if($('.sp_nshop .age_scroll_wrap,.sp_nshop .gender_scroll_wrap')){
	$('.sp_nshop .age_scroll_wrap').hide();
	$('.sp_nshop .gender_scroll_wrap').hide();
}
$('.sp_nshop .tab_shop_mall .mall_box').click(function(){
	$(this).toggleClass('on');
	return false;
});
// 쇼핑 태그탭
$('.sp_nshop .tag_list .tag').on('click', function () {
    if ($(this).hasClass('btn_more')) {
        $(this).parents('.tag_list_wrap').toggleClass('open');
    }
    else {
        $(this).siblings().removeAttr('aria-pressed');
        $(this).attr('aria-pressed', true);
    }
});
// 쇼핑 몰명탭
$(".sp_nshop .tab_shop_mall .btn_data").on("click", function() {
	$(this).siblings('.ly_api_info').toggle();
	return false;
});
// 쇼핑 카테고리 탭
$(".sp_nshop .list_scroll_tab .item").on("click", function() {
 	$(this).parent().siblings().removeAttr('aria-selected');
    $(this).parent().attr('aria-selected', true);
    return false;
});

//쇼핑 개별그룹형
$(".sp_nshop .tab_area .lst_tab li a").click(function(){
	var self=$(this),
	oListGroup=self.parents(".lst_tab");
	oListGroup.find("li").removeClass("on");
	self.parent().addClass("on");
	return false;
});
$('.sp_nshop .api_c3p_datalab').hide();
$('.sp_nshop .chart_loading').show();
$('.sp_nshop .chart_loading,.sp_nshop .chart_error').click(function(){
	$(this).hide();
	$(this).next().show();
	return false;
});
$('.sp_nshop .tab_shop_mall .datalab_tit').click(function(){
	$(this).toggleClass('open');
	return false;
});
//쇼핑 몰명추천
$(".sp_nshop_recommend .tab_select_wrap .btn_select").on("click", function () {
    var self = $(this),
        optionAge = self.parents(".tab_select_wrap").siblings(".api_list_scroll_wrap");

    if (self.hasClass("active")) {
    	self.removeClass("active");
        optionAge.hide();
    } else {
        self.addClass("active");
        optionAge.show();
    }
});

//지역
if($('.sp_nmap .map_group .map_loading_area')){
	$('.sp_nmap .map_group .map_static_area').hide();
}
$('.sp_nmap .map_group .map_loading_area').click(function(){
	$(this).hide();
	$(this).siblings('.map_static_area').show();
	return false;
});
$('.sp_nmap .sub_dsc_area .btn_more').click(function(){
	$(this).parents('.sub_dsc_area').toggleClass('on');
	return false;
});
$('.sp_nmap .select_wrap .select_tit').click(function(){
	var objThis = $(this);
	if (objThis.attr('aria-expanded') === 'true'){
		objThis.attr('aria-expanded','false');
	} else {
		objThis.attr('aria-expanded','true');
	}
	return false;
});
//지역 정답형
if($('.sp_nregion .region_area .region_map_loading')){
	$('.sp_nregion .region_area .region_map').hide();
}
$('.sp_nregion .region_area .region_map_loading').click(function(){
	$(this).hide();
	$(this).siblings('.region_map').show();
	return false;
});
$('.sp_nregion .info_sub .btn_more').click(function(){
	$(this).parent().toggleClass('on');
	return false;
});
//NCRM
$('.sp_nncr .ncr_error_bx+.api_list_scroll_wrap').hide();
$('.sp_nncr .ncr_error_bx').click(function(){
	$(this).hide();
	$(this).next().show();
	return false;
});
//가볼만한 곳
if($('.sp_nmap_top')){
	$('.sp_nmap_top .map_area').hide();
	$('.sp_nmap_top .theme_area').hide();
}
$(".sp_nmap_top .tab_list li:first-child .tab").click(function(){
	$('.theme_area').hide();
	$('.map_area').show();
	return false;
});
$(".sp_nmap_top .tab_list li:nth-child(2) .tab").click(function(){
	$('.map_area').hide();
	$('.theme_area').show();
	return false;
});
if($('.sp_nmap_top .map_area .map_content')){
	$('.sp_nmap_top .map_area .map_content').hide();
}
$('.sp_nmap_top .map_area .map_loading').click(function(){
	$(this).hide();
	$(this).next('.map_content').show();
	return false;
});
$('.sch_w .sch_inp_txt').click(function(e){
	e.stopPropagation();
	setTimeout(function(){
		$('.sch_w .sch_inp').focus();
	},300);
	$(this).parents('.sch').addClass('sch_write');
})
// 초등과제 기본형
$('.sp_nhomework_answer .card_area .api_list_scroll_wrap').css("height", 224);
$('.sp_nhomework_answer .content_item .card_result').click(function(){
	if($(this).attr('aria-expanded') === 'true'){
		$(this).attr('aria-expanded', 'false');
	} else {
		$(this).attr('aria-expanded', 'true');
	}
	return false;
});
// 상단 타이틀 동의의결
$('.ly_api_info').hide();
$('.api_title_area .api_title .api_ad_link').on('click',function(){
	$(this).parent().next('.ly_api_info').toggle();
	return false;
});
$('.ly_api_info .btn_close').on('click',function(){
	$(this).parent().hide();
});
// TALK
$(".talk_area .talk_loading").add($(".talk_area .u_cbox .u_cbox_comment_none")).add($(".talk_area .u_cbox .u_cbox_loading_fail")).hide();
$(".talk_area .u_cbox .u_cbox_write_wrap .u_cbox_write_box").removeClass('u_cbox_focus');
$(".talk_area .u_cbox .u_cbox_write_wrap .u_cbox_guide").text('TALK를 남겨주세요');
$(".talk_area .u_cbox .u_cbox_write_wrap .u_cbox_text").on({
	click: function(){
		$(this).next().text('주제와 무관한 내용 악플 개인 정보 노출 매매행위 등은 삭제될 수 있습니다.');
		$(this).parents(".u_cbox_write_box").addClass('u_cbox_focus');
	},
	keydown: function(){
		$(this).parents(".u_cbox_write_box").addClass('u_cbox_writing');
	}
});
// 오디오클립
$('.sp_nmusic_audio a.music_play_thumb').on('click', function () {
	// pause
	if ($(this).hasClass('loading')) {
        $(this).addClass('play');
        $(this).removeClass('loading');
	}
    else if ($(this).hasClass('play')) {
        $(this).removeClass('play');
        $(this).addClass('pause');
    }
    else if ($(this).hasClass('pause')){
        $(this).removeClass('pause');
        $(this).addClass('play');
    }
    else {
    	$(this).addClass('loading');
	}
    return false;
});
