function adsInCenterArticle() {
    if (document.documentElement.clientWidth < 768 ) {
        var div = document.createElement('div');
        div.id = 'adfox_155437697607926536';
        var setkaContent = document.querySelector('.stk-post');
        var counChildElements = setkaContent.children.length;
        var ChildCollections = setkaContent.children;
        for (var i = 0; i < counChildElements; i++) {
            if (i == Math.floor(counChildElements / 2)) {
                setkaContent.insertBefore(div, ChildCollections[i]);
                window.Ya.adfoxCode.createAdaptive({
                   ownerId: 253749,
                   containerId: 'adfox_155437697607926536',
                   params: {
                       pp: 'h',
                       ps: 'ddgv',
                       p2: 'giqc'
                   }
                }, ['desktop', 'tablet', 'phone'], {
                   tabletWidth: 830,
                   phoneWidth: 480,
                   isAutoReloads: false
                });
            }
        }
        //jQuery(function($) {
            //$('#adfox_155437697607926536').append('<span id="inc_ads">Реклама на Inc.</span>');
        //});
    } else {
        var div = document.createElement('div');
        div.id = 'adfox_155629231308843653';
        var setkaContent = document.querySelector('.stk-post');
        var counChildElements = setkaContent.children.length;
        var ChildCollections = setkaContent.children;
        for (var i = 0; i < counChildElements; i++) {
            if (i == Math.floor(counChildElements / 2)) {
                setkaContent.insertBefore(div, ChildCollections[i]);
                window.Ya.adfoxCode.createAdaptive({
                   ownerId: 253749,
                   containerId: 'adfox_155629231308843653',
                   params: {
                       pp: 'h',
                       ps: 'ddgv',
                       p2: 'gjsx'
                   }
               }, ['desktop', 'tablet', 'phone'], {
                   tabletWidth: 830,
                   phoneWidth: 480,
                   isAutoReloads: false
               });
            }
        }
    }
}
