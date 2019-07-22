var category,
    newsCount = 1,
    newsArr = [],
    controller = new ScrollMagic.Controller(),
    scenes = [],
    newsScenes = [],
    bannerScenes = [],
    titleScenes = [],
    lock = false,
    noaddnews = false,
    rightBannerHeight = 600;
$(document).ready(function () {
    body = $("html, body");
    var curPage = window.location.href.toLowerCase();
    var pageName = window.location.pathname;
    if (pageName.slice(-1) != "/") pageName += "/";
    var pageSplit = pageName.split("/");
    pagemain = DK.Pages.Main();
    pageinner = DK.Pages.Inner();
    render = DK.Render();
    helpers = DK.Helpers();
    render.conv();
    rubrik = "";
    pageinner.share();
    category = pageSplit[1];
    switch (pageSplit.length) {
        case 2:
            pagemain.init();
            break;
        case 3:
            pagemain.init(pageSplit[1]);
            break;
        case 4:
            pageinner.init();
            break;
    }
});


function pal(log) {
    console.log(
        "%c" + log,
        "background: #5e6951; color: #fff; padding: 5px 20px; font-size: 16px;"
    );
}

function refreshNewsScenes() {
    for (var i = 0, size = newsScenes.length; i < size; i++) {
        if (!newsScenes[i]) {
            continue;
        }
        newsScenes[i].duration(document.querySelector(".next-container.i" + (i - 1)).offsetHeight);
    }
}

