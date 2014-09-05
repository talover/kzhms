
$(document).ready(function() {
 	$('input, select').styler();  
	$('.article-text').hyphenate();

	var sync1 = $("#sync1");
	var sync2 = $("#sync2");
 
	sync1.owlCarousel({
		singleItem : true,
		slideSpeed : 1000,
		pagination:false,
		afterAction : syncPosition,
		responsiveRefreshRate : 200,
		paginationSpeed: 1000,
		rewindSpeed: 1000,
		autoPlay: 15000,
		addClassActive: true,
		navigation : true
	});
 
	sync2.owlCarousel({
		items : 4,
		itemsDesktop      : [1199,4],
		itemsDesktopSmall     : [979,4],
		itemsTablet       : [768,4],
		itemsMobile       : [479,4],
		pagination:false,
		slideSpeed : 1000,
		paginationSpeed: 1000,
		responsiveRefreshRate : 100,
		navigation : true,
		afterInit : function(el){
			el.find(".owl-item").eq(0).addClass("synced");
		}
	});
 
	function syncPosition(el){
		var current = this.currentItem;
		$("#sync2")
			.find(".owl-item")
			.removeClass("synced")
			.eq(current)
			.addClass("synced")
		if($("#sync2").data("owlCarousel") !== undefined){
			center(current)
		}
	}
 
	$("#sync2").on("click", ".owl-item", function(e){
		e.preventDefault();
		var number = $(this).data("owlItem");
		sync1.trigger("owl.goTo",number);
	});
 
	function center(number){
		var sync2visible = sync2.data("owlCarousel").owl.visibleItems;
		var num = number;
		var found = false;
		for(var i in sync2visible){
			if(num === sync2visible[i]){
				var found = true;
			}
		}
 
		if(found===false){
			if(num>sync2visible[sync2visible.length-1]){
				sync2.trigger("owl.goTo", num - sync2visible.length+2)
			}else{
				if(num - 1 === -1){
					num = 0;
				}
				sync2.trigger("owl.goTo", num);
			}
		} else if(num === sync2visible[sync2visible.length-1]){
			sync2.trigger("owl.goTo", sync2visible[1])
		} else if(num === sync2visible[0]){
			sync2.trigger("owl.goTo", num-1)
		}
	}

	$('.personal-cab-tabs li').click(function(){
		var personal_cab_tab = $(this).data('personalCabinet');

		$(this).addClass('active').siblings().removeClass('active');
		$('.personal-cab-tab').removeClass('active');
		$(personal_cab_tab).addClass('active');
	});
 
});

$.fn.hyphenate = function() {
	var all = "[абвгдеёжзийклмнопрстуфхцчшщъыьэюя]",
		glas = "[аеёиоуыэю\я]",
		sogl = "[бвгджзклмнпрстфхцчшщ]",
		zn = "[йъь]",
		shy = "\xAD",
		re = [];
	 
	re[1] = new RegExp("("+zn+")("+all+all+")","ig");
	re[2] = new RegExp("("+glas+")("+glas+all+")","ig");
	re[3] = new RegExp("("+glas+sogl+")("+sogl+glas+")","ig");
	re[4] = new RegExp("("+sogl+glas+")("+sogl+glas+")","ig");
	re[5] = new RegExp("("+glas+sogl+")("+sogl+sogl+glas+")","ig");
	re[6] = new RegExp("("+glas+sogl+sogl+")("+sogl+sogl+glas+")","ig");
	return this.each(function() {
		var text = $(this).html();
		for (var i = 1; i < 7; ++i) {
			text = text.replace(re[i], "$1"+shy+"$2");
		}
		$(this).html(text);
	});
};