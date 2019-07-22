$(".inner-subscribe_button button").click(function(){
        var flag = true;
		var fself = this;
        var email = $(fself).parents(".inner-subscribe_button").parents(".inner-subscribe").children(".inner-subscribe_mail").children("input[name='email']").val();
        var oEmail = $(fself).parents(".inner-subscribe_button").parents(".inner-subscribe").children(".inner-subscribe_mail").children("input[name='email']");
        if(email == "" || email == "Оставь свою почту"){
            flag = false;
        }

        if(flag){
            $.post("/wp-content/themes/inc/ajax/subscription.php", {
                "email": email
            }, function(data){
				console.log(data);
        if (data != "Ошибка :(") {
          ga('send', 'event', 'subscribe','submit');
          yaCounter40892819.reachGoal('subscribe');
        }
				oEmail.val(data),
				oEmail.attr("disabled","disabled");
				$(fself).attr("disabled","disabled");
            });
        }
        return false;
});


$(".sub_form .sub_form_btn").on("click",function(e){
    e.preventDefault();
    var email = $(".sub_form_input input[type='text']").val();
    var box = $(".sub_form_input input[type='text']");

    $.post("/wp-content/themes/inc/ajax/subscription.php", {
        "email": email
    }, function(data){
      if (data != "Ошибка :(") {
        ga('send', 'event', 'subscribe','submit');
        yaCounter40892819.reachGoal('subscribe');
      }
        box.val(data);
        box.prop("disabled","disabled");
    });

    return false;
});


$(".drop-menu_form .drop-menu_form_input_btn").on("click",function(e){
    e.preventDefault();
    var email = $(".drop-menu_form_input input[type='mail']").val();
    var box = $(".drop-menu_form_input input[type='mail']");

    $.post("/wp-content/themes/inc/ajax/subscription.php", {
        "email": email
    }, function(data){
      if (data != "Ошибка :(") {
        ga('send', 'event', 'subscribe','submit');
        yaCounter40892819.reachGoal('subscribe');
      }
        box.val(data);
        box.prop("disabled","disabled");
    });

    return false;
});
