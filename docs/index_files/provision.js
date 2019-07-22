DK.Helpers = function(){
	var self = {
		getRandomInt: function(min, max) {
			return Math.floor(Math.random() * (max - min)) + min;
		},
		updateUrl: function(obj,url,pageTitle,ret) {
			pageTitle = pageTitle.replace(/<(?:[^"'>]+|(["'])(?:\\[\s\S]|(?!\1)[\s\S])*\1)*>/g ,'');
			if (!obj) obj = {};
			var i = 0;
			$.each(obj,function(index,value){
				if (value) {
					var pre = "&";
					if (i==0) pre = "?";
					url = url + pre + index + "=" + value
					i++;
				}
			})
			if (ret) {
				return url;
			} else {
				document.title = pageTitle;
				window.history.replaceState({"pageTitle":pageTitle},"", url);
			}
		},
		getAllParams:function() {
			var params = {};
			if (window.location.search.length > 1) {
			  for (var aItKey, nKeyId = 0, aCouples = window.location.search.substr(1).split("&"); nKeyId < aCouples.length; nKeyId++) {
			    aItKey = aCouples[nKeyId].split("=");
			    params[decodeURIComponent(aItKey[0])] = aItKey.length > 1 ? decodeURIComponent(aItKey[1]) : "";
			  }
			}
			return params;
		},
		getURLParameter: function(name) {
			var retUrl = decodeURI(
				(RegExp(name + '=' + '(.+?)(&|$)').exec(location.search)||[,null])[1]
			);
			if (retUrl == "null") {retUrl = null}
			return retUrl;
		},
	}
	return self;
}
DK.Render = function(){
	var renderfunction = {
		templatePath: function(name) {
			return templatePath + "templates/_" + name + ".html";
		},
		render: function (tmplName, objName, data, params, inData, outData) {
	        var dfd = $.Deferred();
			var file = render.templatePath(tmplName);
			$.get(file, null, function (template) {
				var tmpl = $.templates(template);
				if (inData != undefined) {
		        	htmlString = inData + tmpl.render(data) + outData;
		        } else {
					htmlString = tmpl.render(data,params);
				}
				$("body").data(tmplName, htmlString);
				if (objName != undefined) {
					$(objName).html(htmlString);
				}
				var intArr = {};
				intArr[tmplName] = setInterval(function() {
					if($("body").data(tmplName).length) {
						clearInterval(intArr[tmplName]);
				        dfd.resolve();
					}
				},200)
			});
			return dfd.promise();
		},
		conv:function(){
			$.views.converters({
				reurl:function(value){
					var ret;
					switch (value) {
						case "http://incrussia.ru/fly/issledovanie-kak-ustroen-biznes-artemiya-lebedeva-2/":
							ret = "https://incrussia.ru/tema/"
							break;
						default:
							ret = value;
					}
					return ret;
				},
				reurlOld:function(value){
					return value;
				},
				cacheUrl: function(value){
					return value.replace(/https:\/\/incrussia\.ru/g,"https://storage.yandexcloud.net/incrussia-prod");
					// return value.replace(/https:\/\/incrussia\.ru/g,"https://cdn.incrussia.ru");
					// return value;
				}
			});
			$.views.helpers({
				reurl:function(value,old){
					var ret;
					switch (value) {
						case "http://incrussia.ru/fly/issledovanie-kak-ustroen-biznes-artemiya-lebedeva-2/":
							ret = "https://incrussia.ru/tema/"
							break;
						default:
							ret = value;
					}
					return ret;
				},
				social:function(url,title){

					return '<a target="_blank" rel="nofollow" href="https://twitter.com/intent/tweet?text='+title+'&amp;url='+url+'">'+
							'<div class="twitter"><img src="/wp-content/themes/inc/img/share/twitter.svg"></div></a>'+
					  '<a target="_blank" rel="nofollow" href="https://www.facebook.com/sharer.php?u='+url+'">'+
							'<div class="facebook"><img src="/wp-content/themes/inc/img/share/facebook.svg"></div></a>'+
					  '<a target="_blank" rel="nofollow" href="http://vk.com/share.php?url='+url+'&amp;title='+title+'">'+
							'<div class="vk"><img src="/wp-content/themes/inc/img/share/vk.svg"></div></a>'+
					  '<a target="_blank" rel="nofollow" href="https://connect.ok.ru/dk?st.cmd=WidgetSharePreview&amp;st.shareUrl='+url+'">'+
							'<div class="ok"><img src="/wp-content/themes/inc/img/share/ok.svg"></div></a>'+
					  '<a target="_blank" rel="nofollow" href="https://share.flipboard.com/bookmarklet/popout?v=2&amp;title='+title+'&amp;url='+url+'">'+
							'<div class="flipboard"><img src="/wp-content/themes/inc/img/share/flip.svg"></div></a>';
				},
				social18:function(url,title){
					var ul = document.createElement('ul'),
						tempLi = document.createElement('li'),
						tempA = document.createElement('a'),
						soc = [
							{
								name: 'twitter',
								class: 'm-tw',
								inner: '<svg role="img" width="20" height="16" viewBox="0 0 20 16"><use xlink:href="/wp-content/themes/inc/img/test/sprites.svg#soc_tw"></use></svg>',
								url: 'https://twitter.com/intent/tweet?text='+title+'&url='+url
							},
							{
								name: 'facebook',
								class: 'm-fb',
								inner: '<svg role="img" width="16" height="16" viewBox="0 0 16 16"><use xlink:href="/wp-content/themes/inc/img/test/sprites.svg#soc_fb"></use></svg>',
								url: 'https://www.facebook.com/sharer.php?u='+url
							},
							{
								name: 'vk',
								class: 'm-vk',
								inner: '<svg role="img" width="20" height="12" viewBox="0 0 20 12"><use xlink:href="/wp-content/themes/inc/img/test/sprites.svg#soc_vk"></use></svg>',
								url: 'http://vk.com/share.php?url='+url+'&title='+title
							},
							{
								name: 'ok',
								class: 'm-ok',
								inner: '<svg role="img" width="11" height="19" viewBox="0 0 11 19"><use xlink:href="/wp-content/themes/inc/img/test/sprites.svg#soc_ok"></use></svg>',
								url: 'https://connect.ok.ru/dk?st.cmd=WidgetSharePreview&st.shareUrl='+url
							},
							{
								name: 'flipboard',
								class: 'm-fl',
								inner: '<svg role="img" width="16" height="16" viewBox="0 0 16 16"><use xlink:href="/wp-content/themes/inc/img/test/sprites.svg#soc_fl"></use></svg>',
								url: 'https://share.flipboard.com/bookmarklet/popout?v=2&title='+title+'&url='+url
							},
							{
								name: 'google',
								class: 'm-gp',
								inner: '<svg role="img" width="24" height="14" viewBox="0 0 24 14"><use xlink:href="/wp-content/themes/inc/img/test/sprites.svg#soc_gp"></use></svg>',
								url: 'https://plus.google.com/share?app=110&url='+url
							},
						],
						a, li;

					ul.classList.add('social-icons');
					tempA.classList.add('soc');

					tempA.setAttribute('target','_blank');
					tempA.setAttribute('rel','nofollow noreferrer noopener');

					for( var i = 0, size = soc.length; i < size; i++ ){
						li = tempLi.cloneNode();
						a = tempA.cloneNode();

						a.classList.add( soc[i].class );
						a.setAttribute( 'href', soc[i].url );
						a.innerHTML = soc[i].inner;

						li.appendChild( a );
						ul.appendChild( li );
					}

					return ul.outerHTML;
				}
			})
		}
	}
	return renderfunction;
}

function removeArr(arr,from, to) {
	var rest = arr.slice((to || from) + 1 || arr.length);
	arr.length = from < 0 ? arr.length + from : from;
	return arr.push.apply(arr, rest);
}
