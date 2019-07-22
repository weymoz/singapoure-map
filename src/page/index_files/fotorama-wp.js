(function ($) {
    /*
    $(window).resize(function() {
        var max;
        if($(window).width()<=800){
            $(".fotorama__caption").each(function() {
                max = (max >= $(this).height()) ? max : $(this).height();
            });

            $(".fotorama__stage").height(800);
        }
    });*/

	$(function () {
		$.fn.fotoramaWPAdapter = function () {
		    this.each(function () {
		        var $this = $(this),
		        	data = $this.data(),
		        	$fotorama = $('<div></div>');

		        $('dl', this).each(function () {
		            var $a = $('dt a', this);
		            $fotorama.append(
		            	$a.attr('data-caption', $('dd', this).html())
		            );
		        });

		        $this.html($fotorama.html());
		    });

		    return this;
		};

		$('.fotorama--wp')
			.fotoramaWPAdapter()
			.fotorama();


        //$(".fotorama__nav-wrap").wrap("<div class='fotorama__nav-wrap-box'>");
        //$(".fotorama__nav").width("100%");

	});
})(jQuery);