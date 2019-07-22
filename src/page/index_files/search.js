$(document).ready(function() { 

	if(location.pathname == '/'){
		$('.s-search__filters-item_all').addClass('active');
	}

	$('.s-search__filters-item').each(function(index, el) {
		var slug = $(this).data('slug'),
				url = location.href;
				if(url.indexOf(slug) != -1){
					$(this).addClass('active');
					$('.s-search__filters-show .s-search__filters-name').text($(this).find('.s-search__filters-name').text());
					$('.s-search__filters-show .s-search__filters-count').text($(this).find('.s-search__filters-count').text());
				}
	});

	$('.s-search__filters-show').bind('click', function(event) {
		if($('.s-search__filters').hasClass('active')){
			$('.s-search__filters').removeClass('active');
		} else {
			$('.s-search__filters').addClass('active');
		}
		event.preventDefault();
	});

	// $('.search_menu_cat').bind('click', function(event) {
		
	// 	if(!$(this).hasClass('active')){
	// 		$('.search_menu_cat.active').removeClass('active');
	// 		$(this).addClass('active');
	// 		var slug = $(this).data('slug');
	// 		console.log(location.href);
	// 	}

	// 	event.preventDefault();

	// });

	// var searchValue = $('#search-field').val();

	// var initMenuSearch = function(){

	// 	$.ajax({
	// 		url: '/wp-content/themes/inc/search/search-menu.php',
	// 		type: 'POST',
	// 		dataType: 'html',
	// 		data: {
	// 			search: searchValue
	// 		}
	// 	})
	// 	.done(function(data) {
	// 		$('.search_menu').append(data);
	// 	});

	// }

	// var resultSearch = function(){
	// 	$.ajax({
	// 		url: '/wp-content/themes/inc/search/search-result.php',
	// 		type: 'POST',
	// 		dataType: 'html',
	// 		data: {
	// 			// type: type, 
	// 			// offset: offset, 
	// 			search: searchValue
	// 		},
	// 	})
	// 	.done(function(data) {
	// 		console.log(data);
	// 	});
	// }

	// resultSearch();

	// $('.search_found-more').bind('click', function(event) {
	// 	var page = $(this).attr('data-page'),
	// 			slug = $('.search_menu_cat.active').attr('data-slug');
	// 	resultSearch(slug, page);
	// 	$(this).attr('data-page', parseInt(page) + 1);
	// 	event.preventDefault();
	// });

	// $('.search_menu_cat').bind('click', function(event) {
	// 	$('.search_menu_cat.active').removeClass('active');
	// 	$(this).addClass('active');
	// 	var slug = $(this).attr('data-slug');
	// 	resultSearch(slug, 1);
	// 	$('.search_found-more').attr('data-page', 1);
	// });

	// $('.search_menu_cat').first().click();

	// initMenuSearch();
	

});