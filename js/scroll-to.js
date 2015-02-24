$(document).ready(function() {
	function scrollToAnchor(aid){
		var aTag = $("a[name='"+ aid +"']");
		$('html,body').animate({scrollTop: aTag.offset().top},'slow');
	}
	$("a").click(function() {
		var href = $(this).attr('href').replace('#', '')
		scrollToAnchor(href);
	});			
});