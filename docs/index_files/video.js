$(".video_item1").on("click", "a",function(e){
  e.preventDefault();
  var iframe = $(".video_item1").find("iframe").get(0);
  var player = new Vimeo.Player(iframe);
  if (!$(".video_item1").hasClass("play")) {
    $(".video_item1").addClass("play");
    player.play();
  } else {
    $(".video_item1").removeClass("play");
    $(".video_item1").addClass("pause");
    player.pause();
  }
})


$(".video_line_item").on("click",function(){
  if (!$(this).hasClass("video_item1")) {
    $(".video_item1").removeClass("play");
    $(".video_item1").removeClass("pause");
    var thisHtml = $(this).html();
    var firstHtml = $(".video_item1").html();
    $(".video_item1").html(thisHtml);
    $(this).html(firstHtml);
    $(".video_item1").addClass("play");
    var iframe = $(".video_item1").find("iframe").get(0);
    var player = new Vimeo.Player(iframe);
    player.play();
  }
})
$(".video_line_item").on("click","a", function(e){
  e.preventDefault();
})
