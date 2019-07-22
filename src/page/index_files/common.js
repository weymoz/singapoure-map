$(document).ready(function(){
  setTimeout(function(){
    $("[style*='content: \"sticky\";'], [style*=\"content: 'sticky';\"]").each(function(){
      var top = this.getAttribute('style').split('top:')[1];
          top = parseInt(top);

      $(this).stick_in_parent({
        offset_top: top || 0,
      });
    });
  },2000);
});

$(document).ready(function() {

  if($('.back').length){
    $('a[href="#all-vacancies"]').bind('click', function(event) {
      $('body, html').animate({scrollTop: $('#all-vacancies').offset().top}, 1000);
      event.preventDefault();
    });
  }

  if($('.all-vacancies').length){
    $('.all-vacancies a').bind('click', function(event) {
      var href = $(this).attr('href');
      $('body, html').animate({scrollTop: $(href).offset().top}, 1000);
      event.preventDefault();
    });
  }

  $('.hedclose').on('click',function(){
	  $.fancybox.close();
  })
  
  $(".fanyform").on("submit",function(e){
    e.preventDefault();
    var email = $(".fanyform [type=text]").val();
    var box = $(".fanyform [type=text]");

    $.post("/wp-content/themes/inc/ajax/subscription.php", {
        "email": email
    }, function(data){
      if (data != "Ошибка :(") {
      }
        box.val('');
        box.prop("placeholder",data);
    });

    return false;
  });

  checkMobile();
  $(window).on('resize',function() {
      rtime = new Date();
      if (timeout === false) {
          timeout = true;
          setTimeout(resizeend, delta);
      }
  });


$('input,textarea').on('focus', function(){
   $(this).data('placeholder',$(this).attr('placeholder'))
          .attr('placeholder','');
}).on('blur', function(){
   $(this).attr('placeholder',$(this).data('placeholder'));
});
if (!$mobile && !$smalldt) {
  $('.news-slider.desktop').slick({});


  // instructions slider
    var insBlock = $(".instuctions");
    var insWrap = $(".instuctions_line");
    var ins = $(".instuctions_line_item");
    var insNum = ins.length;
    var winWidth = $(window).width();
    var insWidth = ins.width();
    var insMargin = 0;
 	if(ins.length >0) insMargin = parseInt(ins.css('margin-right').replace("px", ""));
    var insFullWidth =  insNum * (insWidth + insMargin);
    var offsetWidth = 0;
	if(insBlock.length >0) offsetWidth = insBlock.offset().left;

    //console.log(insNum + "_" + insWidth + "_" + insMargin);

    insWrap.css({
        "width": insFullWidth + "px",
        "left": "0px"
    });
    insBlock.append("<div class='arrs'>");
    var arrs = insBlock.find(".arrs");
    arrs.append("<div class='right-arr right arr hidden' >");
    arrs.append("<div class='left-arr left arr' >");

    $(".arr").on("click", function(){
        var scrollVal;
        var curScroll = parseInt(insWrap.css('left').replace("px", ""));
        if ($(this).hasClass("left")) {
            scrollVal = curScroll - (insWidth + insMargin);
        } else {
            scrollVal = curScroll + insWidth + insMargin;
        }
        if (scrollVal <= - insFullWidth + winWidth - insWidth) {
            scrollVal = - insFullWidth + winWidth - insWidth;
            $(".left-arr").addClass("hidden");
        } else {
            $(".left-arr").removeClass("hidden");
        }
        if (scrollVal >= 0) {
            scrollVal = 0;
            $(".right-arr").addClass("hidden");
        } else {
            $(".right-arr").removeClass("hidden");
        }
        insWrap.css({
            "left": scrollVal + "px"
        });
    });

} else if ($smalldt) {
  $('.news-slider.smalldt').slick({});
} else if ($mobile) {
  $('.instuctions_line').removeClass("for-dib");
  $('.instuctions_line').on('init',function(){
     $('.instuctions_line .slick-slide').css({ width: $(this).innerWidth() });
  })
  $('.instuctions_line').slick({
    dots: true,
    centerMode: true,
    centerPadding: '10px',
    slidesToShow: 1,
    infinite: true,
    variableWidth: true
  });
  $('.video_line').removeClass("for-dib");
  $('.video_line').on('init',function(){
     $('.video_line .slick-slide').css({ width: $(this).find('.slick-list').innerWidth() });
  })
  $('.video_line').slick({
    dots: true,
    centerMode: true,
    centerPadding: '10px',
    slidesToShow: 1,
    infinite: true,
    variableWidth: true
  });
  $('.news-slider.mobile').slick({
    dots: true,
    centerMode: true,
    centerPadding: '10px',
    arrows: true
  });
}
    // image links
    var imageLink = $(".img-link");
    imageLink.on("click", function(){
        var currentHref = $(this).attr("data-href");
        window.location.href = currentHref;
    });

    // subscribe
    var subscribeInput = $("#subscribe-mail");
    var subscribeBtn = $(".subscribe-form input[type='submit']");

    subscribeInput.keyup(function(){

        var subValue = $(this).val();
        var pattern = /^([a-z0-9_\.-])+@[a-z0-9-]+\.([a-z]{2,4}\.)?[a-z]{2,4}$/i;

        if(pattern.test(subValue)){
            subscribeBtn.show();
        } else {
            subscribeBtn.hide();
        }
    });

    // hover

    var imgLink = $(".img-link");
    var textLink = $(".text-link");

    imgLink.on("mouseover", function(){

        var currentLink = $(this).parent().find(".text-link");
        currentLink.addClass("hover");

    });

    imgLink.on("mouseout", function(){

        textLink.removeClass("hover");

    });

    textLink.on("mouseover", function(){

        var currentImage = $(this).parent().find(".img-link img, .img-link span");
        currentImage.addClass("hover");


    });

    textLink.on("mouseout", function(){

        imgLink.find("img, span").removeClass("hover");

    });

    /* drop menu */
    var header = $(".wrapper-header");
    var headerAdContainer = $(".header-ad-container-thin").height();
    var dropMenuOpen = $(".header-menu_btn");
      var dropMenu = $(".drop-menu");
    var dropMenuClose = $(".drop-menu_close");
    var dropMenuHeight = dropMenu.height();
	var headerTop = 0;
    dropMenu.css({
        "top": -dropMenuHeight + "px"
    });
    dropMenuOpen.on("click", function(){
        if ($(this).hasClass("opened")) {
          dropMenuOpen.removeClass("opened");
          $("body").removeClass("opened-menu");
          /*dropMenu.css({
              "top": -dropMenuHeight + "px"
          });*/
        } else {
          dropMenuOpen.addClass("opened");
          $("body").addClass("opened-menu");
		  if (headerAdContainer>0){
            headerTop = header.offset().top + header.height() + headerAdContainer + 1 ;
		  } else{
			  headerTop = header.offset().top + header.height()  + 1 ;
		  }

          dropMenu.css({
              "top": headerTop + "px",
              "z-index": "51"
          });
        }
    });

    dropMenuClose.on("click", function(){
      dropMenuOpen.removeClass("opened");
      $("body").removeClass("opened-menu");
        dropMenu.css({
            "top": -dropMenuHeight + "px",
            "z-index": "49"
        });
    });




    /*SEARCH OPEN*/
    var searchBtn = $(".header-search_form_btn");
    var search = $("header .header-search");

    searchBtn.on("click", function(e){
		var searchField = $(this).closest('form').find('input').val().length;
        if (search.hasClass("opensearch")) {
          if (searchField==0) {
            e.preventDefault();
            search.removeClass("opensearch");
          } else {
            search.removeClass("opensearch");
          }
        } else {
			e.preventDefault();
			search.addClass("opensearch");
        }
    });














    // font text-block
    var fontBlock = $(".news-item_image.text");
    var maxFontSize = 100;
    var minFontSize = 20;
    var textSpanWidth, textSpan, textSpanCurFont;

    $.each(fontBlock, function(){

        var thisFontBlock = $(this);
        var blockWidth = $(this).parent().width();
        var blockParts = [];
        var blockTiles = $(this).find("span").html();
        var fontBlockHtml;

        if (blockTiles.indexOf('<br>') + 1) {

            thisFontBlock.html("");

            blockParts = blockTiles.split("<br>");

            $.each(blockParts, function(index, value) {
                thisFontBlock.append("<span id='span-" + index + "'>" + value + "</span>");
            });
        }

        $(this).find("span").css({
            "transition":"0s"
        });

        textSpan = $(this).find("span");
        var spanNum = 0;
        textSpan.each(function(){
            var textArr = [];
            textArr = $(this).text().trim().split(" ");
            var newText = "";
            $.each(textArr,function(index,value){
              if (index == 1) {
                newText += "<div class='small'>" + value + "<br/>";
              } else if (index == (textArr.length - 1) && index != 0) {
                newText += value + "</div>";
              } else if (index === 0) {
                  newText += value;
              } else {
                  newText += value + "<br/>";
              }

            })
            $(this).html(newText);
            for (var i = minFontSize; i < maxFontSize; i++) {

                $(this).css({
                    "font-size": i + "px"
                });
                textSpanWidth = $(this).width();
                if (textSpanWidth > blockWidth - 60) {
                    break;
                }
            }
        });

        $(this).find("span").css({
            "transition":"0.3s"
        });
        $(this).find("span").css({
            "opacity":"1"
        });

    });

    if ($mobile) {
      var bannerBlock = $(".go-to-old");
      var bannerOpenedClass = "opened";
      var bannerOpenedMenuClass = "mob-menu-opened";
      var lastScrollTop = 0;

      $(window).scroll(function (event) {
          if (!$(".go-to-old").hasClass(bannerOpenedMenuClass)) {

              var curScroll = $(this).scrollTop();
              if (curScroll > lastScrollTop) {
                  bannerBlock.removeClass(bannerOpenedClass);
              } else {
                  bannerBlock.addClass(bannerOpenedClass);
              }
              lastScrollTop = curScroll;

          }
      });
    }

});