DK.Pages.Inner = function () {
    var scrollLock = false;
    var lockHistoryBack = false;
    var myfunctions = {
        share: function () {
            $(".incshare a").on("click", function () {
                window.open(
                    $(this).attr("href"),
                    "",
                    "toolbar=0,status=0,width=626,height=436"
                );
            });
        },
        init: function () {
            if (!$mobile) {
                var scene2 = new ScrollMagic.Scene({
                    triggerElement: ".wrapper-header",
                    triggerHook: "onLeave"
                })
                    //.setPin(".wrapper-header")
                    .addTo(controller)
                    .on("enter", function (e) {
                        $(".wrapper-header").addClass("small");
                    })
                    .on("leave", function (e) {
                        $(".wrapper-header").removeClass("small");
                    });
            } else {
                //$(".body").addClass("fixed");
                var scene2 = new ScrollMagic.Scene({
                    triggerElement: ".wrapper-header",
                    triggerHook: "onLeave"
                })
                    //.setPin(".wrapper-header")
                    .addTo(controller);
            }

            progress();
        }
    };

    function progress() {
        newsArr[newsCount] = {url: postData.URL, title: postData.Title, seo_title: postData.seo_title};
        $($(".next-container").get(0))
            .addClass("i" + newsCount)
            .data("id", newsCount);

        $headerProgress = $(".wrapper-header .progress");
        var $body = $(".next-container.i" + newsCount);
        if ($(".next-container.hidden").length < 1) lock = true;
        sm($body, newsCount);
    }

    if ("scrollRestoration" in history) {
        history.scrollRestoration = "manual";
    }

    window.addEventListener(
        "popstate",
        function (event) {
            var url,
                index,
                top = 0;
            if (event.state && event.state.pageTitle !== undefined) {
                document.title = event.state.pageTitle;
            }
            if (!scrollLock) {
                for (var i = 0, size = newsArr.length; i < size; i++) {
                    if (!newsArr[i]) {
                        continue;
                    }
                    url = newsArr[i].url;
                    if (window.location.href == url) {
                        index = i;
                        break;
                    }
                }
                if (index == 0) {
                    return;
                }
                lockHistoryBack = true;
                if (index != 1) {
                    if ($(".next-container.i" + index + " .next-render").length > 0) {
                        top =
                            $(".next-container.i" + index + " .next-render").offset().top - 100;
                    }
                }
                $("html,body").animate({scrollTop: top}, 350, function () {
                    lockHistoryBack = false;
                });
                return;
            }
            scrollLock = false;
        },
        false
    );

    function sm(item, count) {
        var localCount = count;
        var duration = 0;
        var offset = 0;
        if (count == 1) {
            //offset = -80;
        }

        //Правки 13.02
        moveSimilarBlock();
        scrollNews(count);
        setInterval(refreshNewsScenes, 1000);
        //

        // if (item.find(".next-banners")[0]) {
        //   offset = 1150;
        // }
        if (item.find(".inner-title_col-2.fixed").length > 0 && !$mobile) {
            item.find(".inner-title_col-2.fixed").addClass("i" + count);
            duration =
                item.find(".inner-title_col-1").height() -
                rightBannerHeight;
        }

        if (item.find(".full").length) {
            $(".fixed").removeClass("fixed");
        }

        if (duration > 0) {
            bannerScenes[count] = new ScrollMagic.Scene({
                //triggerElement: ".next-container.i" + count,
                triggerElement: ".inner-title_col-2.fixed.i" + count,
                triggerHook: "onLeave",
                offset: offset,
                duration: duration
            })
                .addTo(controller)
                .setPin(".inner-title_col-2.fixed.i" + count)
                .on("progress", function (evt) {
                 //   updateFixedNewsScene(evt.currentTarget, item, duration, "banner", count);
                });

            newsFixed(item, count);
        }
        var dur = item.height();
        scenes[count] = new ScrollMagic.Scene({
            triggerElement: ".next-container.i" + count,
            triggerHook: "onLeave",
            duration: dur
        })
            .addTo(controller)
            .on("enter", function (e) {
                if (e.scrollDirection == "FORWARD" && !lockHistoryBack) {
                    helpers.updateUrl(
                        null,
                        newsArr[localCount].url,
                        newsArr[localCount].seo_title
                    );

                    // Yandex Metrika
                    $(document).on("yaCounter40892819", function () {
                        yaCounter40892819.hit(newsArr[localCount].url, {
                            title: newsArr[localCount].seo_title
                        });
                    });

                    //Google Analytics
                    ga("send", {
                        hitType: "pageview",
                        page: window.location.pathname,
                        location: window.location.pathname,
                        title: newsArr[localCount].seo_title
                    });
                }
            })
            .on("progress", function (e) {
                var percent = e.progress * 100;
                if (dur < item.height()) {
                    dur = item.height();
                }

                $headerProgress.css("width", percent + "%");

                if (
                    percent > 0 &&
                    !lock &&
                    !newsArr[localCount + 1]
                    && localCount < 12
                ) {
                    if (navigator.userAgent.search(/Firefox/) > 0) {
                        // Здесь что-угодно только для браузера Mozilla Firefox
                    } else {

                        addNews(localCount);
                    }
                }
            })
            .on("leave", function (e) {
                if (e.scrollDirection == "REVERSE" && count != 1 && !lockHistoryBack) {
                    scrollLock = true;
                    helpers.updateUrl(
                        null,
                        newsArr[localCount - 1].url,
                        newsArr[localCount - 1].title
                    );
                    // window.history.go(-1);
                }
            });
        // Метка для медиатора
        item.find(".inner-text_content").addClass("js-mediator-article" + count);
        if (typeof window._mediator !== "undefined") {
            if (window._mediator.isActive()) {
                window._mediator.stop();
            }
            window._mediator.start({
                url: postData.URL,
                articleSelector: ".js-mediator-article" + count
            });
        }

    }

    function moveSimilarBlock() {
        var bglink = document.querySelector(".wrapper-inner > .bglink"),
            container = document.querySelector(".next-container.i1");
        if (!bglink) {
            return;
        }
        container.appendChild(bglink);
    }

    function scrollNews(count) {
        if (!document.querySelector(".next-container.i" + (count - 1)) || !document.querySelector(".next-container .next-render-background")) {
            return;
        }

        newsScenes[count] = new ScrollMagic.Scene({
            triggerElement: ".next-container.i" + (count - 1),
            triggerHook: "onLeave",
        })
            //.setPin(".next-container.i" + count, {pushFollowers: false})
            //.addTo(controller)
            .on("enter", function (event) {
                var target = event.target.triggerElement();
                if (!target) {
                    return;
                }
                target.parentNode.style.zIndex = 12;
            })
            .on("leave", function (event) {
                var target = event.target.triggerElement();
                if (!target) {
                    return;
                }
                target.parentNode.style.zIndex = 9;
            })
            .on("start", function (event) {
                var elem = document.querySelector(".next-container.i" + (count - 1));
                if (!elem) {
                    return;
                }
                event.target.duration(document.querySelector(".next-container.i" + (count - 1)).offsetHeight);
            });

	/*
        new ScrollMagic.Scene({
            triggerElement: ".next-container.i" + (count),
            triggerHook: "onLeave",
            offset: -window.innerHeight,
            duration: window.innerHeight
        })
            .addTo(controller)
            .on("progress", function (e) {
                document.querySelector(".next-container.i" + count + " .next-render-background").style.opacity = .7 - e.progress;
            });
	*/
    }

    function newsFixed(item, count) {
        var localCount = count;
        var duration = 0;
        var offset = 0;
        if (count == 1) {
            //offset = -80;
        }
        // if (item.find(".next-banners")[0]) {
        //   offset = 1150;
        // }
        if (item.find(".inner-title_col-3.fixed").length > 0 && !$mobile) {
            item.find(".inner-title_col-3.fixed").addClass("i" + count);
            duration =
                item.find(".inner-title_col-1").height() -
                item.find(".inner-title_col-3").height();
	    
        }
        if (duration > 0) {
            titleScenes[count] = new ScrollMagic.Scene({
                triggerElement: ".inner-title_col-3.fixed.i" + count,
                triggerHook: "onLeave",
                offset: offset,
                duration: duration
            })
                .addTo(controller)
                .setPin(".inner-title_col-3.fixed.i" + count)
                .on("progress", function (evt) {
           //         updateFixedNewsScene(evt.currentTarget, item, duration, "share", count);
                });
        }
    }

    function updateFixedNewsScene(scene, item, duration, type, count) {
        var newDuration;
        if (type == "share") {
            newDuration =
                item.find(".inner-title_col-1").height() -
                item.find(".inner-title_col-3").height();
        } else if (type == "banner") {
            newDuration =
                item.find(".inner-title_col-1").height() -
                rightBannerHeight;
        }
        if (count > 1) {
            var offset = item.find(".b-inner").height();
            var bannerSize = item.find(".next-banners").height();
            if (bannerSize > 0) bannerSize += 60;
            scene.offset(offset + bannerSize - 20);
        }
        window.ascene = scene;
        if (duration != newDuration) {
            scene.duration(newDuration);
        }
    }

    function getNextPostUrl(count, catParam) {
        var url = "",
            nextPost = nextPosts[count - 1];


        if (!nextPost || postDataArray.indexOf(nextPost) != -1) {
            url = "/wp-content/themes/inc/ajax/next.php?paged=" + (newsCount - (postData.Next != 0 ? newsCount - 1 : 0)) +
                "&exception=" + postDataArray.join(',') + "&include=" + (postData.Next ? postData.Next.toString() : "") +
                "&type=" + catParam;
            return url;
        }

        url = "/wp-content/themes/inc/ajax/next.php?include=" + nextPosts[count - 1].toString() +
            "&exception=" + postDataArray.join(',') + "&type=journal";
        return url;
    }

    function addNews(count) {
        lock = true;
        var catParam = "",
            url = "";
        if (
            category == "start" ||
            category == "fly" ||
            category == "concoct" ||
            category == "understand" ||
            category == "switch"
        ) {
            catParam = "journal";
        } else if (category == "pnews") {
            catParam = "pnews";
        } else if (category == "news") {
            catParam = "news";
        } else if (category == "social") {
            catParam = "social";
        }

        url = getNextPostUrl(count, catParam);

        $.getJSON(url, function (data) {
            if (data) {
                var corData = 0;
                if (postData.Next != 0) {
                    corData = newsCount - 1;
                }
                newsCount++;
                $(".next-container.hidden")
                    .clone()
                    .removeClass("hidden")
                    .addClass("i" + newsCount)
                    .addClass(newsCount % 2 == 0 ? "odd" : "even")
                    .insertBefore(".next-container.hidden");
                newsArr[newsCount] = {
                    url: data[0 + corData].href,
                    title: data[0 + corData].name,
                    seo_title: data[0 + corData].seo_title
                };

                var $body = $(".next-container.i" + newsCount);
                var bannerId = "adfox_s_" + Math.round(Math.random() * 100000);
                var bannerMobileId = "adfox_m_" + Math.round(Math.random() * 100000);
                $body.find(".scrollBanner").attr("id", bannerId);
                $body.find(".scrollMobileBanner").attr("id", bannerMobileId);
                addNextBanner(bannerId);
                addNextMobileBanner(bannerMobileId);
                $body.find(".widget-container").addClass("i" + newsCount);
                $(".smi2").remove();
                // $body.find(".smi2").html("<div id=\"unit_92719\"><a href=\"http://smi2.ru/\" >Новости СМИ2</a></div>");
                // (function() {
                //   var sc = document.createElement('script'); sc.type = 'text/javascript'; sc.async = true;
                //   sc.src = '//smi2.ru/data/js/92719.js'; sc.charset = 'utf-8';
                //   var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(sc, s);
                // }());
                if (newsCount != 1) {
                    $("<div class='banner-news i" + newsCount + "'></div>").insertBefore(
                        ".widget-container.i" + newsCount
                    );
                    //if (typeof(pr) == 'undefined') { var pr = Math.floor(Math.random() * 4294967295 ) + 1; }
                    //var addate = new Date();
                    //$(".banner-news.i"+newsCount).html('<iframe src="//ads.adfox.ru/253749/getCode?pp=mqf&amp;ps=ckhn&amp;p2=fvfq&amp;p3=a&amp;pr=' + pr +'&amp;pt=b&amp;pd=' + addate.getDate() + '&amp;pw=' + addate.getDay() + '&amp;pv=' + addate.getHours() + '" frameBorder="0" width="1160" height="300" marginWidth="0" marginHeight="0" scrolling="no" style="border: 0px; margin: 0px; padding: 0px;"><a href="//ads.adfox.ru/253749/goDefaultLink?pp=mqf&amp;ps=ckhn&amp;p2=fvfq" target="_top"><img src="//ads.adfox.ru/253749/getDefaultImage?pp=mqf&amp;ps=ckhn&amp;p2=fvfq" border="0" alt=""><\/a><\/iframe>');

                    YandexZen.renderWidget({
                        clid: ["442", "443"], // идентификатор партнера, должен быть получен в пункте 2
                        container: ".widget-container.i" + newsCount, // cелектор элемента или сам элемент, куда надо вставить виджет
                        successCallback: function () {
                            // вызывается при успешной вставке виджета
                        },
                        failCallback: function () {
                            // вызывается при неуспешной вставке виджета
                        }
                    });
                } else {
                    $body
                        .find(".widget-container.i" + newsCount)
                        .closest(".b-inner")
                        .remove();
                }

                postData = {
                    Type: postData.Type,
                    ID: data[0].ID,
                    Title: data[0].name,
                    seo_title: data[0].seo_title,
                    URL: data[0].href,
                    Next: data[0].Next || 0,
                    toString: function () {
                        return this.ID;
                    }
                };
                postDataArray.push(postData);

                render
                    .render(
                        "next",
                        ".next-container.i" + newsCount + " .next-render",
                        [data[0 + corData]],
                        {newsCount: newsCount}
                    )
                    .done(function () {
                        if (typeof SetkaEditorPublic !== "undefined") {
                            SetkaEditorPublic.start();
                        }
                        lock = false;
                        sm($body, newsCount);
                        if (newsCount < 5) {
                            $(".next-container.i" + newsCount + ' .social-author').eq(1).before('<p class="next-post"><a href="#" class="next-post-link">Следующий материал</a></p>');
                        }
                        if (data[0 + corData].inf18) {
                            var str = '<link rel="stylesheet" href="/dev/rvcinf/styles/css/bootstrap.min.css"><link rel="stylesheet" href="/dev/rvcinf/styles/css/style.css"><script>(function(){var inner = document.getElementById("rvcPollInner"),parent = inner.parentNode,div = document.createElement("div");parent.setAttribute("id","rvcPoll");})();</script><script src="/dev/rvcinf/scripts/vue.js"></script><script src="/dev/rvcinf/scripts/data.js"></script><script src="/dev/rvcinf/scripts/aos.js"></script><script src="/dev/rvcinf/scripts/common.js"></script>';
                            $(".next-container.i" + newsCount).before(str);
                        }

                    });
            }
        });
    }

    return myfunctions;
};

/* Main Page */
DK.Pages.Main = function () {
    var myfunctions = {
        resize: function (cat) {
            $.each($(".journal-container"), function () {
                if (!$(this).hasClass("hidden")) {
                    $(this).remove();
                }
            });
            $(".journal-container").removeClass("hidden");
            $(".wrapper-journal-more").remove();
            $(".slick-initialized").slick("unslick");
            if (!$mobile && !$smalldt) {
                $(".news-slider.desktop").slick({});
            } else if ($smalldt) {
                $(".news-slider.smalldt").slick({});
            } else if ($mobile) {
                $(".instuctions_line").removeClass("for-dib");
                $(".instuctions_line").slick({
                    dots: true,
                    centerMode: true,
                    centerPadding: "10px",
                    infinite: true,
                    variableWidth: false
                });
                $(".news-slider.mobile").slick({
                    dots: true,
                    centerMode: true,
                    centerPadding: "10px"
                });
            }
            lineArr = [];
            vk1Arr = [];
            vk2Arr = [];
            blineArr = [];
            line = 0;
            bline = 0;
            icount = [];
            vk1count = [];
            vk2count = [];
            bcount = [];
            pagemain.init(cat);
        },
        init: function (cat) {
            if ($mobile) {
                renderType = "mobile";
            } else if ($smalldt) {
                renderType = "small";
            } else {
                renderType = "desktop";
            }
            switch (cat) {
                case "start":
                    rubrik = "&category=1877";
                    break;
                case "blockchain":
                    rubrik = "&category=2684";
                    break;
                case "frii":
                    rubrik = "&category=2494";
                    break;
                case "fly":
                    rubrik = "&category=4";
                    break;
                case "understand":
                    rubrik = "&category=3";
                    break;
                case "switch":
                    rubrik = "&category=11528";
                    break;
                case "concoct":
                    rubrik = "&category=2";
                    break;
                case "news":
                    rubrik = "news";
                    break;
                case "specials":
                    rubrik = "&category=6814";
                    break;
                case "pnews":
                    rubrik = "pnews";
                    break;
                case "social":
                    rubrik = "social";
                    break;
                case "instruction":
                    rubrik = "instruction";
                    break;
                case "vk":
                    rubrik = "vk";
                    break;
                default:
                    rubrik = "";
                    break;
            }
            page = 1;
            $(".journal-container")
                .addClass("here")
                .clone()
                .removeClass("here")
                .addClass("hidden")
                .insertAfter(".journal-container.here");
            if (rubrik != "news" && rubrik != "pnews" && rubrik != "social") {
                $('<div class="wrapper-journal wrapper-journal-more"><div class="b-journal b-journal-more"><div class="journal-more"><a href="#" class="journal-more_link here">Загрузить еще<span class="mainsprite-more"></span></a></div></div></div>').insertAfter(".journal-container.hidden");
            } else {
                $('<div class="news_18-items"></div>').appendTo(".journal-title_col-1");
                $('<div class="journal-more"><a href="#" class="journal-more_link here">Загрузить еще<span class="mainsprite-more"></span></a></div>').insertAfter(".news_18-items");
                $('<div class="search_found here"></div><div class="search_found hidden"></div>').appendTo(".news_18-items");
            }
            getMainPage(page);
            $(".journal-more_link.here").on("click", function () {
                $(this)
                    .find("span")
                    .addClass("animate-spin");
                page++;
                if (rubrik != "news" && rubrik != "pnews" && rubrik != "social") {
                    $(".journal-container.here").removeClass("here");
                    $(".journal-container.hidden")
                        .clone()
                        .removeClass("hidden")
                        .addClass("here")
                        .insertBefore(".journal-container.hidden");
                } else {
                    $(".search_found.here").removeClass("here");
                    $(".search_found.hidden")
                        .clone()
                        .removeClass("hidden")
                        .addClass("here")
                        .insertBefore(".search_found.hidden");
                }
                getMainPage(page);
                return false;
            });
            $(".load_more").on("click", function () {
                $(this)
                    .find("span")
                    .addClass("animate-spin");
                page++;
                $(".instruments .content .render.here").removeClass("here");
                $(".instruments .content .render.hidden")
                    .clone()
                    .removeClass("hidden")
                    .addClass("here")
                    .insertBefore(".instruments .content .render.hidden");
                $(".cases .content .render.here").removeClass("here");
                $(".cases .content .render.hidden")
                    .clone()
                    .removeClass("hidden")
                    .addClass("here")
                    .insertBefore(".cases .content .render.hidden");
                getMainPage(page);
                return false;
            });
        }
    };

    function getMainPage(page) {
        if (rubrik == "news") {
            $.getJSON(
                "/wp-content/themes/inc/ajax/news.php?paged=" +
                page +
                "&posts_per_page=9",
                function (data) {
                    ss = data;
                    var itemDate;
                    $.each(data, function () {
                        itemDate = this.get_the_date.substring(
                            0,
                            this.get_the_date.indexOf(" |")
                        );
                        if (itemDate != prevItemDate && prevItemDate) line++;
                        if (!lineArr[line]) {
                            lineArr[line] = {
                                name: this.get_the_date.substring(
                                    0,
                                    this.get_the_date.indexOf(" |")
                                ),
                                id: line,
                                render: true
                            };
                            lineArr[line]["in"] = [];
                        }
                        lineArr[line]["in"].push(this);
                        lineArr[line]["render"] = true;
                        prevItemDate = this.get_the_date.substring(
                            0,
                            this.get_the_date.indexOf(" |")
                        );
                    });
                    if (data.length < 9) {
                        $(".journal-more").hide();
                    }

                    $.each(lineArr, function (index, value) {
                        render
                            .render(
                                "news_18",
                                ".news_18-items .search_found.here",
                                value.in
                            )
                            .done(function () {
                                value.in = [];
                                // if (checkAmazon) checkAmazon();
                                $(".journal-more_link.here")
                                    .find("span")
                                    .removeClass("animate-spin");
                            });
                    });

                    //render.render("news",".search_found.here",data).done(function(){
                    //	$(".journal-more_link.here").find("span").removeClass("animate-spin");
                    //})
                }
            );
        } else if (rubrik == "pnews") {
            $.getJSON(
                "/wp-content/themes/inc/ajax/pnews.php?paged=" +
                page +
                "&posts_per_page=9",
                function (data) {
                    ss = data;
                    var itemDate;
                    $.each(data, function () {
                        itemDate = this.get_the_date.substring(
                            0,
                            this.get_the_date.indexOf(" |")
                        );
                        if (itemDate != prevItemDate && prevItemDate) line++;
                        if (!lineArr[line]) {
                            lineArr[line] = {
                                name: this.get_the_date.substring(
                                    0,
                                    this.get_the_date.indexOf(" |")
                                ),
                                id: line,
                                render: true
                            };
                            lineArr[line]["in"] = [];
                        }
                        lineArr[line]["in"].push(this);
                        lineArr[line]["render"] = true;
                        prevItemDate = this.get_the_date.substring(
                            0,
                            this.get_the_date.indexOf(" |")
                        );
                    });
                    if (data.length < 9) {
                        $(".journal-more").hide();
                    }
                    $.each(lineArr, function (index, value) {
                        render
                            .render(
                                "news_18",
                                ".news_18-items .search_found.here",
                                value.in
                            )
                            .done(function () {
                                value.in = [];
                                // if (checkAmazon) checkAmazon();
                                $(".journal-more_link.here")
                                    .find("span")
                                    .removeClass("animate-spin");
                            });
                    });

                    //render.render("news",".search_found.here",data).done(function(){
                    //	$(".journal-more_link.here").find("span").removeClass("animate-spin");
                    //})
                }
            );
        } else if (rubrik == "social") {
            $.getJSON(
                "/wp-content/themes/inc/ajax/social.php?paged=" +
                page +
                "&posts_per_page=9",
                function (data) {
                    ss = data;
                    var itemDate;
                    $.each(data, function () {
                        itemDate = this.get_the_date.substring(
                            0,
                            this.get_the_date.indexOf(" |")
                        );
                        if (itemDate != prevItemDate && prevItemDate) line++;
                        if (!lineArr[line]) {
                            lineArr[line] = {
                                name: this.get_the_date.substring(
                                    0,
                                    this.get_the_date.indexOf(" |")
                                ),
                                id: line,
                                render: true
                            };
                            lineArr[line]["in"] = [];
                        }
                        lineArr[line]["in"].push(this);
                        lineArr[line]["render"] = true;
                        prevItemDate = this.get_the_date.substring(
                            0,
                            this.get_the_date.indexOf(" |")
                        );
                    });
                    if (data.length < 9) {
                        $(".journal-more").hide();
                    }
                    $.each(lineArr, function (index, value) {
                        render
                            .render(
                                "news_18",
                                ".news_18-items .search_found.here",
                                value.in
                            )
                            .done(function () {
                                value.in = [];
                                // if (checkAmazon) checkAmazon();
                                $(".journal-more_link.here")
                                    .find("span")
                                    .removeClass("animate-spin");
                            });
                    });
                }
            );
        } else if (rubrik == "instruction") {
            $.getJSON(
                "/wp-content/themes/inc/ajax/instruction.php?paged=" +
                page +
                "&posts_per_page=15",
                function (data) {
                    ss = data;
                    var sumIndex = 0;
                    $.each(data, function (index, item) {
                        sumIndex++;
                        if (sumIndex == 2) {
                            item.type = "type4";
                            sumIndex = 0;
                        } else {
                            item.type = "type2";
                        }
                        if (!icount[line]) icount[line] = 0;
                        if (!lineArr[line]) {
                            lineArr[line] = {};
                            lineArr[line]["Items"] = [];
                        }
                        if (typesObj[item.type] + icount[line] <= itemsPerLine) {
                            lineArr[line]["Items"].push(item);
                            icount[line] = typesObj[item.type] + icount[line];
                            lineArr[line]["Count"] = icount[line];
                            if (icount[line] == itemsPerLine) {
                                line++;
                            }
                        }
                    });
                    renderArr = lineArr;
                    if (data.length < 15) {
                        $(".journal-more").hide();
                    }
                    if ($mobile) {
                        $(".journal-container.here").addClass("page-" + page);
                        render
                            .render("instruction_mobile", ".journal-container.here", data)
                            .done(function () {
                                // if (checkAmazon) checkAmazon();
                                $(".journal-more_link.here")
                                    .find("span")
                                    .removeClass("animate-spin");
                            });
                    } else {
                        render
                            .render("instruction", ".journal-container.here", renderArr, {
                                itemsPerLine: itemsPerLine
                            })
                            .done(function () {
                                // if (checkAmazon) checkAmazon();
                                $(".journal-more_link.here")
                                    .find("span")
                                    .removeClass("animate-spin");
                                var arrToRemove = [];
                                $.each(lineArr, function (index, value) {
                                    if (value.Count == itemsPerLine) {
                                        arrToRemove.push(index);
                                        line = line - 1;
                                    }
                                });
                                $.each(arrToRemove, function (index, value) {
                                    removeArr(lineArr, value - index);
                                    removeArr(icount, value - index);
                                });
                            });
                    }
                }
            );
        } else if (rubrik == "vk") {
            $.getJSON(
                "/wp-content/themes/inc/ajax/journal.php?paged=" +
                page +
                "&posts_per_page=16&category=3223",
                function (data) {
                    ss1 = data;
                    if (page > 1 || $mobile) {
                        $(".load_more").hide();
                    }
                    if (data) {
                        $(".instruments span.count").html(data.length);
                    }
                    var prevIndex;
                    var sumIndex = 0;
                    $.each(data, function (index, value) {
                        if (value.type == "type5" || value.type == "type6") {
                            delete data[index];
                        }
                    });
                    temArrvk = [];
                    $.each(data, function (index, value) {
                        if (value) {
                            temArrvk.push(value);
                        }
                    });
                    data = temArrvk;
                    var vk1renderArr = sortLocalItems(data, 2, vk1Arr, "vk1");
                    vk1Arr = vk1renderArr.slice();

                    var ach = 0;
                    var tempArr1 = [];
                    var i = 0;
                    $.each(vk1renderArr, function (index, value) {
                        if (value && value.Complete && (i < 2 * page || $mobile)) {
                            tempArr1.push(value);
                            i++;
                        }
                    });
                    vk1renderArr = tempArr1;
                    var check = true;
                    var a = 0;
                    var teml = "vk";

                    render
                        .render(teml, ".instruments .content .render.here", vk1renderArr, {
                            itemsPerLine: 2
                        })
                        .done(function () {
                            // if (checkAmazon) checkAmazon();
                            $(".load_more span").removeClass("animate-spin");

                            ff1 = [];
                            $.each(vk1renderArr, function () {
                                ff1.push(this);
                            });
                            var arrToRemove = [];
                            var i = 0;
                            $.each(vk1Arr, function (index, value) {
                                if (value && value.Complete && i < (2 * page || $mobile)) {
                                    arrToRemove.push(index);
                                    line = line - 1;
                                    if (line < 0) line = 0;
                                    i++;
                                }
                            });
                            $.each(arrToRemove, function (index, value) {
                                removeArr(vk1Arr, value - index);
                                removeArr(vk1count, value - index);
                            });
                        });
                }
            );
            $.getJSON(
                "/wp-content/themes/inc/ajax/journal.php?paged=" +
                page +
                "&posts_per_page=12&category=3224",
                function (data) {
                    ss2 = data;
                    if (data) {
                        $(".cases span.count").html(data.length);
                    }
                    var prevIndex;
                    var sumIndex = 0;
                    $.each(data, function (index, value) {
                        if (value.type == "type5" || value.type == "type6") {
                            delete data[index];
                        }
                    });
                    temArrvk = [];
                    $.each(data, function (index, value) {
                        if (value) {
                            temArrvk.push(value);
                        }
                    });
                    data = temArrvk;
                    var vk2renderArr = sortLocalItems(data, 2, vk2Arr, "vk2");
                    vk2Arr = vk2renderArr.slice();

                    var ach = 0;
                    var tempArr1 = [];
                    var i = 0;

                    $.each(vk2renderArr, function (index, value) {
                        if (value && value.Complete && (i < 2 || $mobile)) {
                            tempArr1.push(value);
                            i++;
                        }
                    });

                    vk2renderArr = tempArr1;
                    var check = true;
                    var a = 0;
                    var teml = "vk";

                    render
                        .render(teml, ".cases .content .render.here", vk2renderArr, {
                            itemsPerLine: 2
                        })
                        .done(function () {
                            $(".load_more span").removeClass("animate-spin");
                            // if (checkAmazon) checkAmazon();
                            ff = [];
                            $.each(vk2renderArr, function () {
                                ff.push(this);
                            });
                            var arrToRemove = [];
                            var i = 0;
                            $.each(vk2Arr, function (index, value) {
                                if (value && value.Complete && (i < 2 || $mobile)) {
                                    arrToRemove.push(index);
                                    line = line - 1;
                                    if (line < 0) line = 0;
                                    i++;
                                }
                            });
                            $.each(arrToRemove, function (index, value) {
                                removeArr(vk2Arr, value - index);
                                removeArr(vk2count, value - index);
                            });
                        });
                }
            );
        } else {
            //$.getJSON("/wp-content/themes/inc/ajax/best.php",function(data){
            //	s1 = data;
            //})
            var request = "/journal/?paged=" + page + "&posts_per_page=45" + rubrik;
            if (rubrik == "" && page == 1) request = "/journal/index.php";
            $.getJSON(request, function (data) {
                ss = data;
                if (!data || data.length < 45) {
                    $(".journal-more").hide();
                }
                var prevIndex;
                var sumIndex = 0;
                $.each(data, function (index, value) {
                    if (this.center_post) {
                        this.type = "type6";
                        this.center = true;
                    }
                    if (value.old && value.type == "type1") {
                        sumIndex++;
                        if (sumIndex == 2) {
                            value.type = "type4";
                            sumIndex = 0;
                        } else {
                            value.type = "type2";
                        }
                    } else {
                        sumIndex = 0;
                    }
                });
                renderArr = sortItems(data);
                if ($mobile) {
                    $(".journal-container.here").addClass("page-" + page);
                    render
                        .render("journal_mobile", ".journal-container.here", data)
                        .done(function () {
                            $(".journal-more_link.here")
                                .find("span")
                                .removeClass("animate-spin");
                            //$(".wrapper-instuctions").appendTo(".journal-container.page-1 .instuctions-container");

                            if ($(".pnews-container .pnews").length == 0 && category == "") {
                                $(
                                    "<div class='pnews-container'><div class='pnews'></div></div><div class='pnews-container'><div class='pnews'></div></div>"
                                ).appendTo(".journal-container.page-1");
                            }
                            if (category == "") {
                                $.getJSON("/journal/pnews/", function (data) {
                                    $pnews = $($(".pnews-container .pnews").get(0));
                                    $pnews.html(
                                        "<h3><a href='/pnews/'>Новости партнеров</a></h3><div class='render-place'></div><div class='pnews-quest'><a href='https://incrussia.ru/adv/'>Хотите стать партнером Inc?</a></div>"
                                    );
                                    render
                                        .render(
                                            "pnews",
                                            ".pnews-container .pnews .render-place",
                                            data
                                        )
                                        .done(function () {
                                            // if (checkAmazon) checkAmazon();
                                            var rightBlockHeight =
                                                $($(".pnews-container").get(0))
                                                    .parent()
                                                    .height() +
                                                $($(".pnews-container").get(1))
                                                    .parent()
                                                    .height() +
                                                50 +
                                                22;
                                            if (
                                                $($(".pnews-container .pnews").get(0)).height() -
                                                rightBlockHeight >
                                                0
                                            ) {
                                                var maxHeight = 0;
                                                $.each(
                                                    $(".pnews .render-place .search_found_item"),
                                                    function (index, value) {
                                                        maxHeight = maxHeight + $(value).height() + 22;
                                                        if (maxHeight > rightBlockHeight)
                                                            $(value).addClass("hidden");
                                                    }
                                                );
                                            }
                                        });
                                });
                                $.getJSON("/journal/social/", function (data) {
                                    $pnews = $($(".pnews-container .pnews").get(1));
                                    $pnews.html(
                                        "<h3><a href='/social/'>Inc.Social</a><span class='partner-badge'>Партнерская рубрика</span></h3><div class='render-social-place'></div><div class='pnews-quest'><a href='https://incrussia.ru/social/'>Партнер рубрики ЛУЧ Studio</a></div>"
                                    );
                                    render
                                        .render(
                                            "pnews",
                                            ".pnews-container .pnews .render-social-place",
                                            data
                                        )
                                        .done(function () {
                                            // if (checkAmazon) checkAmazon();
                                            var rightBlockHeight =
                                                $($(".pnews-container").get(1))
                                                    .parent()
                                                    .height() +
                                                $($(".pnews-container").get(2))
                                                    .parent()
                                                    .height() +
                                                50 +
                                                22;
                                            if (
                                                $($(".pnews-container .pnews").get(1)).height() -
                                                rightBlockHeight >
                                                0
                                            ) {
                                                var maxHeight = 0;
                                                $.each(
                                                    $(".pnews .render-social-place .search_found_item"),
                                                    function (index, value) {
                                                        maxHeight = maxHeight + $(value).height() + 22;
                                                        if (maxHeight > rightBlockHeight)
                                                            $(value).addClass("hidden");
                                                    }
                                                );
                                            }
                                        });
                                });
                            }
                        });
                } else {
                    var ach = 0;
                    var tempArr1 = [];
                    var tempArr2 = [];
                    var check = true;
                    $.each(renderArr, function (index, value) {
                        if (value.Center && check && category != "frii") {
                            tempArr1 = value;
                            removeArr(renderArr, index);
                            renderArr.splice(2, 0, tempArr1);
                            check = false;
                        }
                    });
                    var check = true;
                    var a = 0;
                    $.each(renderArr, function (index, value) {
                        if (value.Max == 3 || value.Max == 2) {
                            a++;
                            ach++;
                            tempArr1 = value;
                            removeArr(renderArr, index);
                            renderArr.splice(2 + a, 0, tempArr1);
                        }
                    });
                    var teml = "journal";
                    render
                        .render(teml, ".journal-container.here", renderArr, {
                            itemsPerLine: itemsPerLine
                        })
                        .done(function () {
                            // if (checkAmazon) checkAmazon();
                            $(".journal-more_link.here")
                                .find("span")
                                .removeClass("animate-spin");
                            if (category != "frii" && category != "blockchain") {
                                $.getJSON("/journal/pnews/", function (data) {
                                    ach = 0;
                                    $pnews = $($(".pnews-container .pnews").get(0));
                                    $pnews.html(
                                        "<h3><a href='/pnews/'>Новости партнеров</a></h3><div class='render-place'></div><div class='pnews-quest'><a href='https://incrussia.ru/adv/'>Хотите стать партнером Inc?</a></div>"
                                    );
                                    render
                                        .render(
                                            "pnews",
                                            ".pnews-container .pnews .render-place",
                                            data
                                        )
                                        .done(function () {
                                            var rightBlockHeight =
                                                $($(".pnews-container").get(0))
                                                    .parent()
                                                    .height() +
                                                $($(".pnews-container").get(1))
                                                    .parent()
                                                    .height() +
                                                50 +
                                                22;
                                            if (
                                                $($(".pnews-container .pnews").get(0)).height() -
                                                rightBlockHeight >
                                                0
                                            ) {
                                                var maxHeight = 0;
                                                $.each(
                                                    $(".pnews .render-place .search_found_item"),
                                                    function (index, value) {
                                                        maxHeight = maxHeight + $(value).height() + 22;
                                                        if (maxHeight > rightBlockHeight)
                                                            $(value).addClass("hidden");
                                                    }
                                                );
                                            }
                                        });
                                });
                                $.getJSON("/journal/social/", function (data) {
                                    ach = 0;
                                    $pnews = $($(".pnews-container .pnews").get(2));
                                    $pnews.html(
                                        "<h3 style=''><a href='/social/'>Inc.Social</a><span class='partner-badge'>Партнерская рубрика</span></h3><div class='render-social-place'></div><div class='pnews-quest'><a href='https://incrussia.ru/social/'>Партнер рубрики ЛУЧ Studio</a></div>"
                                    );
                                    render
                                        .render(
                                            "pnews",
                                            ".pnews-container .pnews .render-social-place",
                                            data
                                        )
                                        .done(function () {
                                            var rightBlockHeight =
                                                $($(".pnews-container").get(1))
                                                    .parent()
                                                    .height() +
                                                $($(".pnews-container").get(2))
                                                    .parent()
                                                    .height() +
                                                50 +
                                                22;
                                            if (
                                                $($(".pnews-container .pnews").get(1)).height() -
                                                rightBlockHeight >
                                                0
                                            ) {
                                                var maxHeight = 0;
                                                $.each(
                                                    $(".pnews .render-social-place .search_found_item"),
                                                    function (index, value) {
                                                        maxHeight = maxHeight + $(value).height() + 22;
                                                        if (maxHeight > rightBlockHeight)
                                                            $(value).addClass("hidden");
                                                    }
                                                );
                                            }
                                        });
                                });
                            }
                            ff = [];
                            $.each(renderArr, function () {
                                ff.push(this);
                            });
                            var arrToRemove = [];
                            $.each(lineArr, function (index, value) {
                                if (value.Complete) {
                                    arrToRemove.push(index);
                                    line = line - 1;
                                    if (line < 0) line = 0;
                                }
                            });
                            $.each(arrToRemove, function (index, value) {
                                removeArr(lineArr, value - index);
                                removeArr(icount, value - index);
                            });
                        });
                }
            });
        }
    }

    function sortItems(mainArr, itemsPerL) {
        if (!itemsPerL) itemsPerL = itemsPerLine;
        $.each(mainArr, function (index, item) {
            correction = 0;
            if (category == "") {
                if ((lineNumber == 4 && line == 4) || (lineNumber == 3 && line == 3) || (lineNumber == 8 && line == 8) || (lineNumber == 7 && line == 7)) {
                    correction = 2;
                } else {
                    correction = 0;
                }
            }
            if (!icount[line]) icount[line] = 0;
            if (!lineArr[line]) {
                lineArr[line] = {};
                lineArr[line]["Items"] = [];
                lineArr[line]["Max"] = itemsPerL - correction;
            }
            if (typesObj[item.type] + icount[line] <= lineArr[line]["Max"]) {
                if (item.center_post) {
                    lineArr[line]["Center"] = true;
                    lineArr[line]["Complete"] = true;
                }
                lineArr[line]["Items"].push(item);
                icount[line] = typesObj[item.type] + icount[line];
                lineArr[line]["Count"] = icount[line];
                if (icount[line] == lineArr[line]["Max"]) {
                    lineArr[line]["Complete"] = true;
                    line++;
                    lineNumber++;
                }
            } else {
                var t = 1;
                var check = true;
                while (check) {
                    if (category == "") {
                        if (
                            (lineNumber + t == 4 && line + t == 4) ||
                            (lineNumber + t == 3 && line + t == 3) ||
                            (lineNumber + t == 8 && line + t == 8) ||
                            (lineNumber + t == 7 && line + t == 7)
                        ) {
                            correction = 2;
                        } else {
                            correction = 0;
                        }
                    }
                    if (!icount[line + t]) icount[line + t] = 0;
                    if (!lineArr[line + t]) {
                        lineArr[line + t] = {};
                        lineArr[line + t]["Items"] = [];
                        lineArr[line + t]["Max"] = itemsPerL - correction;
                    }
                    if (
                        typesObj[item.type] + icount[line + t] <=
                        lineArr[line + t]["Max"]
                    ) {
                        if (item.center_post) {
                            lineArr[line + t]["Center"] = true;
                            lineArr[line + t]["Complete"] = true;
                        }
                        lineArr[line + t]["Items"].push(item);
                        icount[line + t] = typesObj[item.type] + icount[line + t];
                        lineArr[line + t]["Count"] = icount[line + t];
                        if (icount[line + t] == lineArr[line + t]["Max"]) {
                            lineArr[line + t]["Complete"] = true;
                        }
                        check = false;
                    }
                    t++;
                }
            }
        });
        return lineArr;
    }

    function sortLocalItems(mainArr, itemsPerL, localArr, type) {
        var icount = [];
        if (type == "vk1") {
            icount = vk1count;
        } else if (type == "vk2") {
            icount = vk2count;
        }
        if (!localArr) localArr = [];
        if (!itemsPerL) itemsPerL = itemsPerLine;
        $.each(mainArr, function (index, item) {
            correction = 0;
            if (category == "") {
                if ((lineNumber == 4 && line == 4) || (lineNumber == 3 && line == 3) || (lineNumber == 8 && line == 8) || (lineNumber == 7 && line == 7)) {
                    correction = 2;
                } else {
                    correction = 0;
                }
            }
            if (!icount[line]) icount[line] = 0;
            if (!localArr[line]) {
                localArr[line] = {};
                localArr[line]["Items"] = [];
                localArr[line]["Max"] = itemsPerL - correction;
            }
            if (typesObj[item.type] + icount[line] <= localArr[line]["Max"]) {
                if (item.center_post) {
                    localArr[line]["Center"] = true;
                    localArr[line]["Complete"] = true;
                }
                localArr[line]["Items"].push(item);
                icount[line] = typesObj[item.type] + icount[line];
                localArr[line]["Count"] = icount[line];
                if (icount[line] == localArr[line]["Max"]) {
                    localArr[line]["Complete"] = true;
                    line++;
                    lineNumber++;
                }
            } else {
                var t = 1;
                var check = true;
                while (check) {
                    if (category == "") {
                        if (
                            (lineNumber + t == 4 && line + t == 4) ||
                            (lineNumber + t == 3 && line + t == 3) ||
                            (lineNumber + t == 8 && line + t == 8) ||
                            (lineNumber + t == 7 && line + t == 7)
                        ) {
                            correction = 2;
                        } else {
                            correction = 0;
                        }
                    }
                    if (!icount[line + t]) icount[line + t] = 0;
                    if (!localArr[line + t]) {
                        localArr[line + t] = {};
                        localArr[line + t]["Items"] = [];
                        localArr[line + t]["Max"] = itemsPerL - correction;
                    }
                    if (
                        typesObj[item.type] + icount[line + t] <=
                        localArr[line + t]["Max"]
                    ) {
                        if (item.center_post) {
                            localArr[line + t]["Center"] = true;
                            localArr[line + t]["Complete"] = true;
                        }
                        localArr[line + t]["Items"].push(item);
                        icount[line + t] = typesObj[item.type] + icount[line + t];
                        localArr[line + t]["Count"] = icount[line + t];
                        if (icount[line + t] == localArr[line + t]["Max"]) {
                            localArr[line + t]["Complete"] = true;
                        }
                        check = false;
                    }
                    t++;
                }
            }
        });
        if (type == "vk1") {
            vk1count = icount.slice();
        } else if (type == "vk2") {
            vk2count = icount.slice();
        }
        return localArr;
    }

    function sortBest(mainArr) {
        $.each(mainArr, function (index, item) {
            if (!bcount[bline]) bcount[bline] = 0;
            if (!blineArr[bline]) {
                blineArr[bline] = {};
                blineArr[bline]["Items"] = [];
            }
            if (typesObj[item.type] + bcount[bline] <= itemsPerbline) {
                blineArr[bline]["Items"].push(item);
                bcount[bline] = typesObj[item.type] + bcount[bline];
                blineArr[bline]["Count"] = bcount[bline];
                if (bcount[bline] == itemsPerbline) {
                    bline++;
                }
            } else {
                var t = 1;
                var check = true;
                while (check) {
                    if (!bcount[bline + t]) bcount[bline + t] = 0;
                    if (!blineArr[bline + t]) {
                        blineArr[bline + t] = {};
                        blineArr[bline + t]["Items"] = [];
                    }
                    if (typesObj[item.type] + bcount[bline + t] <= itemsPerbline) {
                        blineArr[bline + t]["Items"].push(item);
                        bcount[bline + t] = typesObj[item.type] + bcount[bline + t];
                        blineArr[bline + t]["Count"] = bcount[bline + t];
                        check = false;
                    }
                    t++;
                }
            }
        });
        return blineArr;
    }

    return myfunctions;
};