function checkMobile() {
	if ($(window).width()<992) {
		$mobile = true;
    $smalldt = false;
	} else if ($(window).width()<1181 && $(window).width()>991) {
    $mobile = false;
    $smalldt = true;
    itemsPerLine = 4;
    typesObj["type6"] = itemsPerLine;
  } else if ($(window).width()>1180) {
    $mobile = false;
    $smalldt = false;
    itemsPerLine = 5;
    typesObj["type6"] = itemsPerLine;
  }

}
function resizeend() {
    if (new Date() - rtime < delta) {
        setTimeout(resizeend, delta);
    } else {
        timeout = false;
        checkMobile();
        var newRenderType;
        if ($mobile) {
          newRenderType = "mobile";
        } else if ($smalldt) {
          newRenderType = "small";
        } else {
          newRenderType = "desktop";
        }
        if (newRenderType != renderType) {
          var pageName = window.location.pathname;
          var pageSplit = pageName.split("/");
          switch(pageSplit.length) {
            case 2:
              pagemain.resize();
            break;
            case 3:
              pagemain.resize(pageSplit[1]);
            break;
          }
        }
    }
}
(function(){
    links = document.querySelectorAll('a[href^="#dude"]');
    for( var i = 0, size = links.length; i < size; i++ ){
      links[i].insertAdjacentHTML('afterEnd', links[i].innerText );
      links[i].parentNode.removeChild(links[i]);
    }
  	return;
})();
(function(){

	return;
  
  if (!Element.prototype.matches) {
    Element.prototype.matches = Element.prototype.msMatchesSelector;
  }
  
  var anchor,
    elemTemplate = '<div class="circle-dude" data-dude="1"><a href="https://alfadud.ru/?platformId=AlfaRCO_INCRussia&utm_source=INCRussia&utm_medium=banner&utm_campaign=AlfaDud" target="_blank" class="dude-anchor"></a><div class="buble"><div class="content"><div class="title"><a href="https://alfadud.ru/?platformId=AlfaRCO_INCRussia&utm_source=INCRussia&utm_medium=banner&utm_campaign=AlfaDud" target="_blank">ALFADUD</a></div><div class="text">Сколько ты <span>насасываешь</span>?</div><a href="https://alfadud.ru/?platformId=AlfaRCO_INCRussia&utm_source=INCRussia&utm_medium=banner&utm_campaign=AlfaDud" target="_blank" class="button">Узнай!</a></div></div></div>',
    touch = "ontouchstart" in window,
    phrases = ["доишь","накручиваешь","насасываешь","навариваешь","рубишь","стрижешь","заколачиваешь","зарабатываешь"],
    dudeAvatarPos = 0,
    lastModified = 0,
    elem,
    phraseContainer,
    links;

  if( readCookieDude('cookieDudeDude') ){
    links = document.querySelectorAll('a[href^="#dude"]');
    for( var i = 0, size = links.length; i < size; i++ ){
      links[i].insertAdjacentHTML('afterEnd', links[i].innerText );
      links[i].parentNode.removeChild(links[i]);
    }
  	return;
  }
  
  document.body.insertAdjacentHTML('beforeEnd', elemTemplate);
  
  elem = document.querySelector('.circle-dude');
  phraseContainer = elem.querySelector('.text span');
  
  document.addEventListener("touchstart", over, false);
  document.addEventListener("mouseover", over, false);

  function over(event){

    var href,
      phrase;
    
    if( !event.target.matches('a[href^="#dude"]')
      || anchor === event.target
      || (new Date().getTime()) - lastModified < 3000 ){
      return;
    }
    
    lastModified = new Date().getTime();
    
    event.preventDefault();
    
    if( elem.classList.contains('m-visible') ){
      elem.classList.remove('m-visible');
      setTimeout( function(){
        changeContent( event );
        elem.classList.add('m-visible');
      },1500 );
    } else {
      changeContent( event );
      elem.classList.add('m-visible');
    }

  }
  
  document.addEventListener("touchstart", function(event){
    if( event.target.closest('.circle-dude')
      || (new Date().getTime()) - lastModified < 3000 ){

      return;
    }
    lastModified = new Date().getTime() - 1500;
    anchor = null;
    elem.classList.remove('m-visible');
  }, false);

  document.addEventListener('click', function(event){
    if ( event.target.closest('a[href^="#dude"]') ) {
      event.preventDefault();
      return;
    }
    var target = event.target.closest('.circle-dude a');
    if( target ){
      elem.classList.remove('m-visible');
        createCookieDude('cookieDudeDude',true,30);
    	ga('send', {
		  hitType: 'event',
		  eventCategory: 'dude',
		  eventAction: 'click',
		  eventLabel: target.closest('.circle-dude').getAttribute('data-dude'),
		});
    }
  }, false);
  
  function changeContent( event ){
    var index;
  
    anchor = event.target;
    href = anchor.getAttribute('href');
    index = parseInt( href.slice( 6, href.length ) );
    phrase = phrases[index -1];
    
    phraseContainer.innerText = phrase;
    
    elem.setAttribute( 'data-dude', index );
    ga('send', {
	  hitType: 'event',
	  eventCategory: 'dude',
	  eventAction: 'show',
	  eventLabel: index
	});
  
  }
  
})();


(function(){

	return;
  
  if (!Element.prototype.matches) {
    Element.prototype.matches = Element.prototype.msMatchesSelector;
  }
  
  var anchor,
    elemTemplate = '<div class="main-dude" data-dude="4"><a href="https://alfadud.ru/?platformId=AlfaRCO_INCRussia&utm_source=INCRussia&utm_medium=banner&utm_campaign=AlfaDud" target="_blank" class="outer"></a><div class="question"><span>Есть вопрос...</span></div><div class="buble"><div class="content"><div class="text">Сколько ты <span>насасываешь</span>?</div><a href="https://alfadud.ru/?platformId=AlfaRCO_INCRussia&utm_source=INCRussia&utm_medium=banner&utm_campaign=AlfaDud" target="_blank" class="button">Узнай!</a></div></div></div>',
    touch = "ontouchstart" in window,
    phrases = ["накручиваешь","рубишь","насасываешь","зарабатываешь"],
    dudeAvatarPos = 0,
    elem,
    phraseContainer;

  if( readCookieDude('cookieDudeDude') ){
  	return;
  }
  
  document.body.insertAdjacentHTML('beforeEnd', elemTemplate);
  
  elem = document.querySelector('.main-dude');
  phraseContainer = elem.querySelector('.text span');
  
  if( !document.querySelector('a[href^="#dude"]') && location.pathname.split('/')[1].toLowerCase() != 'start' ){
    setTimeout(over,1000);
  }

  function over(){
    changeContent();
    
    elem.classList.add('m-visible');
    setTimeout(function(){
      elem.addEventListener('transitionend', removeMove, false);
      elem.style.left = "100%";
      elem.classList.add('m-move');
    },2000)

  }
  function removeMove(){
    this.removeEventListener('transitionend', removeMove);
      elem.classList.remove('m-move');
  }
  
  document.addEventListener("touchstart", function(event){
    var dude = event.target.closest('.main-dude');
    if( !dude ){
      elem.classList.remove('m-visible');
      return;
    }
  }, false);
  document.addEventListener("touchend", function(event){
    var dude = event.target.closest('.main-dude');
    if( dude.classList.contains('m-visible') ){
      dude.classList.add('m-ending');
    }
  }, false);

  document.addEventListener('click', dudeClick, false);
  document.addEventListener('mouseover', function( event ){
    var dude = event.target.closest('.main-dude');
    if( !dude ){
      return;
    }

    if( dude.classList.contains('m-visible') ){
      dude.classList.add('m-ending');
    }
  }, false);

  function dudeClick( event ){
    var dude = event.target.closest('.main-dude');
    if( !dude ){
      return;
    }
    if( event.target.closest('.main-dude a') ){
      dude.classList.remove('m-visible');
      createCookieDude('cookieDudeDude',true,30);
      ga('send', {
        hitType: 'event',
        eventCategory: 'dudeMain',
        eventAction: 'click',
        eventLabel: dude.getAttribute('data-dude'),
      });
    }
  }
  
  function changeContent( event ){
    var index;
    
    index = randomInteger(1,4);
    phrase = phrases[index - 1];
    
    phraseContainer.innerText = phrase;
    
    elem.setAttribute( 'data-dude', index ); 
    ga('send', {
      hitType: 'event',
      eventCategory: 'dudeMain',
      eventAction: 'show',
      eventLabel: 1
    }); 
  }
  function randomInteger(from, to){
    return Math.round( from + Math.random()*(to-from) );
  }
})();
  

	function createCookieDude(name,value,days) {
		if (days) {
			var date = new Date();
			date.setTime(date.getTime()+(days*24*60*60*1000));
			var expires = "; expires="+date.toGMTString();
		}
		else var expires = "";
		document.cookie = name+"="+value+expires+"; path=/";
	}

	function readCookieDude(name) {
		var nameEQ = name + "=";
		var ca = document.cookie.split(';');
		for(var i=0;i < ca.length;i++) {
			var c = ca[i];
			while (c.charAt(0)==' ') c = c.substring(1,c.length);
			if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
		}
		return null;
	}

	function eraseCookieDude(name) {
		createCookie(name,"",-1);
	}